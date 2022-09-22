import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import GridItemindex from '../../components/Categoryitem/index'
import CustomButton from '../../components//CustomButton'
import { getFiltersCategories } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Checkbox } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

export default function Filter({ currentLanguage, type,filterResult,setOpen }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()
    const state = useSelector(state => state.mainReducer)
    const roleType = useSelector(state => state.mainReducer.loggedInUser.userData.type)


    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(["all"]);
    const [selectedResources, setSelectedResources] = useState([]);

    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [subjects, setSubjects] = useState([])
    const [levels, setLevels] = useState([])
    const [pyp, setPyp] = useState([])
    const [pypTitle, setPypTitle] = useState('')
    const [selectedPyp, setSelectedPyp] = useState([])
    const [resources, setResources] = useState([
        {
            _id:"listen-plan",
            title:"خطة الدرس"
        },
        {
            _id:"activity-sheet",
            title:"صفحة النشاط"
        },
        {
            _id:"assessment-sheet",
            title:"نموذج التقييم"
        }
    ])

    const loggedInUser = state.loggedInUser
    // const { currentLanguage, uid } = route.params
    // const currentLanguage = "en"
    const genres = [
        {
            _id: 'all',
            title: t('filter.all', { lng: currentLanguage }),
        },
        {
            _id: 'fiction',
            title: t('filter.fiction', { lng: currentLanguage }),
        },
        {
            _id: 'non-fiction',
            title: t('filter.nonFiction', { lng: currentLanguage }),
        },
    ]

    // const onResourcesPressed = (item, { value }) => {
    //     console.log("value212",value);

        
    //     setSelectedResources(value);
    // }

    const onResourcesPressed = (checked, index, value) => {
        let findSelected = selectedResources.findIndex(level => {
            return level._id == resources[index]._id
        })
        if (findSelected != -1) {
            let selected = selectedResources
            selected.splice(findSelected, 1)
            setSelectedResources([...selected])
        } else {
            setSelectedResources([...selectedResources, { ...resources[index] }])
        }
    }

    const resourcesCheckboxes = resources.map((item, i) => (
        <div key={i}>
        <Checkbox
            checked={selectedResources.findIndex(level => level._id == item._id) != -1}
            onChange={(e, { checked }, value) => {
                onResourcesPressed(checked, i, value)
            }}

            value={item._id}
            className="checkboxstyle"

            label={item.title}
        />
    </div>

        // <Form.Field>
        //     <Checkbox
                
        //         label={item.title}
        //         name='checkboxRadioGroup'
        //         value={item._id}
        //         checked={selectedResources == item._id}
        //         onChange={onResourcesPressed}
                
        //         className="checkboxstyle"
        //         style={i !== 0?{margin:"0px 10px"}:{}}
        //     />
        // </Form.Field>
    ));


    useEffect(() => {
        return () => {

        }
    }, [selectedSubjects, selectedLevels, selectedGenre])
    useEffect(async () => {
        let filters = await getFiltersCategories(loggedInUser.userData._id, currentLanguage);
        console.log('filters', filters.subjectData.children[0].children)
        setSubjects(filters.subjectData.children[0].children)
        setLevels(filters.levelData)
        setPyp(filters.subjectData.children[1].children)
        setPypTitle(filters.subjectData.children[1].name)


        if(state.filters.selectedLevels !== undefined) {
            setSelectedLevels(state.filters.selectedLevels);
        }
        if(state.filters.selectedGenre !== undefined) {
            setSelectedGenre(state.filters.selectedGenre);
        }
        if(state.filters.selectedSubjects !== undefined) {
            setSelectedSubjects(state.filters.selectedSubjects);
        }

        if(state.filters.selectedPyp !== undefined) {
            setSelectedPyp(state.filters.selectedPyp);
        }

        if(state.filters.selectedResources !== undefined) {
            setSelectedResources(state.filters.selectedResources)
        }
        
        //setSelectedGenre
        //setSelectedLevels()

        // setSelectedLevels(new Array(filters.levelData.length).fill(0).map(row => new Array(2).fill(false)))
        setLoading(false)
        return () => {

        }
    }, [])
    const onSubjectPressed = (index) => {
        let findSelected = selectedSubjects.findIndex(interest => {
            return interest._id == subjects[index]._id
        })
        if (findSelected != -1) {
            let selected = selectedSubjects
            selected.splice(findSelected, 1)
            setSelectedSubjects([...selected])
        } else {
            setSelectedSubjects([...selectedSubjects, { ...subjects[index] }])
        }
    }

    const onApply = () => {
        const filters = {
            selectedLevels,
            selectedSubjects,
            selectedGenre,
            selectedPyp,
            selectedResources
        }
        dispatch({
            type: 'SELECTED_LEVELS',
            selectedlevels: selectedLevels,
        })
        dispatch({
            type: 'SELECTED_SUBJECTS',
            selectedSubjects: selectedSubjects,
        })
        dispatch({
            type: 'SELECTED_GENRE',
            selectedGenre: selectedGenre,
        })
        dispatch({
            type: 'SELECTED_PYP',
            selectedpyp: selectedPyp,
        })
        dispatch({
            type: 'CURRENT_LANG_FILTER',
            currentLanguage: currentLanguage,
        })
        dispatch({
            type: 'SELECTED_RESOURCES',
            selectedResources: selectedResources,
        })
        dispatch({
            type: 'FILTERS',
            filters: filters,
        })


        if(filterResult === true) {
            setOpen(false);
        } else {
            router.push('/FilterResults')
        }

    }




    const onSelectLevel = (checked, index, value) => {
        let findSelected = selectedLevels.findIndex(level => {
            return level._id == levels[index]._id
        })
        if (findSelected != -1) {
            let selected = selectedLevels
            selected.splice(findSelected, 1)
            setSelectedLevels([...selected])
        } else {
            setSelectedLevels([...selectedLevels, { ...levels[index] }])
        }
    }
    const onGenrePressed = (item, { value }) => {
        setSelectedGenre(value)
    }


    const onPypPressed = (index) => {

        let findSelected = selectedPyp.findIndex(interest => {
            return interest._id == pyp[index]._id
        })
        if (findSelected != -1) {
            let selected = selectedPyp
            selected.splice(findSelected, 1)
            setSelectedPyp([...selected])
        } else {
            setSelectedPyp([...selectedPyp, { ...pyp[index] }])
        }


    }
    const levelscheckboxes = levels.map((item, i) => (

        <div key={i}>
            {console.log("state.filters",state.filters)}
            <Checkbox
                checked={selectedLevels.findIndex(level => level._id == item._id) != -1}
                onChange={(e, { checked }, value) => {
                    onSelectLevel(checked, i, value)
                }}

                value={item._id}
                className="checkboxstyle"

                defaultChecked={item.show}
                label={item.nameAr}
            />
        </div>
    ))
    const genrescheckboxes = genres.map((item, i) => (
        <Form.Field>
            <Checkbox
                radio
                label={item.title}
                name='checkboxRadioGroup'
                value={item._id}
                checked={selectedGenre == item._id}
                onChange={onGenrePressed}
                className="checkboxstyle"
                style={i !== 0?{margin:"0px 10px"}:{}}
            />
        </Form.Field>
    ));


    <Form>
        {genrescheckboxes}
    </Form>


    return (
        <div className={` ${currentLanguage == "ar" ? 'rtlDir' : 'ltrDir'}`}>
            {loading ?
                null
                :
                <>
                {roleType === "teacher" && 
                <div className="levels-checkboxes">
                <div className="sectionTitle">{t('filter.resources', { lng: currentLanguage })}</div>
                <div className="flex-wrapper-row gap flex-wrap">
                    {resourcesCheckboxes}
                </div>
            </div>

                }


                    {type != "level" &&
                        <div className="levels-checkboxes">
                            <div className="sectionTitle">{t('filter.levels', { lng: currentLanguage })}</div>
                            <div className="flex-wrapper-row gap flex-wrap">
                                {levelscheckboxes}
                            </div>
                        </div>
                    }
                    <div className="genres-checkboxes">
                        <div className="sectionTitle"> {t('filter.genre', { lng: currentLanguage })}</div>
                        <div className="flex-wrapper-row gap flex-wrap">

                            {genrescheckboxes}
                        </div>

                    </div>
                    {type != "subjects" &&
                        <div className="subject-items">
                            <div className="sectionTitle"> {t('filter.subjects', { lng: currentLanguage })}</div>
                            <GridItemindex selectedItem={selectedSubjects} onItemPressed={onSubjectPressed} selectMultiple categories={subjects} language={currentLanguage} />
                        </div>
                    }
                    {type != "PYP" &&

                        <div className="subject-items">
                            <div className="sectionTitle"> {pypTitle}</div>
                            <GridItemindex lastItem={true} selectedItem={selectedPyp} onItemPressed={onPypPressed} selectMultiple categories={pyp} language={currentLanguage} />
                        </div>
                    }
                    <Modal.Actions>


                        <Button onClick={onApply} className={(selectedLevels.length || selectedSubjects.length || selectedGenre.length) ? 'active' : ''}>
                            {t('filter.apply', { lng: currentLanguage })}
                        </Button>
                    </Modal.Actions>
                </>
            }

        </div>
    )
}
