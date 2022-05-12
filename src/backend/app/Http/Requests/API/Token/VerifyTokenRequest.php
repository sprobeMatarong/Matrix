<?php

namespace App\Http\Requests\API\Token;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class VerifyTokenRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => [
                'required',
                Rule::in(['activation', 'password_reset'])
            ],
            'token' => 'required',
        ];
    }

    public function getType()
    {
        return $this->input('type', null);
    }

    public function getToken()
    {
        return $this->input('token', null);
    }
}
