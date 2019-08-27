import * as moment from 'moment';
import 'moment/locale/fr';

import EN from './translations/en';
import FR from './translations/fr';

const Translations = {
    en: EN,
    fr: FR,
};

class Translator {
    constructor(defaultLanguage = 'fr') {
        this.setLanguage(defaultLanguage);
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
            default:
                return '';
        }
    }
}

const translator = new Translator();

export default translator;
