import React, { useEffect, useState } from 'react'
import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Router from 'next/router'
import { useSelector } from 'react-redux';

export default function BookTitleAndRating({ title, rating, language, numberOfRatings, setOpened,bookReads }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    const [backType,setBackType] = useState("");

    const roleType = useSelector((state) => state.mainReducer.loggedInUser.userData.type);


    const backTo = () => {
        // let urlParams = new URLSearchParams(window.location.search);
        // let destination = urlParams.get("destination");

        // if(destination !== null) {
        //     Router.push(destination)
        // } else {
            window.history.back(-1)
      //  }
    }

    let backPosition = {
        right:0,
        top:0,
        left:"auto"
    }
    if(language !== "ar") {
        backPosition = {
            right:"auto",
            left:0,
            top:0,
        }
    }

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let type = urlParams.get("type");

        if(type !== null && type !== undefined) {

            setBackType(type)
        }
    },[])
    return (
        <div className="titleRatingWrapper">
            <div className="titleWrapper" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:15}}>
                <div className="titleText">{title}</div>
                <div
                onClick={backTo}
                style={{
            
            fontFamily: "FFHekaya-Light",
            fontSize: "30px",
            color: "rgb(106, 195, 219)",
            padding: "0px",
            marginTop: 0,
            borderRadius: 20,
            lineHeight: "1",
            cursor: "pointer",
            display:"flex",
            alignItems:"center",
            position:"absolute",
            ...backPosition
            
            }}>

{language === "ar" && <svg style={{transform:"rotate(180deg)"}} width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 10L1 5.5L5.5 0.999999" stroke="#6AC3DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}

{language !== "ar" && <svg style={{transform:"rotate(0deg)"}} width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 10L1 5.5L5.5 0.999999" stroke="#6AC3DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}



{language === "ar" &&<div style={{padding:"0px 10px 0",margin:"-10px 0px 0px 0px"}}>
                {/* {language === "en" && "Back"}
                {language === "ar" && "رجوع"}
                {language === "fr" && "Back"} */}
                                {backType === "assignment" &&  i18n.t("book.backAssignment",{ lng: language })}
                                {backType === "openlibrary" &&  i18n.t("book.backOpenLibrary",{ lng: language })}
                                {backType === "levels" &&  i18n.t("book.backLevels",{ lng: language })}

                                {backType === "" && i18n.t("book.backBt",{ lng: language })}

                {/* {i18n.t("book.backBt",{ lng: language })} */}
                </div>}

                
                {language !== "ar" &&<div style={{padding:"0px 10px 0",margin:"-5px 0px 0px 0px"}}>
                {/* {language === "en" && "Back"}
                {language === "ar" && "رجوع"}
                {language === "fr" && "Back"} */}
                {backType === "openlibrary" &&  i18n.t("book.backOpenLibrary",{ lng: language })}
                {backType === "levels" &&  i18n.t("book.backLevels",{ lng: language })}

                {backType === "assignment" &&  i18n.t("book.backAssignment",{ lng: language })}
                {backType === "" && i18n.t("book.backBt",{ lng: language })}

                </div>}
                
            </div>
            </div>

            {roleType === "teacher"? <div id="stdNo">{i18n.t("bookComponent.studentNo",{ lng: language })} <span>{bookReads} {i18n.t("bookComponent.student",{ lng: language })}</span></div>:
            <div className="flex-wrapper-row align-center " style={{ gap: '0.5vw' }}>
            <div className="ratingWrapper">
                <svg
                    width={34}
                    height={34}
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.668 14.996a.722.722 0 01-.346-.087l-3.833-2.107-3.833 2.107a.722.722 0 01-.794-.061.808.808 0 01-.296-.775l.751-4.443L.221 6.474a.817.817 0 01-.188-.79.763.763 0 01.609-.536l4.284-.655L6.812.445A.75.75 0 017.49 0a.75.75 0 01.676.445l1.91 4.04 4.283.655c.284.043.52.25.61.537a.817.817 0 01-.189.789l-3.096 3.156.751 4.443a.808.808 0 01-.3.79c-.136.1-.3.15-.466.141z"
                        fill="#FFD217"
                    />
                </svg>
                <div>
                    <div className="ratingText">{rating}</div>

                </div>

            </div>
            <div style={{cursor:"pointer"}} onClick={() => setOpened(true)} className={`numberOfRatings ${language == 'ar' ? 'arabicText' : null}`}>{language != 'ar' ? numberOfRatings + ' ' + t('bookScreen.ratings', { lng: language }) : t('bookScreen.ratings', { lng: language }) + ' ' + numberOfRatings}</div>
        </div>
            }

            

        </div>
    )
}
