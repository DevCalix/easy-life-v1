<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Twilio\Rest\Client;

class WhatsAppController extends Controller
{
    public function sendWhatsapp(Request $request)
    {
        $request->validate([
            'to' => 'required|string',
            'message' => 'required|string',
        ]);

        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        $twilio->messages->create(
            "whatsapp:" . $request->to,
            [
                'from' => config('services.twilio.whatsapp_from'),
                'body' => $request->message,
            ]
        );

        return response()->json(['message' => 'Message WhatsApp envoyé !']);
    }

    public function sendSms(Request $request)
    {
        $request->validate([
            'to' => 'required|string',
            'message' => 'required|string',
        ]);

        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        $twilio->messages->create(
            $request->to,
            [
                'from' => config('services.twilio.sms_from'),
                'body' => $request->message,
            ]
        );

        return response()->json(['message' => 'Message SMS envoyé !']);
    }

    public function sendWhatsappForm()
    {
        return Inertia::render('Test/SendWhatsapp');
    }
}
