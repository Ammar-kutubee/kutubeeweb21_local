import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';


const AvatarConfirmation = () => {
    const router = useRouter();
    const avatarLinkBody = useSelector(state => state.mainReducer.avatarLinkBody)
    const { t, i18n } = useTranslation([], { useSuspense: false });

    const GotoHome = () => {
        router.replace("/home/level")
    }
    const editAvatar = () => {
        router.push("/Avatar")
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh"
            }}
        >

            <img src={avatarLinkBody} alt="Avatar Image"
                style={{
                    width: '280px',


                }}
            />
            <div className="yellowText">{t('settings.wow')}</div>
            <div className="section-title">{t('settings.niceAvatar')}</div>


            <div style={{ paddingRight: '4vw', paddingLeft: '4vw', display: "flex", flexDirection: "row", gap: "2vw", width: "40%" }} className="btn-wrapper-avatar-width">

                <CustomButton
                    style={{ width: "100%" }}

                    onPress={editAvatar}
                    text={t('settings.editAvatar')}


                />
                <CustomButton
                    style={{ width: "100%" }}
                    onPress={GotoHome}
                    text={t('settings.home')}


                />
            </div>
        </div>
    )
}

AvatarConfirmation.layout = "Empt";

export default AvatarConfirmation;