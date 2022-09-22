import React, { useState } from 'react'
// import Icon from '../../../utils/customIcons'

export default function CustomTextInput({ language,onKeyPressed,icon, name, wrapperStyle, isPassword, placeHolder, onChange, multiline, textInputStyle, value, placeholderColor, autoFocus, error, errorMessage, autoCapitalize, hidden }) {
    const [showPassword, setShowPassword] = useState(false)
    const [height, setHeight] = useState('45px')
    const [readOnly, setReadOnly] = useState(true)
    const eyePressed = () => {
        setShowPassword(!showPassword)
    }
    // onContentSizeChange = (event) => {
    //     if (multiline) {
    //         setHeight(event.nativeEvent.contentSize.height)
    //     }

    // }
    const onFocus = (e)=>{

        if(name === "username" && language === "ar") {
            // e.target.style.textAlign = "left";
            // e.target.style.paddingLeft = "10px";
            // e.target.style.direction = "ltr";
            // e.target.parentElement.classList.add("ltr-field")
        }
        setReadOnly(false)
    }
    const onBlur = (e)=>{
        
        if(name === "username" && language === "ar") {
            // e.target.style.textAlign = "right";
            // e.target.style.direction = "rtl";
            // e.target.parentElement.classList.remove("ltr-field")

        }

    }
    return (
        <div className="textInputWrapper" style={hidden ? { display: 'none' } : {}}>
            {error && <div className="textInputError" />}
            {error && errorMessage && <div className="messageErrorText" >{errorMessage}</div>}
            {icon ?
                <div name={icon} className={` input-ic input-icon icon-${icon} ${error ? 'input-icon-error' : ''}`} />
                :
                null
            }
            <input
                // autoFocus={autoFocus}
                style={hidden ? { display: 'none' } : {}}
                autoCapitalize={autoCapitalize}
                value={value}
                name="fake"
                autocomplete="off"
                multiline={multiline}
                readOnly={readOnly}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(val) => onChange && onChange(name, val.target.value)}
                type={!showPassword && isPassword ? 'password' : 'text'}
                // style={[styles.input, error ? styles.inputError : null, textInputStyle]}
                placeholder={placeHolder}
                onKeyPress={onKeyPressed}
            />
            {
                isPassword ?
                    <div onClick={eyePressed} className="eye" style={{

                    }}>
                        <div className={`${!showPassword ? "icon-password-eye " : "icon-password-eye-closed "}${showPassword ? 'eyeIcon ' : 'eyeIconClosed '}`} />
                    </div>
                    :
                    null
            }
        </div >
    )
}
