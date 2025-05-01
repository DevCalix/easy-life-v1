import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Se connecter" />


                <div className="bg-white p-4 rounded-3 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <h2 className="h3 fw-bold" style={{ color: '#03C04A' }}>Connexion</h2>
                        <p className="text-muted">Connectez-vous à votre compte</p>
                    </div>

                    {status && (
                        <div className="alert alert-success text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <InputLabel htmlFor="email" value="Email" className="form-label fw-bold" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            <InputError message={errors.email} className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="password" value="Mot de passe" className="form-label fw-bold" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                            <InputError message={errors.password} className="invalid-feedback" />
                        </div>

                        <div className="mb-3 form-check">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="form-check-input"
                            />
                            <label
                                htmlFor="remember"
                                className="form-check-label text-muted"
                            >
                                Se souvenir de moi
                            </label>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-decoration-none fw-bold"
                                    style={{ color: '#03C04A' }}
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-100 btn fw-bold"
                            disabled={processing}
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                backgroundColor: '#03C04A',
                                border: 'none',
                                color: '#fff'
                            }}
                        >
                            Se connecter
                        </PrimaryButton>
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-muted">Vous n'avez pas de compte ? </span>
                        <Link
                            href={route('register')}
                            className="text-decoration-none fw-bold"
                            style={{ color: '#03C04A' }}
                        >
                            S'inscrire
                        </Link>
                    </div>
                </div>
            
        </GuestLayout>
    );
}
