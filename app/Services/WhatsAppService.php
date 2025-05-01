<?php

namespace App\Services;

use App\Models\Supermarche\Produit;
use Illuminate\Support\Facades\Http;

class WhatsAppService
{
    protected $accessToken;
    protected $phoneId;

    public function __construct()
    {
        $this->accessToken = env('WHATSAPP_ACCESS_TOKEN');
        $this->phoneId = env('WHATSAPP_PHONE_ID');
    }

    public function sendMessage($to, $message)
    {
        $url = "https://graph.facebook.com/v22.0/{$this->phoneId}/messages";

        $response = Http::withToken($this->accessToken)
            ->post($url, [
                'messaging_product' => 'whatsapp',
                'to' => $to,
                'type' => 'text',
                'text' => [
                    'body' => $message,
                ],
            ]);


        return $response->json();
    }
}
