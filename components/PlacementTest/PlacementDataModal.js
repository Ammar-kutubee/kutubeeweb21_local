import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import CustomButton from '../../components//CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import GlobalAudio from './GlobalAudio';

export default function PlacementDataModal({ open, onOpenModal,currentLanguage2 }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const stateData = useSelector(state => state.mainReducer.placementData)
    const stateLang = useSelector(state => state.mainReducer.placementLanguage)
    const [placementData, setPlacementData] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState()
    const [audioPaused, setAudioPaused] = useState(false)

    const playPlacementAudio = () => {
        setAudioPaused(false)
    }

    const onAudioEnd = () => {
        setAudioPaused(true)
    }

    const closeModal = () => {
        onOpenModal(false)
    }

    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>

            <Modal className={` levelmodal ${currentLanguage == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={open}
                mountNode={document.querySelector('.themewrapper')}
                size="large"
                onClose={() => onOpenModal(false)}
                onOpen={() => {
                    setPlacementData(stateData)
                    setCurrentLanguage(stateLang)

                    onOpenModal(true)
                }
                }
                trigger={<Button className="readagainbtn"> {
                    currentLanguage2 === "ar"?"أريد القراءة مرة أخرى":"Read Again"}
                    {/* t("placementTest.readAgain", { lng: currentLanguage })} */}
                    
                    
                    </Button>}
            >
                <Modal.Header> <div className={`sectionTitle ${currentLanguage == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                    {placementData.name}

                </div>
                    <Modal.Actions >
                        <Button class="ui icon button" onClick={() => onOpenModal(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description className={`${currentLanguage == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        <div className={` ${currentLanguage == "ar" ? "rtlDir" : "ltrDir"}`} style={{
                            flexGrow: 1,
                            justifyContent: 'flex-start',
                            paddingTop: 50,
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '72%',
                            margin: 'auto'
                        }}>
                            {stateData &&
                                <>
                                    {/* {(placementData.audioInstruction != null && placementData.audioInstruction != '') && open &&
                                        <GlobalAudio audioLink={placementData.audioInstruction} paused={audioPaused} onEnd={onAudioEnd} />
                                    } */}
                                    {/* <div className="section-title" style={{ paddingBottom: '20px' }}>{item.name}</div> */}
                                    <div style={{
                                        flexGrow: 1,
                                        width: '100%',
                                        position: 'relative'
                                    }}>
                                        <div
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <img
                                                src={placementData.imageInside}
                                                style={{
                                                    margin: 'auto',
                                                    borderRadius: '16px',
                                                    display: 'block'
                                                }}
                                            />
                                            <div
                                                style={{ fontSize: placementData.fontSize + 'px', lineHeight: placementData.lineHeight + 'px' }}
                                                className={`placementDescription  ${currentLanguage == 'ar' ? "adobeStyle" : ""}`}
                                            >


                                                {placementData.description?.split("\n").map((i, key) => {
                                                    return <div key={key}>{i}</div>;
                                                })}



                                            </div>
                                            {/* <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-test-width">

                                                <CustomButton
                                                    onPress={closeModal()}
                                                    buttonStyle={{
                                                        marginTop: "20px",
                                                        marginBottom: "20px"
                                                    }}
                                                    text={t('bookComponent.done', { lng: currentLanguage })}
                                                />
                                            </div> */}

                                        </div>

                                    </div>
                                </>
                            }
                        </div>

                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}