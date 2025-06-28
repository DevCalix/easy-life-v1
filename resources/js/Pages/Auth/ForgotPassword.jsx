import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <div className="w-100">
                <div className="text-center mb-4">
                    <h2 className="h3 fw-bold text-success">Réinitialisation du mot de passe</h2>
                    <p className="text-muted mb-0">
                        Entrez votre adresse email pour recevoir le lien de réinitialisation
                    </p>
                </div>

                {status && (
                    <div className="alert alert-success text-center">
                        <i className="bi bi-check-circle me-2"></i>
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="needs-validation" noValidate>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Adresse email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="exemple@email.com"
                            required
                        />
                        <InputError message={errors.email} className="invalid-feedback" />
                    </div>

                    <div className="d-grid mb-3">
                        <PrimaryButton
                            className="btn btn-success btn-lg fw-semibold py-2"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Envoi en cours...
                                </>
                            ) : (
                                'Envoyer le lien'
                            )}
                        </PrimaryButton>
                    </div>

                    <div className="text-center">
                        <Link 
                            href={route('login')} 
                            className="text-decoration-none text-success fw-semibold"
                        >
                            <i className="bi bi-arrow-left-short"></i> Retour à la connexion
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}