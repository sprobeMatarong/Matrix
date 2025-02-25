<?php

namespace App\Http\Requests\API\Sum;

use Illuminate\Foundation\Http\FormRequest;
// use Illuminate\Http\Request;

class CalculateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
  
    public function rules(): array
    {
        return [
            'firstNum' => 'required|numeric',
            'secondNum' => 'required|numeric',
        ];
    }    
    public function getNumberOne(): float
    {
        return (float) $this->input('firstNum');
    }
    public function getNumberTwo(): float
    {
        return (float) $this->input('secondNum');
    }
    
}
