<?php

namespace App\Http\Requests\API\Inquiry;

use App\Rules\EmailAddress;
use Illuminate\Foundation\Http\FormRequest;

class CreateInquiryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fullname' => 'required',
            'email' => ['required', new EmailAddress()],
            'content' => 'required',
        ];
    }

    public function getFullname()
    {
        return $this->input('fullname', null);
    }

    public function getEmail()
    {
        return $this->input('email', null);
    }

    public function getInquiryContent()
    {
        return $this->input('content', null);
    }
}
