import Insidelayout from '../components/layouts/insidelayout'
import React, { useEffect, useRef, useState } from 'react'
import BookOutside from '../components/BookOutside';
import { getFiltersBooks } from '../src/utils/apis'
import Chip from '../components/Chip';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { useWindowSize } from '../src/utils/useWindowSize';
import FilterModal from '../components/Filter/FilterModal';

const FilterResults = () => {

    const router = useRouter()

    useEffect(() => {
        return () => {

        }
    })

    const state = useSelector(state => state.mainReducer)


    const [loading, setLoading] = useState(false);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const bookMargin = 7
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedSubjects, setSelectedSubjects] = useState([])
    const [selectedPYP, setSelectedPYP] = useState([])
    const [page, setPage] = useState("all")
    const [resultsEmpty, setResultsEmpty] = useState(false)
    const [books, setBooks] = useState([])
    const [noOfColumns, setNoOfColumns] = useState(null)
    const booksWrapper = useRef(null)
    const [allFilters, setAllFilters] = useState(state.filters)
    const [loadingMore, setLoadingMore] = useState(false)
    const loggedInUser = state.loggedInUser
    const resize = useWindowSize()

    useEffect(async () => {
        setAllFilters(state.filters)

        if (state.filters.length != 0) {
            let books = await getFiltersBooks(loggedInUser.userData._id, state.filters, state.currentLanguage, page)

            console.log("books.length",books.length)
            console.log("fs", state)

            if(books.length > 0){
                setBooks([...books])
                setLoading(true)    
            } else {
              //  router.push("/home/openLibrary")
            }

        }

    },[state])


    useEffect(async () => {
        if (state.filters.length != 0) {
            let books = await getFiltersBooks(loggedInUser.userData._id, state.filters, state.currentLanguage, page)
            console.log("fs", state)
            console.log("books.length",books.length)

            // setBooks([...books])
            // setLoading(true)

            if(books.length > 0){
                setBooks([...books])
                setLoading(true)    
            } else {
              //  router.push("/home/openLibrary")
            }

        }

        return () => {

        }
    }, [])
    useEffect(() => {
        // console.log('booksWrapper', booksWrapper.current.clientWidth)
        if (booksWrapper.current) {
            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }

        return () => {

        }
    }, [booksWrapper, loading])

    useEffect(() => {
        if (booksWrapper.current) {

            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }
        return () => {

        }
    }, [resize])
    const onRemoveFilter = async (item, type, index) => {
        const filtersTmp = allFilters;
        if (type == 'subject') {
            filtersTmp.selectedSubjects.splice(index, 1)
        } else if (type == 'level') {
            filtersTmp.selectedLevels.splice(index, 1)
        }
        else if (type == 'pyp') {
            filtersTmp.selectedPyp.splice(index, 1)
        }
        setAllFilters(filtersTmp);
        setBooks([])
        let newBooks = await getFiltersBooks(loggedInUser.userData._id, allFilters, state.currentLanguage, 0)

        if(newBooks.length === 0) {
         //   router.push("/home/openLibrary")
        }
        setBooks([...newBooks])
        setResultsEmpty(false)
    }

    const bookslist = books.map((book) =>

        <BookOutside book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />

    );


    return (

        <div>

            {loading &&
                <>

                <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                }}>

<div className={`chipsWrapper ${state.currentLanguage == "ar" ? 'rtlDir' : 'ltrDir'}`}>
    {allFilters.selectedSubjects.map((cat, index) => {
        return <Chip title={cat.name} item={cat} onDelete={onRemoveFilter} type={'subject'} index={index} />
    })}
    {allFilters.selectedLevels.map((cat, index) => {
        return <Chip title={cat.nameAr} item={cat} onDelete={onRemoveFilter} type={'level'} index={index} />
    })}
    {allFilters.selectedPyp.map((cat, index) => {
        return <Chip title={cat.name} item={cat} onDelete={onRemoveFilter} type={'pyp'} index={index} />
    })}
</div>
<FilterModal filterResult={true} type={"All"} currentLanguage={state.currentLanguage} ></FilterModal>

                </div>


                    <div ref={booksWrapper} className={`bookswrapper ${state.currentLanguage == "ar" ? 'rtlDir' : 'ltrDir'}`}>

                        {bookslist}
                    </div>
                </>
            }
        </div>


    )

}

FilterResults.layout = "In";

export default FilterResults;
