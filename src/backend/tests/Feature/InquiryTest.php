<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Inquiry;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InquiryTest extends TestCase
{
    /** @var array */
    protected $data;

    /** @var int */
    private static $ID;

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();

        // cleanup test data
        $inquiry = Inquiry::find(self::$ID);
        $inquiry->delete();
    }

    /**
     * InquiryTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();

        // test data
        $this->data = [
            'fullname' => 'John Doe',
            'email' => 'john@doe.com',
            'content' => 'Lorem Ipsum Dolor',
        ];
    }

    public function testCreateMissingParams()
    {
        foreach (array_keys($this->data) as $key) {
            $data = $this->data;
            // remove key for testing missing params
            unset($data[$key]);
            $response = $this->json('POST', '/v1/inquiries', $data);
            $response->assertStatus(422);
            $result = json_decode((string) $response->getContent());
            // verify expected response
            $this->assertEquals("The $key field is required.", $result->error->$key[0]);
        }
    }

    public function testCreateInvalidParams()
    {
        $data = $this->data;
        $data['email'] = 'invalid@email';
        $response = $this->json('POST', '/v1/inquiries', $data);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals('Invalid email address.', $result->error->email[0]);
    }

    public function testCreate()
    {
        $response = $this->json('POST', '/v1/inquiries', $this->data);
        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        self::$ID = $result->data->id;

        foreach ($this->data as $key => $value) {
            $this->assertEquals($this->data[$key], $result->data->$key);
        }
    }
}
