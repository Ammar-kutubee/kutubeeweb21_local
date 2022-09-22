import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip, Cell, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import moment from 'moment';
import i18next from 'i18next';

import Moment from 'react-moment';
import { unix } from 'moment';
import { getMonthlymprogress, getMonthlyprogress, getMonthlytimeprogress, getWeeklydata, getWeeklyprogress, getWeeklytimprogress } from '../../../src/utils/apis';
import { Button, Icon } from 'semantic-ui-react';

import BackButton from '../../../components/BackButton';
import Link from 'next/link';


const ReadingTime = ({ userId }) => {
    // const date = (1627818141 * 1000)
    const date = (moment().startOf('week').unix()) * 1000
    let [startDate, setStartDate] = useState(moment(date))

    let [nextdate, setNextDate] = useState(moment(startDate).add(7, 'd'))
    // const nextdatestamp = moment(date).add(7, 'd').unix()
    const language = i18next.language

    const [selectedTab, setselectedTab] = useState('week')
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [weekTime, setWeekTime] = useState([]);
    const [monthTime, setMonthTime] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [arrowStyle,setArrowStyle] = useState({});

    const handleSelect = async (key) => {
        if (key == 0) {
            console.log('chaaaange', key)


            setselectedTab('week')


        }
        else if (key == 1) {
            setselectedTab('month')


        }

        setTabIndex(key)
    }


    useEffect(async () => {


        if (selectedTab == 'week') {
            let WeeklyprogressData = await getWeeklyprogress(moment(startDate).unix(), moment(nextdate).unix(), userId,language)

            if(language === "ar") {
                WeeklyprogressData = WeeklyprogressData.reverse();
            }
            setWeeklyData(WeeklyprogressData)

            const Weeklytimprogress = await getWeeklytimprogress(i18next.language, moment(startDate).unix(), moment(nextdate).unix(), userId)
            setWeekTime(Weeklytimprogress.numbersData)

            const weekdatanumbers = await getWeeklydata(userId)
            // console.log("weekdata", weekdatanumbers)

           
            setWeekData(weekdatanumbers)


        }
        else if (selectedTab == 'month') {
            let MonthlyprogressData = await getMonthlyprogress(userId,language)

            // console.log("MonthlyprogressData",MonthlyprogressData)

            if(language === "ar") {
                MonthlyprogressData =MonthlyprogressData.reverse();
            }
            setMonthlyData(MonthlyprogressData)
            const Monthlyprogress = await getMonthlytimeprogress(i18next.language, userId)
            setMonthTime(Monthlyprogress.numbersData)
        }


        if(i18n.language === "en" || i18n.language === "fr") {
            setArrowStyle({marginLeft:"10px"})
        } else {
            setArrowStyle({marginRight:"10px"})
        }

    }, [selectedTab, startDate, nextdate])


    const deletsevendays = () => {
        setStartDate(moment(startDate).subtract(7, 'd'))

        setNextDate(moment(nextdate).subtract(7, 'd'))

        console.log("startDate", startDate)
        console.log("nextdate", nextdate)

    }

    const addsevendays = () => {
        setStartDate(moment(startDate).add(7, 'd'))

        setNextDate(moment(nextdate).add(7, 'd'))

        console.log("startDate", startDate)
        console.log("nextdate", nextdate)

    }
    return (
        <>
            <div className={` section-title`} >

            <div style={{marginBottom:18}}>

            <Link href="/profile">
                    <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"#6AC3DB"}}>
                        <BackButton language={i18n.language} />
                        <div style={{fontSize:30,...arrowStyle}}>{t("leaderboard.back",{ lng: i18n.language })}</div>
                    </div>
                </Link></div>
                {t("readingTime.readingTime")}

                <div className="section-title" style={{ marginTop: '0px' }}>

                    {weekData.timeUnit == "hours" ?

                        <Trans className="text flex-text"
                            i18nKey="readingTime.total"
                            values={{ number: weekData.time }}

                            components={{ span: <span className="yellow-number" />,div:<span className='claff' style={{
                                height: 40,
                                display: "inline-block"
                            
                            }}></span> }}
                        />
                        :
                        <Trans className="text flex-text"
                            i18nKey="readingTime.totalmins"
                            values={{ number: weekData.time }}

                            components={{ span: <span className="yellow-number" />, }}
                        />
                    }

                    {weekData.averageUnit == "hours" ?
                        <Trans className="text flex-text"
                            i18nKey="readingTime.daily"
                            values={{ number: weekData.average }}

                            components={{ span: <span className="yellow-number" />, }}
                        />
                        :
                        <Trans className="text flex-text"
                            i18nKey="readingTime.dailyminutes"
                            values={{ number: weekData.average }}

                            components={{ span: <span className="yellow-number" />, }}
                        />
                    }




                </div >
            </div >
            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} >
                <div className={`flex-wrapper-row `}>

                    <TabList activeTabClassName="ActiveTab" className="skills-tabs border-bottom-grey">
                        <Tab>  {t("readingTime.weekly")}</Tab>
                        <Tab>  {t("readingTime.monthly")}</Tab>


                    </TabList>

                </div>
                <TabPanel>

                    <div className="filter-wrapper">
                        <div onClick={deletsevendays} >
                            <Icon name='angle left' />
                        </div>


                        <div className="filterdates"> {moment(startDate).format('D MMM')}  </div> <div className="filterdates">&nbsp;-&nbsp;  </div>
                        <div className="filterdates"> {moment(nextdate).format('D MMM')} </div>

                        <div onClick={addsevendays} >
                            <Icon name='angle right' />
                        </div>

                    </div>
                    <div className="ltrDir" style={{
                        width: '100%',
                        height: '60vh',
                        marginTop: "3vw"

                    }}>
                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart barGap={0} width={200} height={'60vh'} data={weeklyData}> 
                                <CartesianGrid vertical={false} strokeDasharray="0 0" stroke="#DFE2E6" />
                                <XAxis dataKey="label" />
                                <YAxis orientation={language === "ar"?"right":"left"} />
                                <Legend />
                                <Bar barSize={25} dataKey="value" fill="#6AC3DB" radius={[20,20,0,0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '65%', paddingInlineStart: '3%' }}>
                        <div className="section-title">

                            {t("readingTime.totalTime")}


                        </div >
                        {weekTime.map((item) =>
                            <div style={{ marginBottom: '20px' }}>

                                <div className="skillname" style={{ fontSize: "18px" }}> {item.label} </div>
                                <div className="flex-wrapper-row" style={{ gap: '0.5vw' }}>
                                    <div style={{ background: item.color, width: item.width, height: '20px', borderRadius: language === "ar"?'10px 0px 0px 10px':'0px 10px 10px 0px' }}>  </div>
                                    <div style={{ width: '10%' }}> {item.value} </div>

                                </div>

                            </div>
                        )}

                    </div>
                </TabPanel>

                <TabPanel>

                    <div style={{ marginTop: "30px" }}>

                        <div style={{ paddingInlineStart: '50px' }} className="filterdates"> September 2021 - August 2022 </div>


                    </div>
                    <div className="ltrDir" style={{
                        width: '100%',
                        height: '60vh',
                        marginTop: "3vw"
                    }}>
                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart barGap={0} width={200} height={'60vh'} data={monthlyData} >
                                <CartesianGrid vertical={false} strokeDasharray="0 0" stroke="#DFE2E6" />
                                <XAxis dataKey="month"  />
                                <YAxis orientation={language === "ar"?"right":"left"} />
                                <Legend />
                                <Bar barSize={25} dataKey="value" fill="#6AC3DB" radius={[20,20,0,0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: '65%', paddingInlineStart: '3%' }}>
                        <div className="section-title">

                            {t("readingTime.totalTimeMonth")}


                        </div >
                        {monthTime.map((item) =>
                            <div style={{ marginBottom: '20px' }}>

                                <div className="skillname" style={{ fontSize: "18px" }}> {item.label} </div>
                                <div className="flex-wrapper-row" style={{ gap: '0.5vw' }}>
                                    <div style={{ background: item.color, width: item.width, height: '20px', borderRadius: language === "ar"?'10px 0px 0px 10px':'0px 10px 10px 0px' }}>  </div>
                                    <div style={{ width: '10%' }}> {item.value} </div>

                                </div>

                            </div>
                        )}

                    </div>
                </TabPanel>
            </Tabs>


        </>
    )
}
ReadingTime.layout = "In";

export default ReadingTime;