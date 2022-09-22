import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'
import Happy from "../components/Bees/Happy"

export default function MessageItem() {
    const message = useSelector(state => state.mainReducer.message)
    const dispatch = useDispatch()
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {

        if (message) {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
                dispatch({ type: 'CHANGE_MESSAGE', message: null })


            }, 4000);
        }
        return () => {
        }
    }, [message])
    return (
        <div>
            {showMessage &&
                <Message floating content={<div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: "0.3vw" }}> <Happy width={40} height={40}></Happy>{message}</div>}


                />
            }
        </div>
    )
}
