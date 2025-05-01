import '../css/app.css';
import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { PanierProvider } from './Pages/Supermarche/Context/PanierContext';
import { RestaurantPanierProvider } from './Pages/CommandeRepas/Context/RestaurantPanierContext';
import GoogleAnalytics from './Components/GoogleAnalytics';
import { PharmaPanierProvider } from './Pages/PharmacieSante/Context/PharmaPanierContext';
import Popup from './Components/Popup';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PanierProvider>
                <RestaurantPanierProvider>
                    <PharmaPanierProvider>
                        <GoogleAnalytics />
                        <Popup />
                        <App {...props} />
                    </PharmaPanierProvider>
                </RestaurantPanierProvider>
            </PanierProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
