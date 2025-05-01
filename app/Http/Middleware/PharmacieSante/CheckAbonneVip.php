<?php

namespace App\Http\Middleware\PharmacieSante;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAbonneVip
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || !$user->abonneVip || !$user->abonneVip->estActif()) {
            // Enregistrer l'URL actuelle dans la session
            session()->put('url.intended', $request->url());
            // Rediriger si l'utilisateur n'est pas abonné VIP actif
            return redirect()->route('abonnement.vip')->with('error', 'Vous devez être un abonné VIP pour accéder à cette section.');
        }

        return $next($request);
    }
}
