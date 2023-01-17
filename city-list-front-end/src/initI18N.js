import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import common_en from './translations/en/common.json';
import {initReactI18next} from 'react-i18next';

export const FALLBACK_LANGUAGE = 'en';

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const i18nextOptions = {
    interpolation: {escapeValue: false},  // React already does escaping
    fallbackLng: FALLBACK_LANGUAGE,
    debug: !IS_PRODUCTION,
    saveMissing: true,
    useSuspense: false,
    resources: {
        en: {
            common: common_en,
        },
    },
};

i18next
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init(i18nextOptions);

export default i18next;