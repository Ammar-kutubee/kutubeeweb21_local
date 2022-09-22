import _ from 'lodash'
import faker from 'faker'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, Grid, Header, Segment, Label, Button } from 'semantic-ui-react'
import { getAutoCompleteSearch, getSearchResults } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import BookOutside from '../../components/BookOutside';


export default function SearchComp({ setShow, uid }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()
    const [open, setOpen] = React.useState(true)


    // const resultRenderer = ({ name, _id }) => <Link href={`/Book/${_id}`}><><Label content={name} /> </></Link>
    const resultRenderer = ({ name }) => <Label content={name} />

    const onResultSelect = (e, data) => {
        console.log('data.result._id', data.result)
        if (data.result._id == 'more') {
            getSearchData()
        } else {
            router.push(`/book/${data.result._id}`)
            setShow(false)

            // dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
        }
    }

    // const [state, dispatch] = React.useReducer(reducer, initialState)
    const state = useSelector(state => state.mainReducer)
    const dispatch = useDispatch()
    const { loading, results, value } = state
    const [books, setBooks] = useState([])
    const timeoutRef = React.useRef()
    const input = React.useRef()
    const isRTL = (string) => {
        var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF'
        var rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
        var rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']')
        console.log("rrrr", rtlDirCheck.test(string))
        return rtlDirCheck.test(string)
    };
    const getSearchData = async () => {
        let lang
        let val = input.current.state.value
        let results = await getSearchResults(input.current.state.value, uid)
        const rtllang = isRTL(input.current.state.value);
        if (rtllang) {
            lang = "ar"
        }
        else lang = ""

        dispatch({
            type: 'CURRENT_LANG_FILTER',
            currentLanguage: lang,
        })
        dispatch({
            type: 'SEARCH_RESULTS',
            searchResults: results,
        })
        setOpen(false)
        setShow(false)
        // router.push('/Search')
        router.push(`/Search?title=${val}&lang=${lang}`)


    }
    const handleKeyPress = (async (event) => {
        if (event.key === 'Enter') {
            getSearchData()

        }
    })




    const handleSearchChange = React.useCallback((e, data) => {
        setOpen(true)

        clearTimeout(timeoutRef.current)
        setBooks([]);
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(async () => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            var autocompleteresults = await getAutoCompleteSearch(data.value, uid)
            let lang
            const rtllang = isRTL(data.value);
            if (rtllang) {
                lang = "ar"
            }
            else lang = ""
            if (autocompleteresults[0]?.showMore) {
                console.log('isRTL(value)', isRTL(value) ? 'ar' : 'en')
                autocompleteresults.push({
                    name: t('search.more', { lng: isRTL(value) ? 'ar' : 'en' }),
                    id: "More",
                    _id: 'more'
                })
            }
            console.log('autocompleteresults', autocompleteresults)
            dispatch({
                type: 'FINISH_SEARCH',
                results: autocompleteresults,
            })
        }, 300)
    }, [value])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <Grid>
            <Grid.Column width={6}>

                <Search

                    loading={loading}
                    // onResultSelect={(e, data) => {
                    //     console.log('data.result.title')
                    //     if (data.result.title == 'المزيد') {

                    //     } else {
                    //         dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                    //     }
                    // }}
                    // handleKeyPress={(e, data) =>
                    //     dispatch({ type: 'SEARCH_RESULTS', message: { searchResults: results } })
                    // }
                    ref={input}
                    onSearchChange={handleSearchChange}
                    resultRenderer={resultRenderer}
                    onResultSelect={onResultSelect}
                    onKeyPress={handleKeyPress}
                    results={results}
                    value={value}
                    open={open}
                    className={` ${isRTL(value) == true ? 'rightalign' : ''} ${i18n.language == 'ar' && value.length == 0 ? 'rightalign' : ''}`}
                />
            </Grid.Column>


        </Grid>
    )
}



