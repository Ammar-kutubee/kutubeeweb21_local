import i18next from 'i18next';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';


const APPColor = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter();
    const dispatch = useDispatch()
    const { appTheme } = useSelector(state => state.mainReducer)

    const themes = [{
        name: 'blue-theme',
        color: '#6AC3DB'
    }, {
        name: 'orange-theme',
        color: '#F4AA71'
    },
    {
        name: 'purple-theme',
        color: '#C99FCA'
    },
    {
        name: 'pink-theme',
        color: '#ED6888'
    },
    {
        name: 'red-theme',
        color: '#EE767D'
    },
    {
        name: 'green-theme',
        color: '#00783B'
    }

    ]
    function changeAPPColor(color) {
        localStorage.setItem('AppColor', color)
        dispatch({ type: 'CHANGE_THEME', appTheme: color })



    }
    return (
        <div>
            <div className="section-title">
                {t('settings.appBackgroundColor')}
            </div>
            <div className="text flex-text">


                <Trans className="text flex-text"
                    i18nKey='settings.appBackgroundColorText' // optional -> fallbacks to defaults if not provided
                    // optional defaultValue

                    components={{ bold: <strong />, }}
                />

            </div>
            {themes.map(theme => {
                return <div className={`colorButtonsWrapper ${appTheme == theme.name ? "activecolor" : ""}`}
                    style={
                        appTheme == theme.name ? { boxShadow: ` 0 0 0 3px ${theme.color}` } : {}
                    }
                    onClick={() => {
                        changeAPPColor(theme.name)
                    }}>
                    <div className={`colorButton`} style={{ backgroundColor: theme.color }} >


                    </div>
                    <div className="colorButtontext">
                        {appTheme == theme.name ?
                            t("settings.selected")
                            :
                            t("settings.select")
                        }
                    </div>
                </div>
            })}
        </div>
    )
}
APPColor.layout = "In";

export default APPColor;