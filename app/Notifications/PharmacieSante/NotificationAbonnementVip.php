<?php

namespace App\Notifications\PharmacieSante;

use Illuminate\Bus\Queueable;
use App\Models\PharmacieSante\StAbonneVip;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NotificationAbonnementVip extends Notification
{
    use Queueable;
    protected $abonnement;
    protected $clientVip;

    /**
     * Create a new notification instance.
     */
    public function __construct(StAbonneVip $abonnement, $clientVip)
    {
        $this->abonnement = $abonnement;
        $this->clientVip = $clientVip;
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
                    ->subject('Nouvelle abonnement Vip')
                    ->line($this->clientVip .' est devenu vip.')
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
