import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import CustomButton from '../CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
export default function BadgeModal({ badge, language, setOpen, open }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal className={` badgemodal levelmodal ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={open}
                mountNode={document.querySelector('.themewrapper')}
                size="tiny"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}

            >


                <Modal.Content scrolling>

                    <Modal.Description className={`${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        {badge &&
                            <div className="badge-item">
                                <div style={{ position: 'relative' }}>
                                    <img className={`${badge.progress != "100%" ? 'greyfilter' : ''}`} img src={badge.coverUrl} />
                                    {badge.progress != "100%" &&
                                        <svg className="locksvg"
                                            width={18}
                                            height={23}
                                            viewBox="0 0 18 23"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity={0.4}
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.092.453C5.84.453 3.17 3.123 3.17 6.376v2.539H.631v13.538h16.923V8.915h-2.538V6.376c0-3.252-2.671-5.923-5.924-5.923zm0 1.69c2.33 0 4.231 1.9 4.231 4.23V8.91H4.862V6.373c0-2.33 1.9-4.23 4.23-4.23zm-6.769 8.46h13.539v10.155H2.323V10.604z"
                                                fill="#AEAEAE"
                                            />
                                        </svg>
                                    }
                                </div>
                                <div className="progressBarWrapper flex-wrapper-row" style={{ width: '100%', gap: '0.2vw' }} >
                                    <div className="progressBar">
                                        <div className="progressBarGreen" style={{
                                            width: badge.progress
                                        }} />

                                    </div>
                                    {badge.progress}
                                </div>
                                <div className="badgeDescription">

{badge.name}
</div>

                                <div className="badgeDescription">

                                    {badge.description}
                                </div>

                            </div>
                        }
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}