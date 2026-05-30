import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    .use( HttpBackend )
    .use( initReactI18next )
    .init( { 
        lng: 'pt-BR',
        fallbackLng: 'en-US',
        defaultNS: 'common',
        backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    } );

export default i18n;

/*

About this system:

    Internationalization managed by i18next with the HttpBackend plugin.
    Translation files are located at /public/locales/{language}/{namespace}.json
    and are loaded on demand via HTTP — no JSON files are imported directly here.

    Expected folder structure:
        public/locales/pt-BR/
                    common.json
                    login-screen.json
                    
                en-US/
                    common.json
                    login-screen.json
                
                it-IT/
                    common.json
                    login-screen.json

    Default language: pt-BR (to improve later and make it dynamically)
    Fallback: en-US — if a key is missing in the active language, it falls back to en-US.
    If the key is missing in both, the component renders the key itself instead of the text.

    To add a new language:
        1. Create the folder /public/locales/{language-code}/
        2. Copy the JSONs from en-US and translate them
        3. Expose the option in the UI and call i18n.changeLanguage( '{ code }' )

    To add a new namespace (new section of the system):
        1. Create /public/locales/{language}/{namespace}.json for each language
        2. In the component, use useTranslation('{namespace}')

    Usage in components:
        import { useTranslation } from 'react-i18next';

        const { t } = useTranslation( 'login-screen' ); // specific namespace
        const { t } = useTranslation();                 // uses defaultNS (common)

        t( 'key' )                        // simple translation
        t( 'key', { name: 'John' } )      // with interpolation — JSON: "Hello, {{name}}!"
        
        For multiple jsons in the same component, you can pass an array as argument. Ex.:
        
        const { t } = useTranslation( [ 'login-screen', 'common' ] );
        
        then:
        
        t( 'login-screen: login_card_subtitle' )  // search in login-screen.json
		t( 'common:save' )

*/