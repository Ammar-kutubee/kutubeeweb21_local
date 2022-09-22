import {
    SAVE_LOGGEDIN_USER,
    DELETE_LOGGEDIN_USER,
    GET_FAV_BOOKS,
    CLEAN_QUERY,
    START_SEARCH,
    FINISH_SEARCH,
    UPDATE_SELECTION,
    SEARCH_RESULTS,
    POINTS_EARNED
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    results: [],
    searchResults: null,
    loggedInUser: null,
    languagePreviouslySelected: false,
    favBooks: [],
    searchAutoComplete: null,
    value: '',
    newPointsEarned: null,
    filters: [],
    appLanguage: '',
    appTheme: '',
    message: null,
    placementData: [],
    tabLang: "ar"

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return { ...state, results: [] }
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection }
        case 'SEARCH_RESULTS':
            return { ...state, loading: false, searchResults: action.searchResults }

        case 'SAVE_LOGGEDIN_USER': {
            return {
                ...state,
                loggedInUser: action.message.userData
            };
        }
        case 'DELETE_LOGGEDIN_USER': {
            return {
                ...state,
                loggedInUser: null
            };
        }
        case 'GET_FAV_BOOKS': {
            return {
                ...state,
                favBooks: action.favBooks


            };


        }
        case 'POINTS_EARNED': {
            return {
                ...state,
                newPointsEarned: action.pointIncrease
            };
        }
        case 'SELECTED_LEVELS': {
            return {
                ...state,
                selectedlevels: action.selectedlevels
            };
        }
        case 'SELECTED_SUBJECTS': {
            return {
                ...state,
                selectedSubjects: action.selectedSubjects
            };
        }
        case 'SELECTED_PYP': {
            return {
                ...state,
                selectedpyp: action.selectedpyp
            };
        }

        case 'SELECTED_RESOURCES': {
            return {
                ...state,
                selectedResources:action.selectedResources
            }
        }



        case 'SELECTED_GENRE': {
            return {
                ...state,
                selectedGenre: action.selectedGenre
            };
        }
        case 'CURRENT_LANG_FILTER': {
            return {
                ...state,
                currentLanguage: action.currentLanguage
            };
        }
        case 'PLACEMENT_LANG': {
            return {
                ...state,
                placementLanguage: action.placementLanguage
            };
        }
        case 'FILTERS': {
            return {
                ...state,
                filters: action.filters
            };
        }
        case 'SELECTED_TEST': {
            return {
                ...state,
                placementData: action.placementData
            };
        }
        case 'ALL_ANSWERS': {
            return {
                ...state,
                Allanswers: action.Allanswers
            };
        }
        case 'CHANGE_LANGUAGE': {
            return {
                ...state,
                appLanguage: action.appLanguage
            };
        }
        case 'CHANGE_THEME': {
            return {
                ...state,
                appTheme: action.appTheme
            };
        }
        case 'CHANGE_AVATAR': {
            return {
                ...state,
                avatarLinkBody: action.avatarLinkBody
            };
        }
        case 'CHANGE_MESSAGE': {
            return {
                ...state,
                message: action.message
            };
        }
        case 'CHANGE_TAB_LANGUAGE': {
            return {
                ...state,
                tabLang: action.tabLang
            };
        }

        default:
            return state
    }
}
export default rootReducer
