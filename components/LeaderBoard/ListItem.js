import React from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function ListItem({ rank, avatar, name, level, point, books, badge, me }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    return (


        <div className={`flex-wrapper-row leaderboarditem `}>
            {me == true &&
                <div className={`me ${i18next.language == "ar" ? "rtlDir" : ""}`} >
                    <div className="you">{t("leaderboard.you")} </div>
                </div>
            }
            <div className="flex-wrapper-row" style={{ width: "25vw", alignItems: "center", gap: "1vw", zIndex: "10" }}>
                <div className="rank"> #{rank}</div>
                <div className="userData">
                    <img className="avatarData" src={avatar} />
                    <div className="name">{name} </div>
                </div>
            </div>
            <div className="flex-wrapper-row" style={{ zIndex: "10" }} >
                {level != "null" &&
                    <div className="leaderlevel black-text-leader"> {t("mainSlides.level.level")} {level} </div>
                }
                <div className="leaderpoints black-text-leader"> {point} {t("leaderboard.points")} </div>
                <div className="books black-text-leader"> {books} {t("leaderboard.books")} </div>
            </div >
            <div className="lastbadge-leader">

                <img style={{ width: '70px' }} src={badge} />



            </div>


        </div >

    )
}
