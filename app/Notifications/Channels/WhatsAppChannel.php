<?php

namespace App\Notifications\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppChannel
{
    public function send($notifiable, Notification $notification)
    {
        if (!method_exists($notification, 'toWhatsApp')) {
            return;
        }

        $data = $notification->toWhatsApp($notifiable);
        $accessToken = env('WHATSAPP_ACCESS_TOKEN');
        $phoneId = env('WHATSAPP_PHONE_ID');

        $response = Http::withToken($accessToken)->post("https://graph.facebook.com/v17.0/{$phoneId}/messages", [
            "messaging_product" => "whatsapp",
            "to" => $data['recipient'],
            "type" => "text",
            "text" => ["body" => $data['message']]
        ]);

        if ($response->failed()) {
            Log::error('Erreur envoi WhatsApp : ' . $response->body());
        }
    }
}
