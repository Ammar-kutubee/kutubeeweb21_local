import React, { useState } from 'react'
// import ImageView from 'react-native-image-view';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
export default function BookScreenshots({ language, screenShots }) {

    const { t, i18n } = useTranslation([], { useSuspense: false });

    const [opened, setOpened] = useState(false)
    const onClose = () => {
        setOpened(false)
    }
    const openScreenShots = () => {
        setOpened(true)
    }
    const screenShots2 = screenShots.map(screenshot => {
        return {
            uri: screenshot
        }
    })
    return (
        screenShots.length != 0 ?
            <>
                <div className="sectionTitle container">{i18n.t('bookScreen.innerPages', { locale: language })}</div>
                <div
                    style={{
                        marginBottom: '40px',
                    }}

                >

                    {screenShots.map((screenshot, index) =>
                        <div onPress={openScreenShots} key={index}>
                            <img

                                src={screenshot}
                            />
                        </div>
                    )}
                </div>
                <div>
                    {/* <ImageView
                        images={screenShots2}
                        imageIndex={0}
                        isSwipeCloseEnabled={false}
                        // isPinchZoomEnabled={false}
                        visible={opened}
                        backgroundColor={'#000000EE'}
                        presentationStyle={'pageSheet'}
                        onRequestClose={onClose}
                    /> */}
                </div>
            </>
            :
            null
    )
}