import React from 'react'
import { useTranslation } from 'react-i18next';
import Menu from '../../components/SettingsMenu/Menu'
const Settings = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <div>
            <div className="section-title">
                {t('homeScreen.settings')}
            </div>
            <Menu></Menu>
        </div>
    )
}
Settings.layout = "In";

export default Settings;