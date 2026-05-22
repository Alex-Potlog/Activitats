import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { APIProvider } from '@vis.gl/react-google-maps';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const enableMaps = import.meta.env.VITE_ENABLE_MAPS === 'true';

        root.render(
            enableMaps ? (
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <App {...props} />
                </APIProvider>
            ) : (
                <App {...props} />
            )
        );
    },
    progress: {
        color: '#4B5563',
    },
});
