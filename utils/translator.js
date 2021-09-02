import * as moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/es';

import SettingsManager from '../utils/SettingsManager';
import EN from './translations/en';
import FR from './translations/fr';
import ES from './translations/es';

const Translations = {
    en: EN,
    es: ES,
    fr: FR,
};

class Translator {
    constructor() {
        this.setLanguage(SettingsManager.getLanguage());
    }

    setLanguage(lang) {
        this._language = lang.toLowerCase();
        moment.locale(this._language);
    }

    get(str, ...args) {
        const result = Translations[this._language][str];

        if (!result) {
            return str;
        }

        if (!args.length) {
            return result;
        }

        let currentArg = 0;

        return result.replace('$-', () => {
            if (args[currentArg] !== undefined && args[currentArg] !== null) {
                return args[currentArg++];
            }

            return '';
        });
    }

    getLanguage() {
        return this._language;
    }

    getLanguageString() {
        switch (this._language) {
            case 'fr':
                return 'Français';
            case 'en':
                return 'English';
            case 'es':
                return 'Español';
            default:
                return '';
        }
    }
}

const translator = new Translator();


SettingsManager.on('language', (newLang) => {
    translator.setLanguage(newLang);
})

export default translator;
