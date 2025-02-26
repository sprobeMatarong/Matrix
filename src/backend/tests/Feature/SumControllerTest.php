<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Sum;
use App\Services\SumService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SumControllerTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test the calculate method with valid input.
     */
    protected $data; 
    public function setUp(): void
    {
        parent::setUp();

        // Initialize test data
        $this->data = [
            'firstNum' => 5,
            'secondNum' => 10,
        ];
    }

    public function testCalculateWithValidInput()
    {
        $response = $this->json('POST', '/' . config('app.api_version') . '/sum', $this->data);
        $response->assertStatus(200)
            ->assertJson([
                'result' => 15,
            ]);

        // Assert that the sum is stored in the database
        $this->testAssertSumStoredInDatabase(5, 10, 15);
    }
    

    /**
     * Test the calculate method with invalid input.
     */
    public function testCalculateWithInvalidInputNumberOne()
    {
       $data = $this->data;
       $data['firstNum'] = 'invalid';
       $response = $this->json('POST', '/' . config('app.api_version') . '/sum', $data);
       $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'firstNum' => ['The first num must be a number.'],
                ]
            ]);
    }

    public function testCalculateWithInvalidInputNumberTwo()
    {
       $data = $this->data;
       $data['secondNum'] = 'invalid';
       $response = $this->json('POST', '/' . config('app.api_version') . '/sum', $data);
       $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'secondNum' => ['The second num must be a number.'],
                ]
            ]);
    }

    public function testCalculateWithCharacters()
    {
       $data = $this->data;
       $data['secondNum'] = '/@';
       $response = $this->json('POST', '/' . config('app.api_version') . '/sum', $data);
       $response->assertStatus(422)
            ->assertJson([
                'error' => [
                    'secondNum' => ['The second num must be a number.'],
                ]
            ]);
    }

    /**
     * Assert that the sum is stored in the database.
     */
    protected function testAssertSumStoredInDatabase($number1, $number2, $result)
    {
        $this->assertDatabaseHas('sums', [
            'number1' => $number1,
            'number2' => $number2,
            'result' => $result,
        ]);
    }

    public function testCalculateWithException()
{
    // Mock the SumService to throw an exception
    $this->mock(SumService::class, function ($mock) {
        $mock->shouldReceive('calculateSum')
            ->andThrow(new \Exception('Test exception'));
    });

    $response = $this->json('POST', '/' . config('app.api_version') . '/sum', $this->data);

    $response->assertStatus(422)
        ->assertJson([
            'error' => 'Something went wrong.',
            'message' => 'Test exception',
        ]);
}
}
