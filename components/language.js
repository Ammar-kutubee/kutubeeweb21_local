import React from 'react'
import { useSelector } from 'react-redux'

function Language({ children }) {
    const appLanguage = useSelector((state) => state.mainReducer.appLanguage)
    useEffect(() => {
        console.log('appLanguage11111', appLanguage)
        return () => {

        }
    }, [])
    return (
        <div
            className={appLanguage == 'ar' ? 'rtlDir' : ''}
        >
            {children}
        </div>
    )
}

export default Language
