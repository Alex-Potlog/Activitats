<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreLikeReactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'valoracio' => 'required|integer|in:1,-1',
        ];
    }

    public function messages(): array
    {
        return [
            'valoracio.required' => 'Has d\'indicar una reacció.',
            'valoracio.integer' => 'La reacció ha de ser un valor vàlid.',
            'valoracio.in' => 'La reacció ha de ser like o dislike.',
        ];
    }
}
