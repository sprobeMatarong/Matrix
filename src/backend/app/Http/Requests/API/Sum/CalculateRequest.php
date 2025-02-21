<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class CalculateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow validation to proceed
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'firstNum' => 'required|numeric',
            'secondNum' => 'required|numeric',
        ];
    }
}
