import GuestLayout from "@/Layouts/GuestLayout";
import { useForm } from "@inertiajs/inertia-react";
import { Head, Link } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification d'e-mail" />

            <div className="text-center mb-4">
                <i className="bi bi-envelope-check display-4 text-primary mb-3"></i>
                <h2 className="h3 mb-3 fw-bold">Vérification requise</h2>
            </div>

            {status === 'verification-link-sent' ? (
                <div className="alert alert-success mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Un nouveau lien de vérification a été envoyé à votre adresse e-mail.
                </div>
            ) : (
                <div className="alert alert-light border mb-4">
                    <p className="mb-0">
                        Merci pour votre inscription ! Avant de continuer, veuillez vérifier votre
                        adresse e-mail en cliquant sur le lien que nous venons de vous envoyer.
                    </p>
                </div>
            )}

            <form onSubmit={submit} className="mb-4">
                <button
                    className="btn btn-primary w-100 py-2 mb-3"
                    type="submit"
                    disabled={processing}
                >
                    {processing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Envoi en cours...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-send-fill me-2"></i>
                            Renvoyer l'e-mail de vérification
                        </>
                    )}
                </button>
            </form>

            <div className="text-center">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="btn btn-link text-decoration-none"
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Se déconnecter
                </Link>
            </div>
        </GuestLayout>
    );
}
