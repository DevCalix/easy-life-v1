import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Header */}
            <header>
                <h2 className="fw-bold" style={{ color: '#01BC47' }}>
                    Mise à jour du mot de passe
                </h2>
                <p className="text-muted mt-1">
                    Assurez-vous d'utiliser un mot de passe long et aléatoire pour sécuriser votre compte.
                </p>
            </header>

            {/* Form */}
            <form onSubmit={updatePassword} className="mt-4">
                {/* Current Password */}
                <div className="mb-3">
                    <label htmlFor="current_password" className="form-label fw-semibold">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}
                        autoComplete="current-password"
                    />
                    {errors.current_password && (
                        <div className="invalid-feedback">{errors.current_password}</div>
                    )}
                </div>

                {/* New Password */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label fw-semibold">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <div className="invalid-feedback">{errors.password_confirmation}</div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="d-flex align-items-center gap-3">
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={processing}
                    >
                        Sauvegarder
                    </button>

                    {recentlySuccessful && (
                        <span className="text-success small">Sauvegardé avec succès !</span>
                    )}
                </div>
            </form>
        </section>
    );
}
