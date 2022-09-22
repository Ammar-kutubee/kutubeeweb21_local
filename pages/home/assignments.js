import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { getActiveAssignments } from '../../src/utils/apis'
import Assignment from '../../components/assignment';
import { useSelector } from 'react-redux';
import withAuth from '../../src/utils/withAuth';
import HappyWithHands from '../../components/Bees/HappyWithHands';
import CustomButton from '../../components/CustomButton';
import router from 'next/router';
import Link from 'next/link';
import { TabList, TabPanel, Tabs } from 'react-tabs';
import { Tab } from 'react-tabs';

const Assignments = () => {
    const state = useSelector(state => state.mainReducer)
    const loggedInUser = state.loggedInUser
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [assignments, setAssigments] = useState([])
    const [activeAssignments, setActiveAssigments] = useState([])
    const [completedAssignments, setCompletedAssigments] = useState([])
    const [overdueAssignments, setOverdueAssigments] = useState([])
    const [tabIndex, setTabIndex] = useState(0);

    const [loading, setLoading] = useState(true)

    const handleSelect = (key) => {
        console.log('chaaaange', key)
        if (key == 0) {


        }
        else if (key == 1) {



        }
        else if (key == 2) {


        }
        setTabIndex(key)

    }


    useEffect(async () => {
        const assignments = await getActiveAssignments(loggedInUser.userData._id)
        console.log("assignments", assignments)
        setActiveAssigments(assignments.activeAssignments)
        setCompletedAssigments(assignments.completeAssignemnts)
        setOverdueAssigments(assignments.overDueAssignments)

        setLoading(false)
        return () => {
        }
    }, [])
    const goToLibrary = () => {
        router.push('/home/openLibrary')
    }


    const assignmentslist = activeAssignments.map((assignment, index) =>


        <Assignment item={assignment} type={"active"} index={index} />
    );
    const comassignmentslist = completedAssignments.map((assignment, index) =>
        <Assignment item={assignment} type={"completed"} index={index} />
    );
    const overduelist = overdueAssignments.map((assignment, index) =>
        <Assignment item={assignment} type={"over"} index={index} />
    );
    return (
        <>
            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect}  >
                <div className={`flex-wrapper-row  sticky-top `}>

                    <TabList activeTabClassName="ActiveTab" className="level-tabs sticky-top">
                        <Tab>{t("assignments.active")} </Tab>
                        <Tab>{t("assignments.overdue")}</Tab>
                        <Tab>{t("assignments.completed")}</Tab>

                    </TabList>
                </div>




                <TabPanel>

                    {activeAssignments.length == 0 ?
                        <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6vw' }} className="flex-wrapper-col">
                            <HappyWithHands width={125} height={133}></HappyWithHands>
                            <div className="section-title"> {t('mainSlides.assignments.noAssignments')}</div>
                            <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                                <CustomButton
                                    buttonStyle={{
                                        marginTop: '20px',
                                        width: '100%'
                                    }}
                                    onPress={goToLibrary}
                                    text={t('quiz.explore')}
                                />
                            </div>
                        </div>
                        :
                        <>
                            <div className="flex-wrapper-row align-center" style={{ gap: '0.5vw' ,padding:"10px 0px" }}>
                                <div className="mainNumber">{activeAssignments.length}</div>
                                <div className="mainTitle"> {t('titles.activeAssignment')}</div>
                            </div>
                            <div className="assignments-wrapper" style={{gap:"1%"}}>
                                {assignmentslist}
                            </div>
                        </>
                    }
                </TabPanel>

                <TabPanel>
                    {overdueAssignments.length == 0 ?
                        <>

                            <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6vw' }} className="flex-wrapper-col">

                                <HappyWithHands width={125} height={133}></HappyWithHands>
                                <div className="section-title"> {t('mainSlides.assignments.noAssignments')}</div>
                                <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                                    <CustomButton
                                        buttonStyle={{
                                            marginTop: '20px',
                                            width: '100%'
                                        }}
                                        onPress={goToLibrary}
                                        text={t('quiz.explore')}
                                    />
                                </div>
                            </div>
                        </>
                        :
                        <>

                            <div className="flex-wrapper-row align-center" style={{ gap: '0.5vw',padding:"10px 0px" }} >
                                <div className="mainNumber">{overdueAssignments.length}</div>
                                <div className="mainTitle"> {t('assignments.overdueAssignments')}</div>

                            </div>
                            <div className="assignments-wrapper" style={{gap:"1%"}}>
                                {overduelist}
                            </div>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {completedAssignments.length == 0 ?
                        <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6vw' }} className="flex-wrapper-col">
                            
                        </div>
                        :
                        <>
                            <div className="flex-wrapper-row align-center" style={{ gap: '0.5vw',padding:"10px 0px" }}>
                                <div className="mainNumber">{completedAssignments.length}</div>
                                <div className="mainTitle"> {t('assignments.completedAssignments')}</div>

                            </div>

                            <div className="assignments-wrapper" style={{gap:"1%"}}>
                                {comassignmentslist}
                            </div>
                        </>
                    }
                </TabPanel>

            </Tabs>


        </>


    )
}

Assignments.layout = "In";

export default Assignments;