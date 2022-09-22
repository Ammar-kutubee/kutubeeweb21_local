import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Input, Label, Menu } from 'semantic-ui-react'


export default function Menulist() {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()
    const { activeItem, setActiveItem } = useState()
    let applang = localStorage.getItem('color')
    let appColor = localStorage.getItem('AppColor')

    if (appColor == "purple-theme") {
        appColor = "Purple"
    }
    if (appColor == "orange-theme") {
        appColor = "Orange"
    }
    if (appColor == "blue-theme") {
        appColor = "Blue"
    }
    if (appColor == "pink-theme") {
        appColor = "Pink"
    }
    if (appColor == "red-theme") {
        appColor = "Red"
    }
    if (applang == "ar") {
        applang = "عربي"
    }
    if (applang == "en") {
        applang = "English"
    }
    if (applang == "fr") {
        applang = "Français"
    }
    const handleItemClick = (e, { name }) => {
    }

    return (
        <div>
            <Menu vertical>


                <div className="flex-wrapper-col menu-item">
                    <Menu.Item
                        className="section-title"
                        name={t('settings.password')}
                        active={activeItem === 'password'}
                        onClick={handleItemClick}
                    >
                        <Label >{t("settings.edit")}</Label>
                        {t('settings.password')}
                    </Menu.Item>
                    <div className="grey-menu-text">{'*'.repeat(8)}</div>
                </div>
                <div className="flex-wrapper-col menu-item">
                    <Menu.Item
                        className="section-title"
                        name={t('settings.interfaceLanguage')}
                        active={activeItem === 'interfaceLanguage'}
                        onClick={() => router.push('/settings/app_language')}
                    >
                        <Label className="grey-menu-text">{t("settings.edit")}</Label>
                        {t('settings.interfaceLanguage')}

                    </Menu.Item>
                    <div className="grey-menu-text"> {applang}</div>

                </div>
                <div className="flex-wrapper-col menu-item">
                    <Menu.Item
                        className="section-title"
                        name={t('settings.appBackgroundColor')}
                        active={activeItem === 'appBackgroundColor'}
                        onClick={() => router.push('/settings/app_color')}
                    >
                        <Label className="grey-menu-text">{t("settings.edit")}</Label>
                        {t('settings.appBackgroundColor')}

                    </Menu.Item>
                    <div className="grey-menu-text">{appColor}</div>

                </div>
                <div className="flex-wrapper-col menu-item">
                    <Menu.Item
                        className="section-title"
                        name={t('settings.privacyPolicy')}
                        active={activeItem === 'privacyPolicy'}
                        onClick={() => router.push('/settings/privacy_policy')}

                    >
                        <Label className="grey-menu-text icon-right-arrow"></Label>
                        {t('settings.privacyPolicy')}


                    </Menu.Item>
                </div>
                <div className="flex-wrapper-col menu-item">
                    <Menu.Item
                        className="section-title"
                        name={t('settings.terms')}
                        active={activeItem === 'terms'}
                        onClick={() => router.push('/settings/terms_and_conditions')}

                    >
                        <Label className="icon-right-arrow"></Label>
                        {t('settings.terms')}


                    </Menu.Item>
                </div>
                <div className="flex-wrapper-col menu-item">
                    <Link href="https://www.kutubee.com/" passHref={true}>
                        <Menu.Item
                            className="section-title"
                            name={t('settings.contact')}
                            active={activeItem === 'contact'}

                        >
                            <Label className="grey-menu-text icon-right-arrow"></Label>
                            {t('settings.contact')}


                        </Menu.Item>
                    </Link>

                </div>

                <div className="flex-wrapper-col menu-item">

                    <Menu.Item
                        className="section-title"
                        name={t('settings.aboutKutubee')}
                        active={activeItem === 'aboutKutubee'}
                        onClick={() => router.push('/settings/about_kutubee')}

                    >
                        <Label className=" grey-menu-text icon-right-arrow"></Label>
                        {t('settings.aboutKutubee')}


                    </Menu.Item>

                </div>


            </Menu>

        </div >
    )
}
