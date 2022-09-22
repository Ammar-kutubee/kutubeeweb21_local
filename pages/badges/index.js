import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Badge from '../../components/Badge'
import BadgeModal from '../../components/Badge/BadgeModal'
import LastBadge from '../../components/Badge/LastBadge'
import { getBadges } from '../../src/utils/apis'
import BackButton from '../../components/BackButton';
import Link from 'next/link';

const Badges = ({ userId }) => {

    const { t, i18n } = useTranslation([], { useSuspense: false })
    const [badges, setBadges] = useState([])
    const [latestBadge, setLatestBadge] = useState([])
    const name = useSelector(state => state.mainReducer.loggedInUser.userData.fname)
    const [open, setOpen] = React.useState(false)
    const [badge, setBadge] = React.useState(null)
    const [arrowStyle,setArrowStyle] = useState({});
    const language = i18n.language

    useEffect(async () => {
        const Badgeslist = await getBadges(userId, language)
        setBadges(Badgeslist.badgeData)
        setLatestBadge(Badgeslist.lastBadge)

        if(i18n.language === "en" || i18n.language === "fr") {
            setArrowStyle({marginLeft:"10px"})
        } else {
            setArrowStyle({marginRight:"10px"})
        }

    }, [language])

    const onSelectBadge = (badge) => {
        setBadge(badge)
        // console.log("badge", badge)
        setOpen(true)
    }
    return (
        <div>
            <BadgeModal open={open} setOpen={setOpen} badge={badge} language={language} />
            <div className={`  section-title`}  >
            <div style={{marginBottom:18}}>

            <Link href="/profile">
                    <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"#6AC3DB"}}>
                        <BackButton language={i18n.language} />
                        <div style={{fontSize:30,...arrowStyle}}>{t("leaderboard.back",{ lng: i18n.language })}</div>
                    </div>
                </Link></div>
                {t("homeScreen.badges")}



            </div >

            <LastBadge className="inside-badge-block" latestBadge={latestBadge} name={name} />

            <div className="greysep" style={{marginTop:40}}></div>
            <>
                <div style={{
    marginTop: "35px",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom:0

                }} className={` section-title`} >
                    {t("badges.badgeslist")}



                </div >
                <div className="badge-wrapper flex-wrapper-row" style={{gap:"0px"}}>
                    {badges?.map((badge) =>
                        <>

                            <Badge onSelectBadge={onSelectBadge} name={badge.name} url={badge.coverUrl} description={badge.description} progress={badge.progress} badge={badge} ></Badge>

                        </>

                    )}
                </div>
            </>
        </div >
    )
}
Badges.layout = "In";

export default Badges;