<?php

namespace App\Http\Requests;

use App\Models\Experiencia;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateExperienciaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $experiencia = $this->route('experiencia');

        return Auth::check()
            && $experiencia instanceof Experiencia
            && Auth::id() === $experiencia->id_usuari_creador
            && $experiencia->estat === 'esborrany';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'titol' => 'required|string|max:120',
            'contingut' => 'required|string',
            'imatge' => 'nullable|image|max:5120',
            'latitud' => 'required_without:google_place_id|nullable|numeric|between:-90,90',
            'longitud' => 'required_without:google_place_id|nullable|numeric|between:-180,180',
            'ubicacio_nom' => 'nullable|string|max:255',
            'google_place_id' => 'nullable|string|max:255',
            'id_categories' => 'nullable|array',
            'id_categories.*' => 'exists:categorias,id',
        ];
    }

    public function messages(): array
    {
        return [
            'titol.required' => 'El títol és obligatori.',
            'titol.max' => 'El títol no pot superar els 120 caràcters.',
            'contingut.required' => 'La descripció és obligatòria.',
            'imatge.image' => 'El fitxer ha de ser una imatge.',
            'imatge.max' => 'La imatge no pot superar els 5MB.',
            'latitud.required_without' => 'La latitud és obligatòria.',
            'longitud.required_without' => 'La longitud és obligatòria.',
            'latitud.between' => 'La latitud ha d\'estar entre -90 i 90.',
            'longitud.between' => 'La longitud ha d\'estar entre -180 i 180.',
            'id_categories.array' => 'Les categories han de tenir un format vàlid.',
            'id_categories.*.exists' => 'Alguna de les categories seleccionades no existeix.',
        ];
    }
}
