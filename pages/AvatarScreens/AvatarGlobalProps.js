let activeAvatarType = 'human';


export const SetActiveAvatarType = (type) => {
    activeAvatarType = type;
}

export const GetActiveAvatarType = () => {

    return activeAvatarType;

}

export const GetEyesOptionsLength = () => {
    if (activeAvatarType == 'human')
        return 27;
    else if (activeAvatarType == 'robot')
        return 6;
    else
        return 43;
}

export const GetEyeBrowsOptionsLength = () => {
    if (activeAvatarType == 'human')
        return 13;
}

export const GetMouthOptionsLength = () => {
    if (activeAvatarType == 'human')
        return 27;
    else if (activeAvatarType == 'robot')
        return 6;
    else
        return 35;
}

export const GetNoseOptionsLength = () => {
    if (activeAvatarType == 'human')
        return 7;
    else if (activeAvatarType == 'monster')
        return 5;
    else
        return 0;
}

export const GetBodyOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 23;
        else
            return 34;
    }
    else if (activeAvatarType == 'robot')
        return 5;
    else
        return 9;
}

export const GetFaceOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 11;
        else
            return 11;
    }
    else if (activeAvatarType == 'robot')
        return 0;
    else
        return 8;
}


export const GetMiddleOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 36;
        else
            return 37;
    }
    else if (activeAvatarType == 'robot')
        return 6;

    else return 6;
}

export const GetBottomsOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 10;
        else
            return 13;
    }
    else if (activeAvatarType == 'robot')
        return 6;
    else
        return 7;
}

export const GetHeadOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 12;
        else
            return 14;
    }
    else if (activeAvatarType == 'robot')
        return 5;

    else return 6;
}

export const GetHairOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 14;
        else
            return 13;
    }
    else if (activeAvatarType == 'robot')
        return 0;

    else return 5;
}

export const GetBackgroundOptionsLength = (gender) => {
    if (activeAvatarType == 'human') {
        if (gender == 'm')
            return 8;
    }
    else if (activeAvatarType == 'robot')
        return 0;

    else return 0;
}

export default function AvatarGlobalProps() {
    return (
        <div>

        </div>
    )
}
