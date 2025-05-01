<?php

namespace App\Http\Controllers\Supermarche;

use App\Http\Controllers\Controller;
use App\Models\Supermarche\SmBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SmBannerController extends Controller
{
    public function index()
    {
        $banners = SmBanner::all();
        return Inertia::render('Supermarche/Banners/Index', [
            'banners' => $banners,
        ]);
    }

    public function create()
    {
        return Inertia::render('Supermarche/Banners/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_url' => 'required|image',
            'redirect_url' => 'nullable|url',
        ]);

        $imagePath = $request->file('image_url')->store('supermarche/banners', 'public');

        SmBanner::create([
            'image_url' => $imagePath,
            'redirect_url' => $request->redirect_url,
            'statut' => $request->statut,
        ]);

        return redirect()->route('banners.index');
    }

    public function edit(SmBanner $banner)
    {
        return Inertia::render('Supermarche/Banners/Edit', [
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, SmBanner $banner)
    {
        $request->validate([
            'image_url' => 'nullable|image',
            'redirect_url' => 'nullable|url',
        ]);

        if ($request->hasFile('image_url')) {
            Storage::disk('public')->delete($banner->image_url);
            $imagePath = $request->file('image_url')->store('banners', 'public');
            $banner->image_url = $imagePath;
        }

        $banner->redirect_url = $request->redirect_url;
        $banner->statut = $request->statut;
        $banner->save();

        return redirect()->route('banners.index');
    }

    public function destroy(SmBanner $banner)
    {
        Storage::disk('public')->delete($banner->image_url);
        $banner->delete();
        return redirect()->route('supermarche.banners.index');
    }

}
