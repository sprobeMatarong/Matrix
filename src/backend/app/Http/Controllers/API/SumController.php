<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Sum\CalculateRequest;
use App\Services\SumService;
use App\Http\Resources\SumResource;
use Exception;

class SumController extends Controller
{
    /** @var App\Services\SumService */
     
    protected $sumService;
    /**
     * Summary of __construct
     * @param \App\Services\SumService $sumService
     */
    public function __construct(SumService $sumService)
    {
        $this->sumService = $sumService;
    }

    public function calculate(CalculateRequest $request)
    {   
        $request->validated();

        try {
            $inputs = [
                'firstNum' => $request->getNumberOne(),
                'secondNum' => $request->getNumberTwo(),
            ];
            // Perform calculation
            $result = $this->sumService->calculateSum($inputs);
            $this->response['result'] = new SumResource($result);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 422,
            ];
        }
        return response() -> json($this->response, $this ->response['code']);
    }
}
