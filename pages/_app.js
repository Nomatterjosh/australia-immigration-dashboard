import '../styles/globals.css';
import { I18nProvider } from '../lib/i18n-context';

export default function App({ Component, pageProps }) {
  return (
    <I18nProvider>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
