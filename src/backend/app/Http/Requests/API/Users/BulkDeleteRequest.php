<?php

namespace App\Http\Requests\API\Users;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeleteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'ids' =>  'array|required',
            'ids.*' => 'integer',
        ];
    }

    public function getIds()
    {
        return $this->input('ids', []);
    }
}
