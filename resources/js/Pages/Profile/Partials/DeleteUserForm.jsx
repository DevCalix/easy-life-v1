import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: reset,
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={`space-y-4 ${className}`}>
            <header>
                <h2 className="fs-5 fw-bold text-danger">Supprimer le compte</h2>
                <p className="text-muted small">
                    Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Assurez-vous d'avoir sauvegardé toutes les informations que vous souhaitez conserver.
                </p>
            </header>

            <button
                className="btn btn-danger"
                onClick={confirmUserDeletion}
            >
                Supprimer le compte
            </button>

            {confirmingUserDeletion && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmer la suppression</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées. Veuillez entrer votre mot de passe pour confirmer cette action.
                                </p>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={deleteUser}
                                    disabled={processing}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
