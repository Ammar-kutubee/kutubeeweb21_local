import router, { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/layouts/Layout'
import withAuth from '../../src/utils/withAuth';

const LoginType = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false })

    const router = useRouter();

    const GoToLogin = (type) => {
        router.push({
            pathname: '/login',
            query: {
                type

            }
        },
            undefined,
            {
                shallow: true
            })
    }

    return (
        <div className="pageWrapper">
            <div className="boxWrapper">
                <div className="loginboxWrapper">
                    <div>
                        <div className="yellowText">{t("titles.login")}</div>
                        <div className="text"> {t('login.loginType')}</div>

                    </div>
                    <div className="loginbox-btns">

                        <div
                            className="loginboxButton" onClick={() => GoToLogin('individual')}
                        // onClick={() => {
                        //     goToLogin('individual')
                        // }}
                        >
                            <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/individual.png)` }}> </div>


                            <div className="loginboxButtonText">{t("login.families")}</div>


                        </div>


                        <div className="loginboxButton" onClick={() => GoToLogin('schools')}


                        /* onClick={() => {
                                // goToLogin('schools')
                            }} */
                        >

                            <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/schools.png)` }}></div>

                            <div className="loginboxButtonText">{t("login.schools")}</div>

                        </div>


                    </div>

                </div>
            </div>
        </div>

    )
}

LoginType.layout = "Out";

export default LoginType;