<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComentariRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'contingut' => 'required|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'contingut.required' => 'El comentari no pot estar buit.',
            'contingut.max' => 'El comentari no pot superar els 1000 caràcters.',
        ];
    }
}
