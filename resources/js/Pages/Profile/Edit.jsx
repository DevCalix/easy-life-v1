import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 style={{ color: '#01BC47' }} className="fw-bold h4 mb-0">
                    Mon profil
                </h2>
            }
        >
            <Head title="Mon Profil" />

            <div className="py-5">
                <div className="container">
                    <div className="row gy-4">
                        {/* Section : Informations personnelles */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-transparent border-0 pb-0">
                                    <h5 style={{ color: '#01BC47' }} className="fw-bold mb-0">
                                        Informations personnelles
                                    </h5>
                                    <small className="text-muted">
                                        Mettez à jour vos informations personnelles et vos coordonnées.
                                    </small>
                                </div>
                                <div className="card-body">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section : Modifier le mot de passe */}
                        <div className="col-lg-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-transparent border-0 pb-0">
                                    <h5 style={{ color: '#01BC47' }} className="fw-bold mb-0">
                                        Sécurité du compte
                                    </h5>
                                    <small className="text-muted">
                                        Changez régulièrement votre mot de passe pour garantir la sécurité de votre compte.
                                    </small>
                                </div>
                                <div className="card-body">
                                    <UpdatePasswordForm />
                                </div>
                            </div>
                        </div>

                        {/* Section : Supprimer le compte */}
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header bg-transparent border-0 pb-0">
                                    <h5 className="fw-bold text-danger mb-0">Supprimer mon compte</h5>
                                    <small className="text-muted">
                                        Cette action est définitive. Toutes vos données seront perdues.
                                    </small>
                                </div>
                                <div className="card-body">
                                    <DeleteUserForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
