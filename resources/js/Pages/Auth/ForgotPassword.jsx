import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

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

                <div className="bg-white p-4 rounded-3 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <h2 className="h3 fw-bold" style={{ color: '#03C04A' }}>Mot de passe oublié</h2>
                        <p className="text-muted">
                            Pas de problème. Indiquez-nous votre adresse e-mail, et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                        </p>
                    </div>

                    {status && (
                        <div className="alert alert-success text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Adresse e-mail</label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            <InputError message={errors.email} className="invalid-feedback" />
                        </div>

                        <div className="d-flex justify-content-end">
                            <PrimaryButton
                                className="btn fw-bold"
                                disabled={processing}
                                style={{
                                    borderRadius: '8px',
                                    padding: '10px',
                                    backgroundColor: '#03C04A',
                                    border: 'none',
                                    color: '#fff'
                                }}
                            >
                                Envoyer le lien de réinitialisation
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <Link
                            href={route('login')}
                            className="text-decoration-none fw-bold"
                            style={{ color: '#03C04A' }}
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                </div>
        </GuestLayout>
    );
}
