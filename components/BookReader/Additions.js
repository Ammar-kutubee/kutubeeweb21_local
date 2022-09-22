import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal, TextArea } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import { getBookAdditionsNumber } from '../../src/utils/functions';
import VocabularyList from './VocabularyList';
import Highlights from './Highlights';
import Notes from './Notes';
import router from 'next/router';

export default function Additions({ language, open, onAddtionsClose, bookMedia, source, initialAdditionTab }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [highlightsNumber, setHighlightsNumber] = useState(0)
    const [recordingsNumber, setRecordingsNumber] = useState(0)
    const [notesNumber, setNotesNumber] = useState(0)
    const [vocabulariesNumber, setVocabulariesNumber] = useState(0)
    useEffect(() => {
        if (initialAdditionTab != undefined) {
            // alert('initialAdditionTab '+ initialAdditionTab)
            setTabIndex(parseInt(initialAdditionTab))
        }
        return () => {

        }
    }, [])
    useEffect(() => {

        if (open) {
            console.log('initialAdditionTab' + initialAdditionTab, tabIndex)
            let additions = getBookAdditionsNumber(bookMedia, source)
            setHighlightsNumber(additions.allHighlights)
            setRecordingsNumber(additions.allRecordings)
            setNotesNumber(additions.allNotes)
            setVocabulariesNumber(additions.allVocabularies)
            console.log('additions', additions)
        }
        return () => {

        }
    }, [open])
    useEffect(() => {
        // if (tabIndex) {
        //     setSelectedTab(tabIndex)
        // }

        return () => {

        }
    }, [])
    const handleSelect = (key) => {
        if (key == 0) {


        }
        else if (key == 1) {



        }
        else if (key == 2) {


        }
        setTabIndex(key)

    }
    return (
        <Modal className={` additions-modal ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
            open={open}
            size="fullscreen"
            onClose={() => {
                onAddtionsClose()
                
                if (initialAdditionTab != undefined) {
                    router.back()
                }
            }}
            onOpen={() => {

            }}
        >
            <Modal.Header>
                <Button class="ui icon button" onClick={() => {
                    onAddtionsClose()
                    if (initialAdditionTab != undefined) {
                        router.back()
                    }
                }} primary>
                    <i class="bluek large icon icon-close"></i>
                </Button>
                <div className={`sectionTitle ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`} style={{
                    paddingBottom: 0
                }}>

                    {t('bookComponent.additions', { lng: language })}

                </div>

            </Modal.Header>

            <Modal.Content scrolling>

                <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} className={`${language == "ar" ? "rtlDir" : 'ltrDir'}`} >
                    <div className={`flex-wrapper-row`}>

                        <TabList activeTabClassName="ActiveTab" className="level-tabs">
                            <Tab>{t('bookComponent.note', { lng: language })}{' (' + notesNumber + ')'}</Tab>
                            {/* <Tab>{t('bookComponent.recordings', { locale: language })}{' (' + recordingsNumber + ')'}</Tab> */}
                            <Tab>{t('bookComponent.highlights', { lng: language })}{' (' + highlightsNumber + ')'}</Tab>
                            <Tab>{t('bookComponent.vocabularies', { lng: language })}{' (' + vocabulariesNumber + ')'}</Tab>

                        </TabList>
                    </div>
                    <TabPanel>
                        <Notes book={bookMedia} language={language} />
                    </TabPanel>
                    <TabPanel>
                        <Highlights book={bookMedia} language={language} />
                    </TabPanel>
                    <TabPanel>
                        <VocabularyList book={bookMedia} language={language} />
                    </TabPanel>
                    {/* <TabPanel>
                        4444
                    </TabPanel> */}
                </Tabs>
            </Modal.Content>
        </Modal>
    )
}