import '@/index.scss';
import createRoot from '@/core/root';
import App from '@/components/app';

const root = createRoot(document.body);
root.render(new App().element);
