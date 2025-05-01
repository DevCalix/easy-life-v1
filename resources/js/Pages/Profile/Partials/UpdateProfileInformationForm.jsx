import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            {/* En-tête */}
            <header>
                <h2 className="fw-bold" style={{ color: '#01BC47' }}>
                    Informations du profil
                </h2>
                <p className="text-muted mt-1">
                    Mettez à jour vos informations personnelles et votre adresse e-mail.
                </p>
            </header>

            {/* Formulaire */}
            <form onSubmit={submit} className="mt-4">
                {/* Nom */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                        Adresse e-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Vérification de l'e-mail */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="alert alert-warning mt-3" role="alert">
                        Votre adresse e-mail n'est pas vérifiée.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="btn btn-link p-0"
                        >
                            Cliquez ici pour renvoyer l'e-mail de vérification.
                        </Link>
                        {status === 'verification-link-sent' && (
                            <div className="text-success mt-2">
                                Un nouvel e-mail de vérification a été envoyé.
                            </div>
                        )}
                    </div>
                )}

                {/* Bouton de soumission */}
                <div className="d-flex align-items-center mt-4 gap-3">
                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={processing}
                    >
                        Sauvegarder
                    </button>

                    {recentlySuccessful && (
                        <span className="text-success small">
                            Sauvegardé avec succès !
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
}
