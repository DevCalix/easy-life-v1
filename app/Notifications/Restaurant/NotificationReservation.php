<?php

namespace App\Notifications\Restaurant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Restaurant\RestoReservation;

class NotificationReservation extends Notification
{
    use Queueable;
    public $reservation;

    /**
     * Create a new notification instance.
     */
    public function __construct(RestoReservation $reservation)
    {
        $this->reservation = $reservation;
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
                    ->subject('Nouvelle réservation restaurant - ' . $this->reservation->cle_reservation)
                    ->greeting('Bonjour,')
                    ->line('Une nouvelle réservation de restaurant a été effectuée :')
                    ->line('🔹 Référence : ' . $this->reservation->cle_reservation)
                    ->line('🍽️ Restaurant : ' . $this->reservation->restaurant->nom)
                    ->line('📅 Date : ' . $this->reservation->date_reservation)
                    ->line('🕒 Heure : ' . $this->reservation->heure_reservation)
                    ->line('👥 Nombre de personnes : ' . $this->reservation->nombre_personnes)
                    ->line('📞 Téléphone : ' . $this->reservation->numero_telephone)
                    ->line('👤 Client : ' . $this->reservation->nom_client)
                    ->line('Merci de prendre en compte cette réservation rapidement.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'restaurant_id' => $this->reservation->restaurant_id,
            'reservation_key' => $this->reservation->cle_reservation,
            'message' => 'Nouvelle réservation par ' . $this->reservation->nom_client,
        ];
    }
}
