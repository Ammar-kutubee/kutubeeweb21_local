import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getPointsData } from '../../../src/utils/apis';
import BackButton from '../../../components/BackButton';

import Link from 'next/link';


const Points = ({ userId }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false })
    const [pointsData, setPointsData] = useState([])
    const [arrowStyle,setArrowStyle] = useState({});

    const language = i18n.language

    useEffect(async () => {
        const pointsNumbers = await getPointsData(userId, language)
        setPointsData(pointsNumbers)




        if(i18n.language === "en" || i18n.language === "fr") {
            setArrowStyle({marginLeft:"10px"})
        } else {
            setArrowStyle({marginRight:"10px"})
        }

    }, [language])

    return (
        <div>
            <div className={` section-title`}>
            <div style={{marginBottom:18}}>

            <Link href="/profile">
                    <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"#6AC3DB"}}>
                        <BackButton language={i18n.language} />
                        <div style={{fontSize:30,...arrowStyle}}>{t("leaderboard.back",{ lng: i18n.language })}</div>
                    </div>
                </Link>
                </div>

                {t("totalPoints.totalPointsTitle")}
            </div>
            <div className={` section-title`} style={{ marginTop: '0px',display:"flex",alignContent:"center",alignItems:"center" }} >
                {/* {t("totalPoints.totalPoints", { number: pointsData.total })} */}
                <div>
                <Trans className="text flex-text"
                    i18nKey="totalPoints.totalPoints"
                    values={{ number: pointsData.total }}

                    components={{ span: <span className="yellow-number" />, }}
                />
                </div>
                
                <div style={{display:"flex",alignItems:"center"}}>
                    <img src="/assets/images/new/icon.png" style={{width:50}} />
                    <div>..</div>
                </div>
            </div>

            <div className="pointbreak">
                {t("totalPoints.pointsBreakdown")}
            </div>

            <div className="flex-wrapper col" className="points-wrapper">
                {pointsData.pointsData?.map((item) =>
                    <div className="flex-wrapper-row" style={{ width: '100%', marginBottom: '20px', justifyContent: "space-between" }}>

                        <div style={{ color: item.color }} className="pointname"> {item.title}  </div>
                        <div className="flex-wrapper-row pointsvalue" style={{ gap: '0.6vw' }}>
                            <div style={{ color: item.color }}> {item.points} <span style={{ color: '#000' }} className="pointword">{t("totalPoints.points")} </span> </div>
                        </div>


                    </div>
                )}

            </div>
        </div>
    )
}
Points.layout = "In";

export default Points;