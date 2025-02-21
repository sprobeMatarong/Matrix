<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\CalculateRequest;
use App\Services\SumService;
use Illuminate\Http\JsonResponse;
use Exception;

class SumController extends Controller
{
    protected SumService $sumService;

    public function __construct(SumService $sumService)
    {
        $this->sumService = $sumService;
    }

    public function calculate(CalculateRequest $request): JsonResponse
    {   
        try {
            // Retrieve validated input
            $firstNum = (float) $request->input('firstNum');
            $secondNum = (float) $request->input('secondNum');

            // Perform calculation
            $sum = $this->sumService->calculateSum($firstNum, $secondNum);

            return response()->json(['answer' => $sum]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage() // Helps with debugging
            ], 500);
        }
    }
}
