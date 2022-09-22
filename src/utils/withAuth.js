import axios from "axios";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdateUserData,getUpdateUserDataCode } from "./apis";
import { getFavBooksIds } from './apis';
import LngDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend'
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { isMobile,isTablet } from 'react-device-detect';

const withAuth = (WrappedComponent) => {

    return (props) => {
        const Router = useRouter();
        const dispatch = useDispatch()
        const [verified, setVerified] = useState(null)
        const [userId, setUserId] = useState(null)
        const state = useSelector(state => state.mainReducer)

        useEffect(async () => {
            

            let queryString = window.location.search;

            let urlParams = new URLSearchParams(queryString);
            
            let code = urlParams.get("code");


            // if(code !== null) {
            //     alert(code)
            // }

            i18n
                .use(resourcesToBackend((language, namespace, callback) => {
                    import(`../../public/locales/${language}/${namespace}.json`)
                        .then((resources) => {
                            console.log('success', resources)
                            callback(null, resources)
                        })
                        .catch((error) => {
                            console.log('errrrr', error)
                            callback(error, null)
                        })
                }))
                .use(initReactI18next)

                .init({
                    supportedLngs: ['en', 'ar', 'fr'],

                    // fallbackLng: ['en', 'ar', 'fr']
                })
            i18n.loadLanguages(['en', 'fr', 'ar'], async (err) => {

                // const appLanguage = await localStorage.getItem('appLanguage')
                // console.log('loaded lang', appLanguage)
                // i18n.changeLanguage(appLanguage, (err, t) => {
                //     if (err)
                //         return console.log('something went wrong loading', err);
                //     else {
                //         if (appLanguage == "ar") {
                //             document.querySelector("body").classList.add("rtlDir")

                //         }
                //     }

                // });
            });
            if (isMobile && !isTablet) {

                
                setVerified(false)
                if(Router.pathname != "/Mobile") {
                    router.replace('/Mobile')
                }
                return
            }
            const user = localStorage.getItem("userLoggedData");
            // i18n.changeLanguage(appLanguage)
            // If there is no access token we redirect to "/" page.
            let userData,userDataJson;

            if(code === null) {
                if (!user) {
                    if (Router.pathname == "/ForgetPassword" || Router.pathname == "/avatar" || Router.pathname == "/language" || Router.pathname == "/logintype" || Router.pathname == "/Interests" || Router.pathname == "/login" || Router.pathname == "/") {
                        setVerified(false)
                    } else {
                        Router.replace("/login");
                    }
    
    
    
                    return
                }
                userDataJson = JSON.parse(user)
                userData = await getUpdateUserData(userDataJson.userData._id, userDataJson.userData.sessionToken, dispatch, userDataJson.userData.type)    
            }

            let codeUserData = {};

            if(code !== null) {
                userData = await getUpdateUserDataCode(code,dispatch);

                userDataJson = userData;
            }
            

            if (userData.status == 'expired') {
                Router.replace("/logintype");
                // setVerified(false)
            } else if (userData.status == 'verified') {
                if (Router.pathname == "/ForgetPassword" || Router.pathname == "/avatar" || Router.pathname == "/language" || Router.pathname == "/logintype" || Router.pathname == "/Interests" || Router.pathname == "/login" || Router.pathname == "/") {

                    




                    setTimeout(async () => {
                        setVerified(true)
                        setUserId(userDataJson.userData._id)
                        await getFavBooksIds(userDataJson.userData._id, dispatch)




                        if (userData.type == "teacher") {

                            router.replace('home/openLibrary')
    
                        }
                        else {
                            router.replace('/home/level')
    
                        }
                    }, 1000);
                } else {
                    setVerified(true)
                    setUserId(userDataJson.userData._id)
                    await getFavBooksIds(userDataJson.userData._id, dispatch)
                }



            } else {
                Router.replace("/logintype");
                setTimeout(() => {
                    setVerified(false)
                }, 1500);
                // setVerified(false)
            }
        }, []);
        useEffect(async () => {
            if (state.loggedInUser?.userData) {
                await getFavBooksIds(state.loggedInUser.userData._id, dispatch)
            }

            return () => {

            }
        }, [state.loggedInUser])
        if (verified == true) {
            if (userId) {
                return <WrappedComponent {...props} userId={userId} />;
            } else {
                return null
            }
        }

        else if (verified == false && (Router.pathname == "/avatar" || Router.pathname == "/ForgetPassword" || Router.pathname == "/language" || Router.pathname == "/logintype" || Router.pathname == "/Interests" || Router.pathname == "/login" || Router.pathname == "/")) {
            return <WrappedComponent {...props} />;

        }

        // else if (verified == false) {
        //     return <WrappedComponent {...props} />;
        // }


        else if (verified == null) {
            return <div class="ui large inverted active dimmer">
                <div class="ui large loader"></div>
            </div>
        }
        else {
            return <WrappedComponent {...props} userId={state.loggedInUser?.userData?._id} />;
        }
        // checks whether we are on client / browser or server.

        // If we are on server, return null
        // return null;

    };

};

export default withAuth;