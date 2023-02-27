<?php

namespace Tests\Feature;

use Hash;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Exceptions\UserNotFoundException;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class UserCRUDTest extends TestCase
{
    use WithoutMiddleware;

    /** @var array */
    private $data;

    /** @var array */
    private static $ADMIN;

    /** @var string */
    private static $ACCESS_TOKEN;

    /** @var stdClass */
    private static $USER;

    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        // set admin details
        self::$ADMIN = User::find(1);
    }

    /**
     * UserCRUDTest constructor.
     */
    public function __construct($name = 'UserCRUDTest')
    {
        parent::__construct($name);
        $this->createApplication();

        Storage::fake('public');

        // test variables
        $this->data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@tcg.sprobe.ph',
        ];
    }

    public function testCreateWithMissingParams()
    {
        $params = $this->data;
        unset($params['first_name']);
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'first_name' => ['The first name field is required.']
                ]
            ]);
    }

    public function testCreateWithInvalidEmail()
    {
        $params = $this->data;
        $params['email'] = 'notAValidEmail@';
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'email' => ['Invalid email address.']
                ]
            ]);
    }

    public function testCreateWithExistingEmail()
    {
        $params = $this->data;
        $params['email'] = self::$ADMIN['email'];
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('POST', '/' . config('app.api_version') . '/users', $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'email' => ['The email has already been taken.']
                ]
            ]);
    }

    public function testCreate()
    {
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('POST', '/' . config('app.api_version') . '/users', $this->data);
        $result = $response->getData();
        self::$USER = $result->data;

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'full_name' => $this->data['first_name'] . ' ' . $this->data['last_name'],
                    'first_name' => $this->data['first_name'],
                    'last_name' => $this->data['last_name'],
                    'email' => $this->data['email'],
                    'avatar' => null,
                    'status' => [
                        'id' => 5,
                        'name' => 'Pending',
                    ],
                ],
            ]);
    }

    public function testReadUserNotFound()
    {
        $response = $this->actingAs(self::$ADMIN, 'api')
                    ->json('GET', '/' . config('app.api_version') . '/users/999999999999');
        $response->assertStatus(500)
            ->assertJson([
                'error' => (new UserNotFoundException())->getMessage(),
            ]);
    }

    public function testRead()
    {
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('GET', '/' . config('app.api_version') . '/users/' . self::$USER->id);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'full_name' => $this->data['first_name'] . ' ' . $this->data['last_name'],
                    'first_name' => $this->data['first_name'],
                    'last_name' => $this->data['last_name'],
                    'email' => $this->data['email'],
                    'avatar' => null,
                    'status' => [
                        'id' => 5,
                        'name' => 'Pending',
                    ],
                ],
            ]);
    }

    public function testUpdateMissingParams()
    {
        $params = $this->data;
        unset($params['first_name']);
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'first_name' => ['The first name field is required.'],
                ],
            ]);
    }

    public function testUpdateInvalidEmail()
    {
        $params = $this->data;
        $params['email'] = 'notAValidEmail@';
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'email' => ['Invalid email address.'],
                ],
            ]);
    }

    public function testUpdateExistingUserEmail()
    {
        $params = $this->data;
        $params['email'] = self::$ADMIN['email'];
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'email' => ['The email has already been taken.'],
                ],
            ]);
    }

    public function testUpdateInvalidPasswordFormat()
    {
        $params = $this->data;
        $params['password'] = 'notvalidpassword!';
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'password' => ['Password must contain the following: 1 uppercase, 1 special character and a minimum of 8 characters.'],
                ],
            ]);
    }

    public function testUpdateInvalidAvatarType()
    {
        $params = $this->data;
        $params['avatar'] = UploadedFile::fake()->create('test.pdf');
        $response = $this->actingAs(self::$ADMIN, 'api')
                ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'avatar' => [
                        'The avatar must be an image.',
                        'The avatar must be a file of type: jpeg, png, jpg, gif.'
                    ],
                ],
            ]);
    }

    public function testUpdateInvalidAvatarFileSize()
    {
        $params = $this->data;
        $params['avatar'] = UploadedFile::fake()->create('avatar.jpg')->size(2100); // current limit 2MB testing 2.1 MB
        $response = $this->actingAs(self::$ADMIN, 'api')
                ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'avatar' => ['The avatar must not be greater than 2048 kilobytes.'],
                ],
            ]);
    }

    public function testUpdate()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => '!n3wp4ssW0rd',
            'avatar' => UploadedFile::fake()->create('avatar.jpg'),
        ];

        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $result = $response->getData();
        $updatedUser = $result->data;

        // check updated fields only
        $response->assertStatus(200)
            ->assertJsonPath('data.first_name', $params['first_name'])
            ->assertJsonPath('data.last_name', $params['last_name'])
            ->assertJsonPath('data.email', $params['email']);

        // check if file is uploaded
        $file = str_replace(config('app.storage_disk_url'), '', $result->data->avatar);
        $this->assertNotNull($result->data->avatar);

        // Assert the file was stored...
        Storage::disk('public')->assertExists($file);

        self::$USER = $updatedUser;
    }

    public function testUpdateWithExistingAvatarbutNoFileUploaded()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => '!n3wp4ssW0rd',
            'avatar' => null,
        ];

        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        $response->assertStatus(200)
            ->assertJsonPath('data.first_name', $params['first_name'])
            ->assertJsonPath('data.last_name', $params['last_name'])
            ->assertJsonPath('data.email', $params['email']);

        // verify password hash has been updated
        $user = User::find(self::$USER->id);
        $this->assertTrue(Hash::check('!n3wp4ssW0rd', $user->password));
    }

    public function testUpdateExcludePassword()
    {
        $params = [
            'first_name' => 'Johnny',
            'last_name' => 'Doey',
            'email' => 'johnnyDoey@tcg.sprobe.ph',
            'password' => null,
            'avatar' => UploadedFile::fake()->create('avatar.jpg'),
        ];

        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('PUT', '/' . config('app.api_version') . '/users/' . self::$USER->id, $params);
        // check updated fields only
        $response->assertStatus(200)
            ->assertJsonPath('data.first_name', $params['first_name'])
            ->assertJsonPath('data.last_name', $params['last_name'])
            ->assertJsonPath('data.email', $params['email']);

        // verify password was not updated
        $user = User::find(self::$USER->id);
        $this->assertTrue(Hash::check('!n3wp4ssW0rd', $user->password));
    }

    public function testDeleteUserNotFound()
    {
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('DELETE', '/' . config('app.api_version') . '/users/999999999');
        $response->assertStatus(500)
            ->assertJson([
                'error' => (new UserNotFoundException())->getMessage(),
            ]);
    }

    public function testDelete()
    {
        $response = $this->actingAs(self::$ADMIN, 'api')
                        ->json('DELETE', '/' . config('app.api_version') . '/users/' . self::$USER->id);
        $response->assertStatus(200)
            ->assertJson([
                'deleted' => true,
            ]);
    }
}
