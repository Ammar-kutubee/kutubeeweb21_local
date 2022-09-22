import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import LevelBlock from './LevelBlock'
import Link from 'next/link';
import { getLeaderData } from '../../src/utils/apis';

export default function LevelBlocksList({ userId }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [leaderData, setLeaderData] = useState([null])
    const [loading, setLoading] = useState(false)

    const levelBlockStyle = {marginLeft:"10px",marginRight:"10px"}

    useEffect(async () => {
        const leader = await getLeaderData(userId, "ar")
        console.log("leader", leader)
        setLeaderData(leader)
        setLoading(true)


    }, [])

    return (

        <div>
            {loading &&
                <>

                    <div className={`flex-wrapper-row align-items justify-content section-title `} style={{ marginTop: '0px', gap: '1vw',padding:"0px 15px",alignItems:"center" }}>

                        <div className="flex-wrapper-row" style={{ gap: "1vw", marginTop: '0px', alignItems: "center", padding: "0px 0px", flexGrow: "1" }}>

                            <svg
                                id="prefix__Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x={0}
                                y={0}
                                viewBox="0 0 35 35"
                                width="35px"
                                xmlSpace="preserve"
                            >
                                <style>{".prefix__st2{fill:#ffd217}.prefix__st5{fill:#38395b}"}</style>
                                <defs>
                                    <path id="prefix__SVGID_1_" d="M0 0h35v35H0z" />
                                </defs>
                                <clipPath id="prefix__SVGID_00000129922279857993987570000017916846593181877639_">
                                    <use xlinkHref="#prefix__SVGID_1_" overflow="visible" />
                                </clipPath>
                                <g clipPath="url(#prefix__SVGID_00000129922279857993987570000017916846593181877639_)">
                                    <path
                                        d="M33.7 34.4H23.1v-8.2c0-.5.4-1 1-1h9.3c.6 0 1 .4 1 1v7.5c0 .4-.3.7-.7.7z"
                                        fill="#94d3e6"
                                    />
                                    <path className="prefix__st2" d="M19 15.8h-3l.9-6.2h1.2l.9 6.2z" />
                                    <path
                                        className="prefix__st2"
                                        d="M14.2.6c-.4 0-.8.3-.8.7v6.8c0 2.1 4 3.4 4 3.4s4-1.3 4-3.4V1.4c0-.4-.3-.7-.8-.7h-6.4zM21.1 20H14v-4.2c0-.4.3-.8.8-.8h5.6c.4 0 .8.3.8.8l-.1 4.2z"
                                    />
                                    <path
                                        d="M11.9 34.4H1.3c-.4 0-.7-.3-.7-.7V23c0-.5.4-1 1-1h9.3c.6 0 1 .5 1 1v11.4z"
                                        fill="#86cf0e"
                                    />
                                    <path
                                        d="M23.2 34.4H11.8V18.8c0-.5.4-1 1-1h9.3c.6 0 1 .4 1 1l.1 15.6z"
                                        fill="#e52730"
                                    />
                                    <path
                                        className="prefix__st5"
                                        d="M17.9 28.6c.2 0 .4-.1.4-.3v-5.2c0-.2-.2-.3-.4-.3-.1 0-.2 0-.2.1l-.8.8c-.1.1-.2.2-.2.3 0 .2.1.3.3.3 0 0 .1 0 .2-.1l.3-.3v4.3c0 .3.2.4.4.4zM4.2 30.3v.7c0 .2.2.3.4.3h2.8c.1 0 .3-.2.3-.4s-.1-.4-.3-.4H5.1v-.3c0-.9 2.5-1.4 2.5-3.1 0-.9-.8-1.6-1.7-1.6-.9 0-1.6.5-1.6 1.4 0 .4.2.5.4.5.3 0 .4-.2.4-.3 0-.5.4-.8.8-.8.6 0 .8.4.8.8.1 1.3-2.5 1.9-2.5 3.2zM29.9 29.8c.4-.2.6-.7.6-1.3 0-1-.7-1.4-1.6-1.4-1.3 0-1.7.8-1.7 1.3 0 .3.1.4.4.4.3 0 .4-.1.4-.3 0-.3.2-.6.8-.6.5 0 .8.2.8.8 0 .7-.3.9-.8.9-.2 0-.3.2-.3.3 0 .2.1.3.3.3.6 0 1 .2 1 .9v.1c0 .7-.3 1-1 1-.6 0-.9-.3-.9-.7 0-.2-.1-.3-.4-.3-.3 0-.4.1-.4.4 0 .6.5 1.4 1.7 1.4 1 0 1.8-.5 1.8-1.7V31c.1-.7-.2-1.1-.7-1.2z"
                                    />
                                    <path
                                        className="prefix__st5"
                                        d="M33.5 24.7h-9.4c-.1 0-.3 0-.4.1v-4.1c0-.3-.2-.5-.5-.5s-.5.2-.5.5V34H12.3v-2.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5V34h-10c-.2 0-.3-.1-.3-.3V23c0-.3.2-.5.5-.5h9.3c.2 0 .3.1.4.2v9.1c0 .3.2-.5.5-.5s.5.8.5.5v-13c0-.3.2-.5.5-.5h9.4c.3 0 .5.2.5.5V21c0 .3.2.5.5.5s.5-.2.5-.5v-2.2c0-.8-.7-1.5-1.5-1.5h-.6v-1.5c0-.7-.6-1.3-1.3-1.3h-1l-.4-2.9c.3-.1.6-.3.9-.5.8-.5 1.5-1 1.8-1.6.2.2.5.2.8.2.7 0 1.3-.6 1.3-1.4 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .2-.1.4-.3.4-.2 0-.3-.2-.3-.4v-.1-.1c0-.3.1-.5.3-.7.2-.2.5-.4.8-.7 1.3-1.1 3-2.6 3.1-4.2.1-.7-.2-1.4-.7-2-.2-.2-.7-.5-1.2-.5-.8 0-1.7.4-2.3.9-.2-.5-.6-.9-1.2-.9h-6.6c-.5 0-1 .3-1.2.8-.6-.4-1.4-.8-2.3-.8-.5 0-1 .3-1.4.7-.5.6-.8 1.3-.7 2 .1 1.7 1.9 3.2 3.1 4.2.3.3.6.5.8.7.2.2.3.5.3.8 0 .2-.1.4-.3.4-.2 0-.3-.2-.3-.4 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .8.6 1.4 1.3 1.4.3 0 .5-.1.8-.2.4.6 1 1.1 1.8 1.6.3.2.6.3.9.4l-.4 2.9h-1c-.7 0-1.3.6-1.3 1.3v1.5h-.6c-.8 0-1.5.7-1.5 1.5v2.7c-.1 0-.3-.1-.4-.1H1.5c-.8.1-1.5.7-1.5 1.6v10.8c0 .6.6 1.2 1.3 1.2h32.5c.7 0 1.3-.6 1.3-1.3v-7.5c-.1-.8-.8-1.5-1.6-1.5zM24.2 1c.3 0 .4.1.6.3.3.4.5.8.5 1.2-.1 1.3-1.7 2.6-2.8 3.5-.2.1-.3.3-.5.4V3.8h.3c.7 0 1.3-.6 1.3-1.3 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .2-.1.3-.3.3-.1 0-.2 0-.2-.1-.1-.1-.1-.1-.1-.2v-.4c.5-.4 1.5-1.1 2.2-1.1zM12.5 6.1c-1.1-.9-2.7-2.3-2.8-3.5 0-.4.1-.8.5-1.2.1-.3.3-.4.6-.4.7 0 1.7.7 2.2 1.1v.4c0 .1-.1.2-.1.2-.1.1-.1.1-.2.1-.2 0-.3-.1-.3-.3 0-.3-.2-.5-.5-.5s-.5.2-.5.5c0 .7.6 1.3 1.3 1.3h.3v2.7c-.2-.1-.4-.3-.5-.4zM14 8.2V1.3c0-.1.1-.2.2-.2h6.6c.1 0 .2.1.2.2v6.9c0 1.4-2.4 2.5-3.5 2.8-1.1-.4-3.5-1.5-3.5-2.8zm3.1 3.8c.2.1.3.1.3.1h.4s.1 0 .3-.1l.4 2.5h-1.6l.2-2.5zm-2.7 3.8c0-.1.1-.3.3-.3h5.6c.1 0 .3.1.3.3v1.5h-6.1v-1.5zM34 33.7c0 .1-.1.2-.2.2h-10v-8c.1-.1.2-.2.4-.2h9.4c.3 0 .5.2.5.5v7.5z"
                                    />
                                </g>
                            </svg>
                            {t('leaderboard.leaderboard')}
                        </div>

                        <Link href="/leaderboard">
                            <div className="save" style={{ marginTop: '0px' }}>
                                {t("homeScreen.openleaderboard")}

                            </div>

                        </Link>

                    </div>

                    <LevelBlock levelBlockStyle={levelBlockStyle} title={t("leaderboard.readingLevel")} place={leaderData.levelBlock.current_rank} noBooks={leaderData.levelBlock.next_bookRead} nextplace={leaderData.levelBlock.next_rank} ></LevelBlock>
                    <LevelBlock levelBlockStyle={levelBlockStyle} title={t("leaderboard.classLevel")} place={leaderData.classBlock.current_rank} noBooks={leaderData.classBlock.next_bookRead} nextplace={leaderData.classBlock.next_rank} ></LevelBlock>
                    <LevelBlock levelBlockStyle={levelBlockStyle} title={t("leaderboard.schoolLevel")} place={leaderData.schoolBlock.current_rank} noBooks={leaderData.schoolBlock.next_bookRead} nextplace={leaderData.schoolBlock.next_rank} ></LevelBlock>
                </>
            }
        </div >


    )
}
