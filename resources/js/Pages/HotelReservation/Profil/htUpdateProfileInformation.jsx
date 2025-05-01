import HotelFooter from '@/Layouts/HotelReservationAccueil/HotelFooter';
import HotelReservationNavbar from '@/Layouts/HotelReservationAccueil/HotelReservationNavbar';
import PharmacieFooter from '@/Layouts/PharmacieSante/PharmacieFooter';
import PharmaNavbar from '@/Layouts/PharmacieSante/PharmaNavbar';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function ProfileSettings() {
    const user = usePage().props.auth.user;

    // Formulaire de mise à jour des informations du profil
    const { data: profileData, setData: setProfileData, patch, errors: profileErrors, processing: profileProcessing, recentlySuccessful: profileSuccess } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const updateProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    // Formulaire de mise à jour du mot de passe
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data: passwordData, setData: setPasswordData, errors: passwordErrors, put, reset, processing: passwordProcessing, recentlySuccessful: passwordSuccess } =
        useForm({
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
        <>
            <Head title='Editer Profile'/>
            <HotelReservationNavbar/>
            <div className="container my-4">
                <div className="row">
                    {/* Formulaire Profil */}
                    <div className="col-md-6">
                        <section>
                            <header>
                                <h2 className="fw-bold text-success montserrat-normal">Informations du profil</h2>
                                <p className="text-muted mt-1">
                                    Mettez à jour vos informations personnelles et votre adresse e-mail.
                                </p>
                            </header>

                            <form onSubmit={updateProfile} className="mt-4">
                                {/* Nom */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control ${profileErrors.name ? 'is-invalid' : ''}`}
                                        value={profileData.name}
                                        onChange={(e) => setProfileData('name', e.target.value)}
                                        required
                                    />
                                    {profileErrors.name && <div className="invalid-feedback">{profileErrors.name}</div>}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Adresse e-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${profileErrors.email ? 'is-invalid' : ''}`}
                                        value={profileData.email}
                                        onChange={(e) => setProfileData('email', e.target.value)}
                                        required
                                    />
                                    {profileErrors.email && <div className="invalid-feedback">{profileErrors.email}</div>}
                                </div>

                                {/* Vérification de l'e-mail */}
                                {/* {user.email_verified_at === null && (
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
                                    </div>
                                )} */}

                                {/* Bouton de soumission */}
                                <div className="d-flex align-items-center mt-4 gap-3">
                                    <button type="submit" className="btn btn-success" disabled={profileProcessing}>
                                        Sauvegarder
                                    </button>
                                    {profileSuccess && <span className="text-success small">Sauvegardé avec succès !</span>}
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Séparateur visible uniquement sur grand écran */}
                    <div className="col-md-1 d-none d-md-flex align-items-center justify-content-center">
                        <div className="vr"></div>
                    </div>

                    {/* Formulaire Mot de passe */}
                    <div className="col-md-5">
                        <section>
                            <header>
                                <h2 className="fw-bold text-success montserrat-normal">Mise à jour du mot de passe</h2>
                                <p className="text-muted mt-1">
                                    Assurez-vous d'utiliser un mot de passe long et sécurisé.
                                </p>
                            </header>

                            <form onSubmit={updatePassword} className="mt-4">
                                {/* Mot de passe actuel */}
                                <div className="mb-3">
                                    <label htmlFor="current_password" className="form-label fw-semibold">
                                        Mot de passe actuel
                                    </label>
                                    <input
                                        type="password"
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                        className={`form-control ${passwordErrors.current_password ? 'is-invalid' : ''}`}
                                        autoComplete="current-password"
                                    />
                                    {passwordErrors.current_password && (
                                        <div className="invalid-feedback">{passwordErrors.current_password}</div>
                                    )}
                                </div>

                                {/* Nouveau mot de passe */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        ref={passwordInput}
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                        className={`form-control ${passwordErrors.password ? 'is-invalid' : ''}`}
                                        autoComplete="new-password"
                                    />
                                    {passwordErrors.password && (
                                        <div className="invalid-feedback">{passwordErrors.password}</div>
                                    )}
                                </div>

                                {/* Confirmation du mot de passe */}
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label fw-semibold">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                        className={`form-control ${passwordErrors.password_confirmation ? 'is-invalid' : ''}`}
                                        autoComplete="new-password"
                                    />
                                    {passwordErrors.password_confirmation && (
                                        <div className="invalid-feedback">{passwordErrors.password_confirmation}</div>
                                    )}
                                </div>

                                {/* Bouton de soumission */}
                                <div className="d-flex align-items-center gap-3">
                                    <button type="submit" className="btn btn-success" disabled={passwordProcessing}>
                                        Sauvegarder
                                    </button>
                                    {passwordSuccess && <span className="text-success small">Sauvegardé avec succès !</span>}
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
            <HotelFooter/>
        </>
    );
}
