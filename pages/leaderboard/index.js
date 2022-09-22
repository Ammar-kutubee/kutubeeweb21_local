import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ListItem from '../../components/LeaderBoard/ListItem';
import BackButton from '../../components/BackButton';
import { getLeaderBoardClass, getLeaderBoardReading, getLeaderBoardSchool, getLeaderData } from '../../src/utils/apis';


const Leaderboard = ({ userId }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [readingLevelData, setReadingLevelData] = useState([])
    const [classLevelData, setClassLevelData] = useState([])
    const [schoolLevelData, setSchoolLevelData] = useState([])
    const [leaderData, setLeaderData] = useState([null])
    const [loading, setLoading] = useState(false)
    const [arrowStyle,setArrowStyle] = useState({});


    const [ranking, setRanking] = useState("")

    const handleSelect = async (key) => {
        console.log('chaaaange', key)
        if (key == 0) {
            const reading = await getLeaderBoardReading(userId, "ar")

            
            setReadingLevelData(reading)

            if(reading.current_rank !== undefined) {
                // if(reading.current_rank < 20) {
                //     let find = reading.userData.findIndex((item) => item._id === userId);
                //     if(find !== -1) {
                //         setRanking(find + 1);
                //     }
                // } else {
                    setRanking(reading.current_rank);
               // }
                //             let find = reading.userData.findIndex((item) => item.userData._id === userId)
                // if(find !== -1) {
                //     setRanking
                // }
            } else {
                setRanking("")
            }
            // let find = reading.findIndex((item) => item)
            // console.log("reading_find", find)
        }
        else if (key == 1) {
            const classData = await getLeaderBoardClass(userId)
            setClassLevelData(classData)
            if(classData.current_rank !== undefined) {
                // let find = classData.userData.findIndex((item) => item._id === userId);
                // if(find !== -1) {
                //     alert(find);
                //     setRanking(find + 1);
                // } else {
                    setRanking(classData.current_rank);
             //   }
                // setRanking(classData.current_rank);
            } else {
                setRanking("")
            }
            // console.log("class", classData)

        }
        else if (key == 2) {

            const school = await getLeaderBoardSchool(userId)
            setSchoolLevelData(school)

            if(school.current_rank !== undefined) {
                setRanking(school.current_rank);
            } else {
                setRanking("")
            }
            // console.log("school", school)
        }
        setTabIndex(key)

    }
    useEffect(async () => {

        if(i18n.language === "en") {
            setArrowStyle({marginLeft:"10px"})
        } else {
            setArrowStyle({marginRight:"10px"})
        }
        const reading = await getLeaderBoardReading(userId, "ar")
        setReadingLevelData(reading)


        if(reading.current_rank !== undefined) {
            setRanking(reading.current_rank);
        } else {
            setRanking("")
        }

        const leader = await getLeaderData(userId, "ar")
        setLeaderData(leader)
        setLoading(true)


    }, [])






    return (

        <>
            <div className={`section-title`} >
                <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"#6AC3DB"}} onClick={() => window.history.back(-1)}>
                    <BackButton language={i18n.language} />
                    <div style={{fontSize:30,...arrowStyle}}>{t("leaderboard.back")}</div>
                </div>


            </div >
            <div className="dashboard-title" style={{width:"100%",marginBottom:70}}>{t("homeScreen.leaderboard")}</div>
            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} >

                <div className={`flex-wrapper-row `}>

                    <TabList activeTabClassName="ActiveTab" className="skills-tabs" style={{
                            borderBottom: "1px solid #E5E5E5",
                            borderRadius: "0px"
                    }}>
                        <Tab>{t("leaderboard.readingLevel")}</Tab>
                        <Tab>{t("leaderboard.classLevel")}</Tab>
                        <Tab>{t("leaderboard.schoolLevel")}</Tab>


                    </TabList>

                </div>
                <TabPanel>


                    {loading &&
                        <>
                            <div className="leader-block-wrapper leader-tabs-page">

                                <div className="userimg">
                                    <img style={{ width: "80px" }} className="avatarData" src={leaderData.avatarlink} />
                                </div>

                                <div className="leader-place">
                                    <span className="purpledigit">
                                        {/* {leaderData.levelBlock.current_rank}  */}
                                        <div>{ranking}{ranking === 1 && "st"}{ranking === 2 && "nd"}{ranking > 2 && "th"}</div>
                                        
                                         </span> <span className="text" >{t("leaderboard.place")} </span>
                                </div>


                                <div className="">
                                    <div className="textGrey text" style={{marginBottom:0,display:"flex",alignItems:"center"}} dangerouslySetInnerHTML={{ __html: t("leaderboard.keepWorking")}  }></div>
                                    <div className="textGrey text" style={{marginBottom:0}}>
                                        <Trans className="text flex-text"
                                            i18nKey='leaderboard.readAnother' // optional -> fallbacks to defaults if not provided
                                            values={{ text: leaderData.levelBlock.next_bookRead }}

                                            components={{ span: <strong className="black-text-leader-top" />, }}
                                        />
                                        <span className="yellow-number leader-yellow"> #{leaderData.levelBlock.next_rank} </span>
                                        </div>

                                </div>
                            </div>


                            {readingLevelData.userData?.map((item, index) => (
                                

                                <ListItem rank={item.rank} me={item.userData.me} avatar={item.userData.avatarLinkHead} name={item.userData.fname + " " + item.userData.lname} level={item.userData.level} point={item.userData.points} books={item.bookRead} badge={item.lastBadge} />
                            ))}
                        </>
                    }

                </TabPanel>

                <TabPanel>
                    {loading &&
                        <>
                            <div className="leader-block-wrapper leader-tabs-page">

                                <div className="userimg">
                                    <img style={{ width: "80px" }} className="avatarData" src="../assets/images/bee.png" />
                                </div>

                                <div className="leader-place">
                                    <span className="purpledigit">
                                    {ranking}
                                        {/* {leaderData.classBlock.current_rank}   */}
                                    </span> <span className="text" >{t("leaderboard.place")} </span>
                                </div>


                                <div className="">
                                    <div className="textGrey text" style={{marginBottom:0,display:"flex",alignItems:"center"}} dangerouslySetInnerHTML={{ __html: t("leaderboard.keepWorking")}  }></div>
                                    <div className="textGrey text" style={{marginBottom:0}}>
                                        <Trans className="text flex-text"
                                            i18nKey='leaderboard.readAnother' // optional -> fallbacks to defaults if not provided
                                            values={{ text: leaderData.classBlock.next_bookRead }}

                                            components={{ span: <strong className="black-text-leader-top" />, }}
                                        />
                                        <span className="yellow-number leader-yellow"> #{leaderData.classBlock.next_rank} </span></div>

                                </div>
                            </div>





                            {classLevelData.userData?.map((item, index) => (


                                <ListItem rank={item.rank} me={item.userData.me} avatar={item.userData.avatarLinkHead} name={item.userData.fname + " " + item.userData.lname} level={"null"} point={item.userData.points} books={item.bookRead} badge={item.lastBadge} />
                            ))}
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {loading &&
                        <>
                            <div className="leader-block-wrapper leader-tabs-page">

                                <div className="userimg">
                                    <img style={{ width: "80px" }} className="avatarData" src="../assets/images/bee.png" />
                                </div>

                                <div className="leader-place">
                                    <span className="purpledigit">
                                        {ranking}
                                        {/* {leaderData.schoolBlock.current_rank}   */}
                                        </span> <span className="text" >{t("leaderboard.place")} </span>
                                </div>


                                <div className="">
                                    <div className="textGrey text" style={{marginBottom:0,display:"flex",alignItems:"center"}} dangerouslySetInnerHTML={{ __html: t("leaderboard.keepWorking")}  }></div>
                                    <div className="textGrey text" style={{marginBottom:0}}>
                                        <Trans className="text flex-text"
                                            i18nKey='leaderboard.readAnother' // optional -> fallbacks to defaults if not provided
                                            values={{ text: leaderData.schoolBlock.next_bookRead }}

                                            components={{ span: <strong className="black-text-leader-top" />, }}
                                        />
                                        <span className="yellow-number leader-yellow"> #{leaderData.schoolBlock.next_rank} </span></div>

                                </div>
                            </div>


                            {schoolLevelData.userData?.map((item, index) => (


                                <ListItem rank={item.rank} me={item.userData.me} avatar={item.userData.avatarLinkHead} name={item.userData.fname + " " + item.userData.lname} level={"null"} point={item.userData.points} books={item.bookRead} badge={item.lastBadge} />
                            ))}
                        </>
                    }
                </TabPanel>

            </Tabs>
        </>




    )
}
Leaderboard.layout = "In";

export default Leaderboard;