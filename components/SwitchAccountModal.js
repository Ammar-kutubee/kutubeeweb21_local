import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal, Rating } from 'semantic-ui-react'
import CustomButton from './CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { getUpdateUserData, getUserAccounts, getUserData } from '../src/utils/apis';
import router from 'next/router';


export default function SwitchAccountModal({ userId }) {


    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(false)
    const dispatch = useDispatch()
    const sessionToken = useSelector(state => state.mainReducer.loggedInUser.userData.sessionToken)
    const [accounts, setAccounts] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(0)

    const onSwitch = async () => {


        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userLoggedData', JSON.stringify({
            ...accounts[selectedAccount]
        }));
        let message = {
            userData: {
                ...accounts[selectedAccount]
            }
        }
        dispatch({ type: "SAVE_LOGGEDIN_USER", message });
        console.log("accounts[selectedAccount]", message)

        setOpen(false)
        router.reload()
    }

    const onAccountSelect = (index) => {


        setSelectedAccount(index)
    }

    useEffect(async () => {



    }, [accounts])


    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal className={` levelmodal  `}
                open={open}
                size="tiny"
                mountNode={document.querySelector('.themewrapper')}
                onClose={() => setOpen(false)}
                onOpen={async () => {
                    setOpen(true)
                    let userData = await getUserAccounts(userId, sessionToken)
                    console.log("userData", userData)
                    const mainUser = {
                        userData: userData.user,
                        userLevel: userData.level,
                        nextLevel: userData.nextLevel,
                        userLevelEn: userData.levelEn,
                        nextLevelEn: userData.nextLevelEn,
                        userLevelFr: userData.levelFr,
                        nextLevelFr: userData.nextLevelFr,
                    }
                    let subAccounts = userData.subAccounts.map(account => {
                        return {
                            userData: account.user,
                            userLevel: account.level,
                            nextLevel: account.nextLevel,
                            userLevelEn: account.levelEn,
                            nextLevelEn: account.nextLevelEn,
                            userLevelFr: account.levelFr,
                            nextLevelFr: account.nextLevelFr,
                        }
                    })
                    setAccounts([mainUser, ...subAccounts]);

                    console.log("accounts", accounts)

                }}
                trigger={
                    <div className="right-link settings flex-wrapper-row align-center" >
                        <div className="icon-switch"></div>
                        <div className="white-text-samll"> {t('homeScreen.switchAccount')}</div>

                    </div>
                }
            >
                <Modal.Header> <div className={`sectionTitle `}>
                    {t('homeScreen.switchAccount', { lng: "en" })}

                </div>
                    <Modal.Actions >
                        <Button class="ui icon button" onClick={() => setOpen(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description >
                        <div className="accountlist">
                            {accounts.map((account, index) => {
                                return <div className="accountitem" onClick={() => {
                                    onAccountSelect(index)
                                }}>
                                    <div className={`${selectedAccount == index ? "selectaccount" : ""}`}> </div>
                                    <img src={account.userData.avatarlink ? account.userData.avatarlink : '../assets/images/bee.png'} alt="Avatar Image"
                                        style={{
                                            width: '50px',
                                            borderRadius: '50%',
                                            border: '1px solid #e5e5e5',
                                            height: '50px',
                                            display: 'flex',
                                            objectFit: 'contain',
                                            marginInlineEnd: '15px',



                                        }}

                                    />

                                    {account.userData.fname} {account.userData.lname}
                                </div>
                            })}
                        </div>
                        <CustomButton onPress={onSwitch} text={t('bookComponent.done', { lng: "en" })} />
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}
