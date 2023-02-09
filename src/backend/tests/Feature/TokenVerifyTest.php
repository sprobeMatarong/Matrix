<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\PasswordReset;
use App\Models\ActivationToken;

class TokenVerifyTest extends TestCase
{
    /** @var string */
    private static $TOKEN;

    /** @var App\Models\ActivationToken */
    private static $ACTIVATION_TOKEN;

    /** @var App\Models\PasswordReset */
    private static $RESET_TOKEN;

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        self::$TOKEN = md5(uniqid());

        // store test token data
        self::$ACTIVATION_TOKEN = ActivationToken::create(['token' => self::$TOKEN, 'user_id' => 1]);
        self::$RESET_TOKEN = PasswordReset::create(['token' => self::$TOKEN, 'email' => 'test@mail.com']);
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();

        // delete test tokens
        self::$ACTIVATION_TOKEN->delete();
        self::$RESET_TOKEN->delete();
    }

    /**
     * TokenVerifyTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    public function testVerifyMissingTypeField()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['token' => self::$TOKEN]);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'type' => ['The type field is required.'],
                ]
            ]);
    }

    public function testVerifyMissingTokenField()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['type' => 'activation']);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'token' => ['The token field is required.'],
                ]
            ]);
    }

    public function testVerifyInvalidType()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['type' => 'random', 'token' => self::$TOKEN]);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'type' => ['The selected type is invalid.'],
                ]
            ]);
    }

    public function testVerifyNonExistingToken()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['type' => 'activation', 'token' => 'non-existing']);
        $response->assertStatus(500);
    }

    public function testVerifyActivationToken()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['type' => 'activation', 'token' => self::$TOKEN]);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'verified' => true,
                ]
            ]);
    }

    public function testVerifyPasswordResetToken()
    {
        $response = $this->json('GET', '/' . config('app.api_version') . '/token/verify', ['type' => 'password_reset', 'token' => self::$TOKEN]);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'verified' => true,
                ]
            ]);
    }
}
