export const checkIfBookFav = (bookId, favBooks) => {

    let findBookIndex = favBooks.findIndex(book => {
        return book == bookId
    })
    return findBookIndex != -1
}

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validEmail = (email) => {
    console.log('ssssss', email)
    return re.test(String(email));
}

export const getBookAdditionsNumber = (book, type) => {
    if (type != 'reflowable') {
        let allVocabularies = 0;
        book.pages.forEach((page, pageIndex) => {
            page.vocabularies.forEach(vocabulary => {
                allVocabularies += 1
            })
        })

        let allHighlights = 0;
        book.pages.forEach((page, pageIndex) => {
            page.highlights.forEach(highlight => {
                allHighlights += 1
            })
        })
        let allRecordings = 0;
        if (book.mainRecord != undefined && book.mainRecord != '') {
            allRecordings += 1
        }
        let allNotes = 0;
        if (book.mainNote != undefined && book.mainNote.text) {
            allNotes += 1
        }
        return {
            allVocabularies,
            allRecordings,
            allHighlights,
            allNotes
        }
    } else {
        let allVocabularies = 0;
        // book.vocabularies.forEach((page, pageIndex) => {
        //     allVocabularies += 1
        // })

        let allHighlights = 0;
        if(book.highlights!=undefined){
            book.highlights.forEach(highlight => {
                allHighlights += 1
            })
        }

        let allRecordings = 0;
        if (book.mainRecord != undefined) {
            allRecordings += 1
        }
        let allNotes = 0;
        if (book.mainNote != undefined && book.mainNote != '') {
            allNotes += 1
        }
        return {
            allVocabularies,
            allRecordings,
            allHighlights,
            allNotes
        }
    }

}


export const getBookHighlights = (book) => {
    let allHighlights = [];
    if (book.pages) {
        book.pages.forEach((page, pageIndex) => {
            page.highlights.forEach(highlight => {
                allHighlights.push({
                    ...highlight,
                    page: pageIndex + 1
                })
            })
        })
    } else {
        book.highlights.forEach(highlight => {
            allHighlights.push({
                ...highlight,
            })
        })
    }

    return allHighlights
}

export const getBookVocabularies = (book) => {
    let allVocabularies = [];
    if (book.pages) {
        book.pages.forEach((page, pageIndex) => {
            page.vocabularies.forEach(vocabulary => {
                console.log('voca', vocabulary)
                allVocabularies.push({
                    ...vocabulary,
                    page: pageIndex + 1
                })
            })
        })
    } else {
        // book.vocabularies.forEach(vocabulary => {
        //     console.log('voca', vocabulary)
        //     allVocabularies.push({
        //         ...vocabulary,
        //     })
        // })
    }
    return allVocabularies
}

export const getBookRecordings = (book) => {
    let allRecordings = [];
    if (book.mainRecord != undefined) {
        allRecordings.push(book.mainRecord)
    }
    return allRecordings
}