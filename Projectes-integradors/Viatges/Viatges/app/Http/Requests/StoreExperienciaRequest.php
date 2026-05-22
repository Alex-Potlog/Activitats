<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreExperienciaRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'titol' => 'required|string|max:120',
            'contingut' => 'required|string',
            'imatge' => 'required|image|max:5120',
            'latitud' => 'required_without:google_place_id|nullable|numeric|between:-90,90',
            'longitud' => 'required_without:google_place_id|nullable|numeric|between:-180,180',
            'ubicacio_nom' => 'nullable|string|max:255',
            'google_place_id' => 'nullable|string|max:255',
            'id_categories' => 'nullable|array',
            'id_categories.*' => 'exists:categorias,id',
            'estat' => 'required|in:esborrany,publicat,rebutjat',
        ];
    }

    /**
     * Custom error messages in Catalan.
     */
    public function messages(): array
    {
        return [
            'titol.required' => 'El títol és obligatori.',
            'titol.max' => 'El títol no pot superar els 120 caràcters.',
            'contingut.required' => 'La descripció és obligatòria.',
            'imatge.required' => 'Cal afegir una imatge.',
            'imatge.image' => 'El fitxer ha de ser una imatge.',
            'imatge.max' => 'La imatge no pot superar els 5MB.',
            'latitud.required' => 'La latitud és obligatòria.',
            'longitud.required' => 'La longitud és obligatòria.',
            'latitud.between' => 'La latitud ha d\'estar entre -90 i 90.',
            'longitud.between' => 'La longitud ha d\'estar entre -180 i 180.',
            'id_categories.array' => 'Les categories han de tenir un format vàlid.',
            'id_categories.*.exists' => 'Alguna de les categories seleccionades no existeix.',
            'estat.required' => 'L\'estat és obligatori.',
            'estat.in' => 'L\'estat ha de ser vàlid.',
        ];
    }
}
