<?php

namespace App\Notifications\PharmacieSante;

use Illuminate\Bus\Queueable;
use App\Models\PharmacieSante\StCommande;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NotificationAchatPharmacie extends Notification
{
    use Queueable;
    protected $commande;

    /**
     * Create a new notification instance.
     */
    public function __construct(StCommande $commande)
    {
        $this->commande = $commande;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Nouvelle commande de medicaments')
                    ->line('Une nouvelle commande a été passée.')
                    ->line('Détails de la commande :')
                    ->line('Référence : ' . $this->commande->transaction_ref)
                    ->action('Voir la commande', url('/commandes/' . $this->commande->id))
                    ->line('Merci d\'utiliser notre application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
