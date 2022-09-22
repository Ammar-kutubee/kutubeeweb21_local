import Layout from '../../components/layouts/Layout'
import { useRouter } from 'next/router'
import withAuth from '../../src/utils/withAuth'
import i18n from 'i18next';
import { useDispatch } from 'react-redux';

const LanguageScreen = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    //   goToLogin = () => {
    //     // navigation.navigate('LoginType')
    // }
    function changeAppLanguage(language) {
        localStorage.setItem('appLanguage', language)
        // i18next.language(language)
        dispatch({ type: "CHANGE_LANGUAGE", appLanguage: language })
        i18n.changeLanguage(language, (err, t) => {
            if (err)
                return console.log('something went wrong loading', err);
            else {
                t('key');
                router.replace("/logintype")
            }

        });

    }
    return (
        <div className="pageWrapper">
            <div className="boxWrapper">

                <div >👋</div>
                <div className="yellowText">مرحبا</div>
                <div className="yellowText">Welcome</div>
                <div>
                    <div className="text flex-text-reverse">اختر
                        <div className="textBlack"> لغة </div>
                        <div>التطبيق</div>
                    </div>


                </div>
                <div>
                    <div className="text flex-text">Please Choose
                        <div className="textBlack"> Language </div>
                        <div>for the app</div>
                    </div>
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
        </div>
    )
}



LanguageScreen.layout = "Out";

export default LanguageScreen;