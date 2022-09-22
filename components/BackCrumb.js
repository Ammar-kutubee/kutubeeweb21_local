import i18next from 'i18next';
import router from 'next/router';
import React from 'react'

const BackCrumb = ({ type, language }) => {

    console.log("language", language)
    const currentlanguage = i18next.language

    const GoBack = () => {
        router.back()
    }

    return (
        <div>
            {type == "cat" &&
                language == "en" ?
                <div onClick={GoBack} className={`backto ${language != "ar" ? 'rtlDir' : 'ltrDir'}`}>
                    <div className={`icon-right-arrow `}></div>

                    <p> Back to library categories</p>

                </div>
                :
                <div onClick={GoBack} className={` backto ${language == "ar" ? 'rtlDir' : 'ltrDir'}`}>
                    <div className={`icon-right-arrow `}></div>

                    <p>العودة إلى مكتبة التصنيفات </p>
                </div>

            }

        </div>
    )
}
export default BackCrumb;