<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\Restaurant\RepasCommandePanier;
use Symfony\Component\HttpFoundation\Response;

class TransfertPanier
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifier si l'utilisateur est connecté et s'il y a des éléments dans le panier de session
        if (Auth::check()) {
            $sessionId = Session::getId();

            // Transférer les éléments du panier de la session vers l'utilisateur connecté
            $itemsTransferred = RepasCommandePanier::where('session_id', $sessionId)
                ->whereNull('user_id') // S'assurer que les éléments ne sont pas déjà associés à un utilisateur
                ->update(['user_id' => Auth::id(), 'session_id' => null]);

            // Compter le nombre d'éléments transférés
            $itemsTransferred = RepasCommandePanier::where('session_id', $sessionId)
                ->whereNull('user_id')
                ->count();

            // Enregistrer le nombre d'éléments transférés dans les logs
            Log::info("Nombre d'éléments transférés au panier : $itemsTransferred");
        }

        return $next($request);
    }
}
