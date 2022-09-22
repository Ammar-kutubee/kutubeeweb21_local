import {
    BACK_FACE_ACCESSORY_ACTIVE,
    BACK_HAIR_ACTIVE,
    SELECTED_SHIRT_INDEX,
    SELECTED_BOTTOM_INDEX,
    SELECTED_EYE_BROWS_COLOR,
    SELECTED_EYE_BROWS_INDEX,
    SELECTED_EYE_COLOR,
    SELECTED_EYE_INDEX,
    SELECTED_HAIR_COLOR,
    SELECTED_HAIR_INDEX,
    SELECTED_MOUTH_INDEX,
    SELECTED_NOSE_INDEX,
    SELECTED_SKIN_COLOR_INDEX
} from '../actions/actionTypes'


const initialState = {
    selectedSkinColorIndex: 0,
    selectedEyeIndex: 0,
    selectedNoseIndex: 0,
    selectedMouthIndex: 0,
    selectedHairIndex: 0,
    selectedEyeBrowsIndex: 0,
    backFaceAccessoryActive: false,
    backHairActive: false,
    selectedEyeColor: 0,
    selectedHairColor: 0,
    selectedEyeBrowsColor: 0,
    selectedBottomIndex: 0,
    selectedShirtIndex: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case BACK_FACE_ACCESSORY_ACTIVE: {
            return {
                ...state,
                backFaceAccessoryActive: action.message.backFaceAccessoryActive,
            };
        }
        case SELECTED_SHIRT_INDEX: {
            return {
                ...state,
                selectedShirtIndex: action.message.selectedShirtIndex,
            };
        }
        case BACK_HAIR_ACTIVE: {
            return {
                ...state,
                backHairActive: action.message.backHairActive,
            };
        }
        case SELECTED_BOTTOM_INDEX: {
            return {
                ...state,
                selectedBottomIndex: action.message.selectedBottomIndex,
            };
        }
        case SELECTED_EYE_BROWS_COLOR: {
            return {
                ...state,
                selectedEyeBrowsColor: action.message.selectedEyeBrowsColor,
            };
        }
        case SELECTED_EYE_BROWS_INDEX: {
            return {
                ...state,
                selectedEyeBrowsIndex: action.message.selectedEyeBrowsIndex,
            };
        }
        case SELECTED_EYE_COLOR: {
            return {
                ...state,
                selectedEyeColor: action.message.selectedEyeColor,
            };
        }
        case SELECTED_HAIR_INDEX: {
            return {
                ...state,
                selectedHairIndex: action.message.selectedHairIndex,
            };
        }
        case SELECTED_MOUTH_INDEX: {
            return {
                ...state,
                selectedMouthIndex: action.message.selectedMouthIndex,
            };
        }
        case SELECTED_HAIR_COLOR: {
            return {
                ...state,
                selectedHairColor: action.message.selectedHairColor,
            };
        }
        case SELECTED_NOSE_INDEX: {
            return {
                ...state,
                selectedNoseIndex: action.message.selectedNoseIndex,
            };
        }
        case SELECTED_SKIN_COLOR_INDEX: {
            return {
                ...state,
                selectedSkinColorIndex: action.message.selectedSkinColorIndex,
            };
        }
        case SELECTED_EYE_INDEX: {
            return {
                ...state,
                selectedEyeIndex: action.message.selectedEyeIndex,
            };
        }

        default:
            return state;
    }
};

export default reducer