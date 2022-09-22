import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';
// import { scalePow, scaleLog } from 'd3-scale';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { getSkillsData } from '../../../src/utils/apis';

const Skills = ({ userId }) => {

    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [tabslang, setTabslang] = useState('ar')
    const [currentLanguage, setCurrentLanguage] = useState('ar')
    const [skillsData, setSkillsData] = useState([])


    useEffect(async () => {
        const skills = await getSkillsData(userId, tabslang)
        setSkillsData(skills)

    }, [tabslang])

    const handleSelect = (key) => {
        console.log('chaaaange', key)
        if (key == 0) {
            setTabslang('ar')
            setCurrentLanguage('ar')

        }
        else if (key == 1) {
            setTabslang('en')
            setCurrentLanguage('en')



        }
        else if (key == 2) {
            setTabslang('fr')
            setCurrentLanguage('fr')


        }
        setTabIndex(key)

    }

    return (



        <div>
            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} className={`${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} >
                <div className={`flex-wrapper-row  sticky-top `}>

                    <TabList activeTabClassName="ActiveTab" className="level-tabs sticky-top">
                        <Tab>عربي</Tab>
                        <Tab>English</Tab>
                        <Tab>Français</Tab>


                    </TabList>
                </div>

                <TabPanel>
                    <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '0px' }}>
                        {t('homeScreen.skillsDevelopment', { lng: tabslang })}
                    </div>
                    {skillsData.map((item) =>
                        <div style={{ marginBottom: '20px' }}>

                            <div className="skillname"> {item.skillData[0].name} </div>
                            <div className="flex-wrapper-row" style={{ gap: '0.5vw' }}>
                                {item.width==0 ? 
                     <div style={{ background: '#fff' ,width: '100%', height: '20px', borderRadius: '10px',border:'1px solid #EBEBEB' }}>  </div>

                                :
                                <div style={{ background: item.skillData[0].color, width: item.width, height: '20px', borderRadius: '10px' }}>  </div>
}
                                <div> {item.width} </div>
                            </div>

                        </div>
                    )}
                </TabPanel>

                <TabPanel>
                    <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '0px' }}>
                        {t('homeScreen.skillsDevelopment', { lng: tabslang })}
                    </div>
                    {skillsData.map((item) =>
                        <div style={{ marginBottom: '20px' }}>

                            <div className="skillname"> {item.skillData[0].name}  </div>
                            <div className="flex-wrapper-row" style={{ gap: '0.5vw' }}>
                                <div style={{ background: item.skillData[0].color, width: item.width, height: '20px', borderRadius: '10px' }}>  </div>
                                <div> {item.width} </div>
                            </div>


                        </div>
                    )}
                </TabPanel>

                <TabPanel>
                    <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '0px' }}>
                        {t('homeScreen.skillsDevelopment', { lng: tabslang })}
                    </div>
                    {skillsData.map((item) =>
                        <div style={{ marginBottom: '20px' }}>

                            <div className="skillname">  {item.skillData[0].name} </div>
                            <div className="flex-wrapper-row" style={{ gap: '0.5vw' }}>
                                <div style={{ background: item.skillData[0].color, width: item.width, height: '20px', borderRadius: '10px' }}>  </div>
                                <div> {item.width} </div>
                            </div>




                        </div>
                    )}
                </TabPanel>

            </Tabs>

        </div >

    )
}
Skills.layout = "In";

export default Skills;
