<?php

namespace App\Http\Middleware\Supermarche;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VendorOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->user()->isVendor()) {
            return redirect('/')->with('error', 'Accès réservé aux vendeurs');
        }
        return $next($request);
    }
}
