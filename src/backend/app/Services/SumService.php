<?php

namespace App\Services;

class SumService
{
    /**
     * Calculate the sum of two numbers.
     */
    public function calculateSum(float $firstNum, float $secondNum): float
    {
        return $firstNum + $secondNum;
    }
}
