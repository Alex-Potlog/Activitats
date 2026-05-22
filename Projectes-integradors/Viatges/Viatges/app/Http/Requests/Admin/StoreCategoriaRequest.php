<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoriaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255|unique:categorias,nom',
            'descripcio' => 'required|string|max:2000',
        ];
    }

    /**
     * Missatges de validació en català.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'El nom de la categoria és obligatori.',
            'nom.string' => 'El nom de la categoria ha de ser text.',
            'nom.max' => 'El nom de la categoria no pot superar els 255 caràcters.',
            'nom.unique' => 'Ja existeix una categoria amb aquest nom.',
            'descripcio.required' => 'La descripció és obligatòria.',
            'descripcio.string' => 'La descripció ha de ser text.',
            'descripcio.max' => 'La descripció no pot superar els 2000 caràcters.',
        ];
    }
}
