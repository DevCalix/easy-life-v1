<?php

namespace App\Notifications\HtReservation;

use App\Models\HotelReservation\HtReservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class HtReservationNotification extends Notification
{
    use Queueable;
    public $reservation;
    /**
     * Create a new notification instance.
     */
    public function __construct(HtReservation $reservation)
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
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouvelle réservation hôtel - ' . $this->reservation->reservation_key)
            ->greeting('Bonjour Admin,')
            ->line('Une nouvelle réservation hôtelière a été effectuée :')
            ->line('🔹 Référence: ' . $this->reservation->reservation_key)
            ->line('🏨 Hôtel: ' . $this->reservation->hotel->nom)
            ->line('🛏️ Chambre: ' . $this->reservation->chambre->type)
            ->line('📅 Dates: du ' . $this->reservation->date_arrivee . ' au ' . $this->reservation->date_depart)
            ->line('👤 Client: ' . $this->reservation->nom . ' (' . $this->reservation->email . ')')
            ->line('📞 Téléphone: ' . $this->reservation->telephone)
            ->line('Merci de traiter cette réservation rapidement.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        return [
            'reservation_id' => $this->reservation->id,
            'message' => 'Nouvelle réservation hôtel par ' . $this->reservation->nom,
        ];
    }
}
