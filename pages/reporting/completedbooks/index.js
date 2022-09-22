import React, { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import BookOutside from '../../../components/BookOutside';
import { geLanguageCompletedData, getCompletedBooksList, getCompletedData } from '../../../src/utils/apis';
import { useWindowSize } from '../../../src/utils/useWindowSize';
import BackButton from '../../../components/BackButton';

import Link from 'next/link';

const CompletedBooksChart = ({ userId }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [tabslang, setTabslang] = useState('ar')
    const [currentLanguage, setCurrentLanguage] = useState('اللغة العربية')
    const [completedData, setCompletedData] = useState([])
    const [COLORS, setColors] = useState([])
    const [languageNumbersData, setanguageNumbersData] = useState([])
    const [completedBooks, setCompletedBooks] = useState([])
    const [noOfColumns, setNoOfColumns] = useState(null);
    const booksWrapper = useRef(null)
    const [arrowStyle,setArrowStyle] = useState({});

    const resize = useWindowSize()

    const handleSelect = (key) => {
        if (key == 0) {
            setTabslang('ar')
            setCurrentLanguage('اللغة العربية')

        }
        else if (key == 1) {
            setTabslang('en')
            setCurrentLanguage("English Language")



        }
        else if (key == 2) {
            setTabslang('fr')
            setCurrentLanguage(' French Language')


        }
        setTabIndex(key)

    }

    useEffect(async () => {
        const CompletedDatanumbers = await getCompletedData(tabslang, userId)
        setCompletedData(CompletedDatanumbers.userProgress)
        setColors(CompletedDatanumbers.colors)

        const languageNumbers = await geLanguageCompletedData(userId, tabslang)
        setanguageNumbersData(languageNumbers)
        const completBooks = await getCompletedBooksList(userId, tabslang)
        setCompletedBooks(completBooks)
        setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))

        if(tabslang === "en" || tabslang === "fr") {
            setArrowStyle({marginLeft:"10px"})
        } else {
            setArrowStyle({marginRight:"10px"})
        }

    }, [tabslang])
    useEffect(() => {

        setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))

        return () => {

        }
    }, [booksWrapper])
    useEffect(() => {


        setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))

        return () => {

        }
    }, [resize])
    let booksitems = []


    booksitems = completedBooks.map((book) =>
        <BookOutside book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
    );

    const RADIAN = Math.PI / 180;
    const renderLegend = (props) => {
        const { cx, cy, midAngle, outerRadius, percent, name, value, index } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 5) * cos;
        const sy = cy + (outerRadius + 5) * sin;
        const mx = cx + (outerRadius + 60) * cos;
        const my = cy + (outerRadius + 50) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 45;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <path

                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="3"
                />
                <circle cx={ex} cy={ey} r={3} fill={COLORS[index % COLORS.length]} stroke="none" />
                <text
                    fontSize="1.4vw"
                    fontFamily="FFHekaya-Light"
                    x={ex + (cos >= 0 ? 1 : -1) * 9}
                    y={ey + 5}
                    textAnchor={textAnchor}
                    fill={COLORS[index % COLORS.length]}
                >{`${name}`}</text>
            </g>
        );
    };
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value, x, y,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        // const radius = 25 + innerRadius + (outerRadius - innerRadius);

        const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
        const y2 = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <>
                <text x={x2} y={y2} fill="white" textAnchor="middle" dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                {/* <text fontSize="1.9vw" fontFamily="FFHekaya-Light" x={x} y={y2 > cy ? y : y} fill={COLORS[index % COLORS.length]} textAnchor={x2 < cx ? "start" : "end"} dominantBaseline="central">
                    {name}
                </text> */}
            </>
        );
    }

    return (

        <>
            <div className={` section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} >

                
                <div style={{marginBottom:18}}><Link href="/profile">
                    <div style={{display:"flex",alignItems:"center",cursor:"pointer",color:"#6AC3DB"}} >
                        <BackButton language={tabslang} />
                        <div style={{fontSize:30,...arrowStyle}}>{t("leaderboard.back",{ lng: tabslang })}</div>
                    </div>
                </Link></div>
                
               

                {t("totalPoints.completedBooks", { lng: tabslang })}







            </div >
            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} className={`${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} >
                <div className={`flex-wrapper-row `}>

                    <TabList activeTabClassName="ActiveTab" className="skills-tabs border-bottom-grey">
                        <Tab>عربي</Tab>
                        <Tab>English</Tab>
                        <Tab>Français</Tab>


                    </TabList>

                </div>
                <TabPanel>

                    <>
                        <div className="section-title">

                            {/* {t("completedBooks.youHaveFinished", { lng: tabslang, number: languageNumbersData.finishedBooks })} */}
                            <Trans className="text flex-text"
                                i18nKey="completedBooks.youHaveFinished"
                                values={{ number: languageNumbersData.finishedBooks}}
                                tOptions={{ lng: tabslang }} // <--

                                components={{ span: <span className="yellow-number" />,div:<span style={{height: 40,display: "inline-block"}} class='claff'></span> }}
                            />

                            {languageNumbersData.readingTimeUnit == "hours" ?
                                // t("completedBooks.totalReading", { lng: tabslang, language: currentLanguage, number: languageNumbersData.readingTime })

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReading"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                                :
                                // t("completedBooks.totalReadingmin", { lng: tabslang, language: currentLanguage, number: languageNumbersData.readingTime })

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReadingmin"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                            }




                        </div >

                        <div className="ltrDir" style={{
                            width: '100%',
                            height: '600px'
                        }}>

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart width={600} height={600}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={completedData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#8884d8"
                                        label={renderCustomizedLabel}
                                        innerRadius={75}
                                        labelLine={renderLegend}
                                        paddingAngle={0}
                                    // minAngle={1}
                                    >
                                        {completedData.map((entry, index) => (
                                            <Cell stroke="" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="section-title">  {t('totalPoints.completedBooks', { lng: tabslang })} </div>

                        <div

                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>


                            {booksitems}

                        </div>
                    </>
                </TabPanel>

                <TabPanel>
                    <>
                        <div className="section-title">

                            {/* {t("completedBooks.youHaveFinished", { lng: tabslang, number: languageNumbersData.finishedBooks })} */}
                            <Trans className="text flex-text"
                                i18nKey="completedBooks.youHaveFinished"
                                values={{ number: languageNumbersData.finishedBooks }}
                                tOptions={{ lng: tabslang }} // <--

                                components={{ span: <span className="yellow-number" />,div:<span style={{height: 40,display: "inline-block"}} class='claff'></span> }}
                            />

                            {languageNumbersData.readingTimeUnit == "hours" ?
                                // t("completedBooks.totalReading", { lng: tabslang, language: currentLanguage, number: languageNumbersData.readingTime })

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReading"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                                :
                                // t("completedBooks.totalReadingmin", { lng: tabslang, language: currentLanguage, number: languageNumbersData.readingTime })

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReadingmin"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                            }


                        </div >

                        <div className="ltrDir" style={{
                            width: '100%',
                            height: '600px'
                        }}>

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart width={600} height={600}>

                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={completedData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#8884d8"
                                        label={renderCustomizedLabel}
                                        innerRadius={75}
                                        labelLine={renderLegend}
                                        // legendType="circle"
                                        paddingAngle={0}
                                    // minAngle={1}
                                    >
                                        {completedData.map((entry, index) => (
                                            <Cell stroke="" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="section-title">  {t('totalPoints.completedBooks', { lng: tabslang })} </div>

                        <div

                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>


                            {booksitems}

                        </div>
                    </>
                </TabPanel>
                <TabPanel>
                    <>
                        <div className="section-title">

                            <Trans className="text flex-text"
                                i18nKey="completedBooks.youHaveFinished"
                                values={{ number: languageNumbersData.finishedBooks }}
                                tOptions={{ lng: tabslang }} // <--

                                components={{ span: <span className="yellow-number" />,div:<span style={{height: 40,display: "inline-block"}} class='claff'></span> }}
                            />

                            {languageNumbersData.readingTimeUnit == "hours" ?

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReading"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                                :

                                <Trans className="text flex-text"
                                    i18nKey="completedBooks.totalReadingmin"
                                    values={{ language: currentLanguage, number: languageNumbersData.readingTime }}
                                    tOptions={{ lng: tabslang }} // <--

                                    components={{ span: <span className="yellow-number" />, }}
                                />
                            }




                        </div >

                        <div className="ltrDir" style={{
                            width: '100%',
                            height: '600px'
                        }}>

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart width={600} height={600} >
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={completedData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        fill="#8884d8"
                                        label={renderCustomizedLabel}
                                        innerRadius={75}
                                        labelLine={renderLegend}
                                        // legendType="circle"
                                        paddingAngle={0}
                                    // minAngle={1}
                                    >
                                        {completedData.map((entry, index) => (
                                            <Cell stroke="" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="section-title">  {t('totalPoints.completedBooks', { lng: tabslang })} </div>

                        <div

                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>


                            {booksitems}

                        </div>
                    </>
                </TabPanel>

            </Tabs>
        </>




    )
}
CompletedBooksChart.layout = "In";

export default CompletedBooksChart;