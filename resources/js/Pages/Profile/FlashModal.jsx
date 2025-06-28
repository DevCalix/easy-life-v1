import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashModal() {
  const { flash } = usePage().props;
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (flash.success) {
      setMessage(flash.success);
      setShow(true);

      // Ferme automatiquement après 3 secondes
      setTimeout(() => setShow(false), 3000);
    } else if (flash.error) {
      setMessage(flash.error);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    }
  }, [flash]);

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className={`modal-header ${flash.error ? 'bg-danger' : 'bg-success'} text-white`}>
            <h5 className="modal-title">{flash.error ? 'Erreur' : 'Succès'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShow(false)}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
