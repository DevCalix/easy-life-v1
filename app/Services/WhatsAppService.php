<?php

namespace App\Services;

use Twilio\Rest\Client;

class WhatsAppService
{
    protected $twilio;

    public function __construct()
    {
        $sid = config('services.twilio.sid');
        $token = config('services.twilio.token');
        $this->twilio = new Client($sid, $token);
    }

    public function sendMessage($to, $message)
    {
        $from = config('services.twilio.whatsapp_from');

        try {
            $this->twilio->messages->create(
                "whatsapp:" . $to,
                [
                    'from' => $from,
                    'body' => $message
                ]
            );

            \Log::info("✅ Message WhatsApp envoyé à $to : $message");
            return ['success' => true, 'message' => 'Message envoyé.'];
        } catch (\Exception $e) {
            \Log::error("❌ Erreur d’envoi WhatsApp : " . $e->getMessage());
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
