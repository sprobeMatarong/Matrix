<?php

namespace App\Services;

use App\Models\Sum;

class SumService
{
    protected $sum;

    public function __construct(Sum $sum)
    {
        $this->sum = $sum;
    }

    /**
     * Calculate the sum of two numbers and save it to the database.
     */
    public function calculateSum(float $firstNum, float $secondNum): float
    {
        $result = $firstNum + $secondNum;

        // Save the sum to the database
        $this->sum->create([
            'number1' => $firstNum,
            'number2' => $secondNum,
            'result' => $result,
        ]);

        return $result;
    }
}
