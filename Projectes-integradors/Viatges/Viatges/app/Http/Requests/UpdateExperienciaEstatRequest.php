<?php

namespace App\Http\Requests;

use App\Models\Experiencia;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateExperienciaEstatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $experiencia = $this->route('experiencia');

        return Auth::check() && $experiencia instanceof Experiencia && Auth::id() === $experiencia->id_usuari_creador;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [];
    }
}
