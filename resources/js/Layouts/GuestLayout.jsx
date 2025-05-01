import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage  } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const { url } = usePage(); // Récupère l'URL actuelle
    return (
        <div className="d-flex flex-column min-vh-100 align-items-center bg-light pt-3">
            <div>
                <Link href={url}>
                    <ApplicationLogo/>
                </Link>
            </div>

            <div className="mt-4 w-100 bg-white p-4 shadow rounded mx-auto" style={{ maxWidth: '24rem' }}>
                {children}
            </div>
        </div>
    );
}
