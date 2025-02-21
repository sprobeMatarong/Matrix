<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SumControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the calculate method with valid input.
     */
    public function testCalculateWithValidInput()
    {
        $response = $this->postJson('/api/sum/calculate', [
            'firstNum' => 5,
            'secondNum' => 10,
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'answer' => 15,
                 ]);
    }

    /**
     * Test the calculate method with invalid input.
     */
    public function testCalculateWithInvalidInput()
    {
        $response = $this->postJson('/api/sum/calculate', [
            'firstNum' => 'invalid',
            'secondNum' => 10,
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['firstNum']);
    }
}
