import i18next from 'i18next';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';


const AppLang = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter();
    const dispatch = useDispatch()
    function changeAppLanguage(language) {
        localStorage.setItem('appLanguage', language)
        // i18next.language(language)
        dispatch({ type: "CHANGE_LANGUAGE", appLanguage: language })
        i18next.changeLanguage(language, (err, t) => {
            if (err)
                return console.log('something went wrong loading', err);
            else {
                t('key');
                router.replace("/home/level")
            }

        });




    }
    return (
        <div>
            <div className="section-title">
                {t('settings.interfaceLanguage')}
            </div>
            <div className="text flex-text">


                <Trans className="text flex-text"
                    i18nKey='settings.appLanguageText' // optional -> fallbacks to defaults if not provided
                    // optional defaultValue

                    components={{ bold: <strong />, }}
                />

            </div>
            <div className="languageButtonsWrapper">
                <div className="languageButton" onClick={() => {
                    changeAppLanguage('ar')
                }}>
                    <div className="languageButtontext">عربي</div>
                    <img className="letters lettersRight" src={"../../assets/images/letters-ar.png"} />
                </div>
                <div className="languageButton" onClick={() => {
                    changeAppLanguage('en')
                }}>
                    <div className="languageButtontext">English</div>
                    <img className="letters" src={"../../assets/images/letters-en.png"} />

                </div>
                <div className="languageButton" onClick={() => {
                    changeAppLanguage('fr')
                }}>
                    <div className="languageButtontext">Français</div>
                    <img className="letters lettersRight" src={"../../assets/images/letters-fr.png"} />

                </div>
            </div>
        </div>
    )
}
AppLang.layout = "In";

export default AppLang;