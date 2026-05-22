<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLikeReactionRequest;
use App\Models\Experiencia;
use App\Models\Like;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function react(StoreLikeReactionRequest $request, Experiencia $experiencia): RedirectResponse
    {
        $userId = Auth::id();
        $valoracio = (int) $request->validated('valoracio');

        $reaction = Like::where('id_usuari', $userId)
            ->where('id_experiencia', $experiencia->id)
            ->first();

        if ($reaction) {
            if ($reaction->valoracio === $valoracio) {
                $reaction->delete();
                $current = 0;
            } else {
                $reaction->update(['valoracio' => $valoracio]);
                $current = $valoracio;
            }
        } else {
            Like::create([
                'id_usuari' => $userId,
                'id_experiencia' => $experiencia->id,
                'valoracio' => $valoracio,
            ]);
            $current = $valoracio;
        }

        $likesCount = $experiencia->likes()->where('valoracio', 1)->count();
        $dislikesCount = $experiencia->likes()->where('valoracio', -1)->count();

        return back()->with([
            'current_reaction' => $current,
            'score' => $likesCount - $dislikesCount,
            'likes_count' => $likesCount,
            'dislikes_count' => $dislikesCount,
        ]);
    }
}
