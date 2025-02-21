<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use app\Models\Sum;

use Tests\TestCase;

class SumControllerTest extends TestCase
{
    use RefreshDatabase;

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
        $response =$this->json('POST',  '/' . config('app.api_version') . '/sum', $this->data);
        $response->assertStatus(200)
            ->assertJson([
                'result' => 15,
            ]);
        
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
    
}
