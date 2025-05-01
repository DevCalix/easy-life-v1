<?php

namespace App\Notifications\Supermarche;

use \Log;
use App\Models\Supermarche\Commande;
use App\Notifications\Channels\WhatsAppChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;

class NotificationAchatWhatsApp extends Notification
{
    use Queueable;
    protected $commande;
    /**
     * Create a new notification instance.
     */


    public function __construct(Commande $commande)
    {
        $this->commande = $commande;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
{
    return [WhatsAppChannel::class]; // Utiliser le canal personnalisé
}

public function toWhatsApp($notifiable)
{
    return [
        'recipient' => $notifiable->telephone_client ?? env('WHATSAPP_RECIPIENT'),
        'message' => "Nouvelle commande #{$this->commande->reference} reçue !"
    ];
}

    



    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'commande_id' => $this->commande->id,
            'message' => "Nouvelle commande #{$this->commande->reference} reçue !",
        ];
    }

}
