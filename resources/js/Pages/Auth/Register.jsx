import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="S'inscrire" />

                <div className="bg-white p-4 rounded-3 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-4">
                        <h2 className="h3 fw-bold" style={{ color: '#03C04A' }}>S'inscrire</h2>
                        <p className="text-muted">Créez un nouveau compte</p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <InputLabel htmlFor="name" value="Nom" className="form-label fw-bold" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                                required
                            />
                            <InputError message={errors.name} className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="email" value="Email" className="form-label fw-bold" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                                required
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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                                required
                            />
                            <InputError message={errors.password} className="invalid-feedback" />
                        </div>

                        <div className="mb-3">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmer le mot de passe"
                                className="form-label fw-bold"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                style={{ borderRadius: '8px', padding: '10px' }}
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="invalid-feedback"
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link
                                href={route('login')}
                                className="text-decoration-none fw-bold"
                                style={{ color: '#03C04A' }}
                            >
                                Déjà inscrit ? Se connecter
                            </Link>
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
                            S'inscrire
                        </PrimaryButton>
                    </form>
                </div>
        </GuestLayout>
    );
}
