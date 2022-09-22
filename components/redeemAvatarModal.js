import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Item, Modal, Rating } from 'semantic-ui-react'
import CustomButton from './CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { getUpdateUserData, getUserAccounts, getUserData, redeemAsset } from '../src/utils/apis';
import CloseBt from './../components/svgs/Close';


export default function RedeemAvatarModal({ userId, setOpen, open, points, Asseststype, type, index, lockedItemSvg, onAfterRedeem,getPreviewAvatar }) {


    const state = useSelector(state => state.mainReducer)

    const { t, i18n } = useTranslation([], { useSuspense: false });
    // const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})

    const [confirmMessage,setConfirmMessage] = useState("");
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);


    useEffect(async () => {
        getData()
        return () => {

        }
    }, [])

    const onRedeem = async () => {

        
        console.log("points", points)
        console.log("Asseststype", Asseststype)
        console.log("type", type)
        console.log("index", index)
        console.log('userId', state.loggedInUser.userData._id)
        let redeem = await redeemAsset(points, Asseststype, type, index, state.loggedInUser.userData._id, state.loggedInUser.userData.gender)
        if (redeem.message == 'success') {
            if (state.appLanguage == "ar") {
                { dispatch({ type: 'CHANGE_MESSAGE', message: "لقد قمت بشراء شكل جديد" }) }
                setConfirmMessage("لقد قمت بشراء شكل جديد")
                setShowConfirmPopup(false);

                setTimeout(() => {
                    setOpen(false)
                    setConfirmMessage("");
                    
                }, 3000);
            }
            else { 
                dispatch({ type: 'CHANGE_MESSAGE', message: "You have redeemed a new item" }) 
                setConfirmMessage("لقد قمت بشراء شكل جديد")
                setShowConfirmPopup(false);

                setTimeout(() => {
                    setOpen(false)
                    setConfirmMessage("");
                }, 3000);
            }
        } else {
            if (state.appLanguage == "ar") {
                { dispatch({ type: 'CHANGE_MESSAGE', message: "لا يوجد لديك النقاط الكافية للشراء" }) }

                setConfirmMessage("لا يوجد لديك النقاط الكافية للشراء")
                setShowConfirmPopup(false);

                setTimeout(() => {
                    setOpen(false)
                    setConfirmMessage("");
                }, 3000);

            }
            else { dispatch({ type: 'CHANGE_MESSAGE', message: "You dont have enough points to redeem" }) 
        
            setConfirmMessage("You dont have enough points to redeem")
            setShowConfirmPopup(false);

            setTimeout(() => {
                setOpen(false)
                setConfirmMessage("");

            }, 3000);

            }
        }

 
        onAfterRedeem(redeem)
    }
    const getData = async () => {
        let userData = await getUserData(state.loggedInUser.userData._id)
        setUserData(userData)
    }
    useEffect(async () => {
        if (open) {
            getData()
        }
        return () => {

        }
    }, [open])
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal className={` pointsmodal  `}
                open={open}
                size="tiny"
                mountNode={document.querySelector('.themewrapper')}
                onClose={() => setOpen(false)}

                onOpen={() => {
                    console.log('sssssssssssssssss')
                    // let userData = await getUserData(state.loggedInUser.userData._id)
                    // setUserData(userData)
                    // setOpen(true)
                }}
            >
                <Modal.Header>

                    <Modal.Actions >
                        <Button style={{margin:0,padding:0}} class="ui icon button" onClick={() => setOpen(false)} primary>
                            {/* <i class="bluek large close icon"></i> */}
                            <CloseBt width={19} height={19} viewBox="0 0 19 19" />
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content>

                    <Modal.Description >
                        

                        {showConfirmPopup === false &&
                        <>

{confirmMessage !== ""?<div className={`sectionTitle `} style={{ justifyContent: 'center', diplay: "flex", flexDirection: "column", alignItems: 'center' }}>تم الشراء بنجاح</div>:
                        <>
                        <div className={`sectionTitle `} style={{ justifyContent: 'center', diplay: "flex", flexDirection: "column", alignItems: 'center',paddingBottom:0,marginBottom:0 }}>
                            {/* {t('homeScreen.switchAccount', { lng: "en" })} */}
                            {/* <div>{t('avatar.redeem.currentPoint')} </div> */}
                            <div>{t('avatar.redeem.getItem2')} </div>

                            {/* <div className="purplepoints"> {userData.points} {t('homeScreen.points')}</div> */}
                            <div className="purplepoints yellow-bbt"> {points} {t('homeScreen.points')}</div>

                        </div>
                        {/* {lockedItemSvg} */}

                        <div>{
                        // setTimeout(() => {
                            getPreviewAvatar()
//                        }, 3000)
                        }</div>

                        <div className="pointsModaldescription">
                            {t('avatar.redeem.currentPoint2')} <span className='yellow-bbt'>{userData.points} {t('homeScreen.points')}</span>
                            {/* {t('avatar.redeem.getItem', { points })} */}
                        </div>
                        {userData.points >= points &&
                            <div style={{ width: '75%', marginTop: '25px' }} >

                                <CustomButton onPress={() => {
                                    setShowConfirmPopup(true)
                                }} text={t('avatar.redeem.redeemPoints')} />
                            </div>
                        }

                        </>
                        }
                       

                        
                        


                                                </>

                        }
{showConfirmPopup === true &&
                                <>
                               
                                <div className={`sectionTitle `} style={{ justifyContent: 'center', diplay: "flex", flexDirection: "column", alignItems: 'center' }}>{t('avatar.redeem.ConfirmTxt')}</div>
                                <div>{
                        // setTimeout(() => {
                            getPreviewAvatar()
//                        }, 3000)
                        }</div>
                              
                                <div style={{ width: '75%', marginTop: '25px',display:"flex",gap:"20px" }} >


                                    

                                    <div style={{flex:1}} ><CustomButton onPress={onRedeem} text={t('avatar.redeem.answerYes')} /></div>
                                    <div style={{flex:1}} ><CustomButton onPress={() => {
                                                        setOpen(false)
                                                        setShowConfirmPopup(false)

                                    }} text={t('avatar.redeem.answerNo')}/></div>

                                </div>
                            </>
                        }
                        
                        

                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}
