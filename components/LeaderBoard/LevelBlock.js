import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { getLeaderData } from '../../src/utils/apis';
import { useEffect,useState } from 'react';

import YellowLeft from './../../components/svgs/YellowLeft';
import YellowRight from './../../components/svgs/YellowRight';

export default function LevelBlock({ levelBlockStyle,title, place, noBooks, nextplace }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [direction,setDirecton] = useState({});


    useEffect(() => {
        if(i18n.language === "en") {
            setDirecton({flexDirection:"row"})
        } else {
            setDirecton({flexDirection:"row-reverse"})
        }
    }, [])
    return (
        <div className="leader-block-wrapper profile-block" style={levelBlockStyle}>

            <div className={`section-title`} style={{ marginBottom: "1vw", marginTop: "1vw" }}>
                {title}
            </div>
            <div className="flex-wrapper-row" style={{ gap: "2vw" }}>
                <div className="leader-place leader-yellow" style={{display:"flex",alignItems:"flex-start",alignContent:"center",flexDirection:"row",...direction}}>
                    <YellowLeft />
                    <span className="purpledigit" style={{padding:"0px 10px",fontSize:"4.8vw"}}>   {place} </span> 
                     {/* <span className="text" >{t("leaderboard.place")} </span> */}
                    <YellowRight />
                </div>

                <div className="" style={{marginTop:-10}}>
                    <div className="textGrey text" style={{display:"flex",alignItems:"center",marginBottom:0,fontSize:32}} dangerouslySetInnerHTML={{ __html: t("leaderboard.keepWorking")}  }>


                    </div>
                    <div className="textGrey text" style={{marginTop:-5,marginBottom:20,fontSize:32}}>
                        <Trans className="text flex-text"
                            i18nKey='leaderboard.readAnother' // optional -> fallbacks to defaults if not provided
                            values={{ text: noBooks }}

                            components={{ span: <strong className="black-text-leader-top" />, }}
                        />
                        <span className="yellow-number leader-yellow"> #{nextplace} </span></div>

                </div>
            </div>
        </div >
    )
}
