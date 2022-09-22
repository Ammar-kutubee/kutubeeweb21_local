import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LastBadgeProfile({ latestBadge,name,className }) {
    const { t, i18n } = useTranslation([], { useSuspense: false })

    return (
        <div className={"flex-wrapper-row " + className }>

            <div className='profile-block-lastbadge' style={{ maxWidth: '15%',display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" }}>
                <img style={{ width: '100%' }} src={latestBadge.coverUrl} />
                <div style={{
                    fontSize:28,
                    color:"#F1C100",
                    fontFamily:"FFHekaya-Light",
                    marginTop:-20
                }}>{t("badges.mainTitle")}</div>
            </div>
            <div className="flex-wrapper-col">
                <div style={{ marginBottom: '0px', marginTop: '20px',
                // marginLeft: "1%",
                // marginRight: "1%",
                display:"flex",
                alignItems:"center"
            }} className={` section-title`} 
                dangerouslySetInnerHTML={{ __html: t("badges.wellDone", { name: name })}  }
                >
                    
                    </div>

                <div className="latestbadgekeep" style={{marginTop:10,display:"flex",alignItems:"center"}} dangerouslySetInnerHTML={{ __html: t("leaderboard.keepWorking")}  }></div>
                <div className="latestbadgeblack" style={{marginTop:18}}> {latestBadge.name}</div>

            </div>

        </div>
    )
}
