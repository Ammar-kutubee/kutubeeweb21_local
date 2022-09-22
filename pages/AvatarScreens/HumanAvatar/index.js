import React, { Component } from 'react';
import Insidelayout from '../../../components/layouts/insidelayout'
import HumanFaceAccessoryBack from './HumanAccessories/HumanFaceAccessoryBack';
import HumanBackground from './HumanBackgrounds/HumanBackground';
import HumanBody from './HumanParts/HumanBody';
import HumanEyes from './HumanParts/HumanEyes';
import HumanFace from './HumanParts/HumanFace';
import HumanMouth from './HumanParts/HumanMouth';
import HumanNose from './HumanParts/HumanNose';
import HumanEars from './HumanParts/HumanEars';
import HumanHairBack from './HumanParts/H_hair_back';
import HumanEyeBrows from './HumanParts/HumanEyeBrows';
import HumanHair from './HumanParts/HumanHair';
import HumanHeadAccessory from './HumanAccessories/HumanHeadAccessory';
import HumanPants from './HumanClothes/HumanPants';
import HumanShirt from './HumanClothes/HumanShirt';
import { GetActiveAvatarType, GetBackgroundOptionsLength, GetBodyOptionsLength, GetBottomsOptionsLength, GetEyeBrowsOptionsLength, GetEyesOptionsLength, GetFaceOptionsLength, GetHairOptionsLength, GetHeadOptionsLength, GetMiddleOptionsLength, GetMouthOptionsLength, GetNoseOptionsLength, SetActiveAvatarType } from '../AvatarGlobalProps';
import { getAvatarData, getLockedAssets, saveAvatarData } from '../../../src/utils/apis';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import BookOutside from '../../../components/BookOutside';
import AvatarSkinColorBtn from '../AvatarSkinColorBtn';
import ScreenshotAvatar from './ScreenshotAvatar';
import router from 'next/router';
import i18next from 'i18next';
import RedeemAvatarModal from '../../../components/redeemAvatarModal';

class HumanAvatar extends Component {


    constructor(props) {
        super(props);
        // this.t = i18next.language
        this.state = {
            open: false,
            points: 0,
            type: "Human",
            AssetType: "",
            lockedindex: 0,
            lockedItemSvg: null,
            // lockedEyes: [4, 5, 6, 7, 9, 11, 20, 22, 26, 16, 17],
            lockedEyes: [],
            // lockedEyeBrows: [7],
            lockedEyeBrows: [],
            // lockedMouth: [7, 8, 15, 18, 23, 24, 25, 26],
            lockedMouth: [],
            // lockedNoses: [3],
            lockedNoses: [],
            // lockedHair: [13, 12, 11, 0],
            lockedHair: [],
            lockedHair_female: [4, 10, 12, 11],
            lockedHeadAcc: [1, 7, 3, 5, 6, 8, 9, 11],
            lockedHeadAcc_female: [1, 7, 3, 5, 6, 8],
            lockedFaceAcc: [9, 8, 7, 6, 5, 4, 3, 10],
            lockedBottoms: [0, 1, 8],
            lockedBottoms_female: [0, 10, 2],
            lockedTops: [11, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 18, 21, 20, 19, 35, 17, 16],
            lockedTops_female: [11, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            lockedDresses: [5, 16, 15, 14, 13, 11, 10, 9, 3, 2, 7, 19, 20, 21, 22, 18],
            lockedDresses_female: [5, 16, 15, 14, 13, 11, 10, 9, 3, 2, 7, 25, 23, 6, 33, 32, 31, 30, 29, 28, 27],
            lockedBackgrounds: [],
            isLoading: false,
            tabBarRoutes: [
                { title: 'Skin' },
                { title: 'Eyes' },
                { title: 'Mouth' },
                { title: 'Nose' },
                { title: 'Hair' },
                { title: 'Eye Brows' },
                { title: 'Pants' },
                { title: 'Shirts' },
                { title: 'Face' },
                { title: 'Hats' },
                { title: 'Dress' },
                { title: 'Background' },
            ],
            skinColors: [
                '#FFDBC7',
                '#FFD0B0',
                '#FFC299',
                '#FFD199',
                '#FFB899',
                '#FFAE85',
                '#FFA38A',
                '#FFCE88',
                '#dda490',
                '#DD8E6F',
                '#AA5943',
                '#6B2F22',
            ],
            innerEarSkinColors: [
                '#EFC4B1',
                '#EABFA2',
                '#EFAA7B',
                '#E5B589',
                '#E8A18B',
                '#EA9671',
                '#EA9581',
                '#EAB77F',
                '#EAB77F',
                '#D17154',
                '#99402B',
                '#490B07',
            ],
            eyeColors: [
                '#B55230',
                '#5B290D',
                '#30120D',
                '#94B74F',
                '#7CCBF7',
                '#DD7826'
            ],
            hairColors: [
                '#FFDBA1',
                '#CE5119',
                '#9E532E',
                '#823E29',
                '#422019',
                '#000000',
                '#A8714C',
                '#A5A5A5',
                '#841A27',
                '#0C1444',
            ],
            sectionPropsBtns: [
                {
                    title: 'Body',
                    icon: 'icon'
                },
                {
                    title: 'Eyes',
                    icon: 'icon'
                },
                {
                    title: 'Mouth',
                    icon: 'icon'
                },
                {
                    title: 'Nose',
                    icon: 'icon'
                },
                {
                    title: 'Body',
                    icon: 'icon'
                },
                {
                    title: 'Eyes',
                    icon: 'icon'
                },
                {
                    title: 'Mouth',
                    icon: 'icon'
                },
                {
                    title: 'Nose',
                    icon: 'icon'
                },
            ],
            selectedSkinColorIndex: 2,
            selectedEyeIndex: 25,
            selectedNoseIndex: 0,
            selectedMouthIndex: 16,
            selectedHairIndex: 8,
            selectedEyeBrowsIndex: 0,
            FrontFaceAccessoryActive: true,
            backHairActive: false,
            activeGender: 'f',
            selectedEyeColor: 0,
            selectedHairColor: 4,
            selectedEyeBrowsColor: 4,
            selectedBottomIndex: 2,
            selectedShirtIndex: 0,
            selectedFaceAccessoryIndex: 0,
            selectedHeadAccessoryIndex: 0,
            selectedBodyIndex: 17,
            selectedBackgroundIndex: 0,


            selectedSkinColorIndex2: 2,
            selectedEyeIndex2: 25,
            selectedNoseIndex2: 0,
            selectedMouthIndex2: 16,
            selectedHairIndex2: 8,
            selectedEyeBrowsIndex2: 0,
            FrontFaceAccessoryActive2: true,
            backHairActive2: false,
            activeGender2: 'f',
            selectedEyeColor2: 0,
            selectedHairColor2: 4,
            selectedEyeBrowsColor2: 4,
            selectedBottomIndex2: 2,
            selectedShirtIndex2: 0,
            selectedFaceAccessoryIndex2: 0,
            selectedHeadAccessoryIndex2: 0,
            selectedBodyIndex2: 17,
            selectedBackgroundIndex2: 0,


            loadingAvatar: true,
            saving: false,
            tabIndex: 0,
            tabIcons: [],
            hairMaleItems: [],
            hairFemaleItems: [],
            bodyMaleItems: [],
            bodyFemaleItems: [],
            eyeItems: [],
            mouthItems: [],
            noseItems: [],
            eyeBrowsItems: [],
            faceItems: [],
            headItems: [],
            pantsItems: [],
            shirtItems: [],
            backgroundItems: [],
            finalImage: null,
            finalImageHead: null
        };
    }

    async componentDidMount() {
        this.getLockedItems()
        clearInterval(this.generateInterval);

        this.getActiveGender();
        this.loadSavedAvatar();
        SetActiveAvatarType('human');
        this.InitAvatarTabs();
    }

    InitAvatarTabs = () => {
        let tabIcons = [];
        for (let x = 0; x < 13; x++) {
            tabIcons.push(x)
        }

        let hairArr = [];
        for (let x = 0; x < GetHairOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            hairArr.push(x);
        }
        let bodyArr = [];
        for (let x = 0; x < GetBodyOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            bodyArr.push(x);
        }
        let eyeArr = [];
        for (let x = 0; x < GetEyesOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            eyeArr.push(x);
        }

        let mouthArr = [];

        for (let x = 0; x < GetMouthOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            mouthArr.push(x);
        }

        let noseArr = [];

        for (let x = 0; x < GetNoseOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            noseArr.push(x);
        }
        let eyeBrowsArr = [];

        for (let x = 0; x < GetEyeBrowsOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            eyeBrowsArr.push(x);
        }

        let faceArr = [];

        for (let x = 0; x < GetFaceOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            faceArr.push(x);
        }

        let headArr = [];

        for (let x = 0; x < GetHeadOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            headArr.push(x);
        }

        let pantArr = [];

        for (let x = 0; x < GetBottomsOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            pantArr.push(x);
        }

        let shirtArr = [];

        for (let x = 0; x < GetMiddleOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            shirtArr.push(x);
        }


        let backgroundArr = [];

        for (let x = 0; x < GetBackgroundOptionsLength(this.props.loggedInUser.userData.gender); x++) {
            backgroundArr.push(x);
        }


        this.setState({
            hairMaleItems: hairArr,
            hairFemaleItems: hairArr,

            bodyMaleItems: bodyArr,
            bodyFemaleItems: bodyArr,

            eyeItems: eyeArr,

            mouthItems: mouthArr,
            lockedMouthItems: [0, 1, 3],
            noseItems: noseArr,
            eyeBrowsItems: eyeBrowsArr,
            faceItems: faceArr,
            headItems: headArr,
            pantsItems: pantArr,
            shirtItems: shirtArr,
            backgroundItems: backgroundArr,
            tabIcons: tabIcons
        });
    }

    componentWillUnmount() {
        clearInterval(this.generateInterval);
    }

    getActiveGender = () => {

        this.setState({

            activeGender: this.props.loggedInUser.userData.gender
        }, () => {

            if (this.state.activeGender == 'm' && this.state.selectedBottomIndex >= 10) {
                this.setState({
                    selectedBottomIndex: 0
                });
            }

            if (this.state.activeGender == 'f') {
                this.setState({
                    selectedSkinColorIndex: 2,
                    selectedEyeIndex: 21,
                    selectedMouthIndex: 16,
                    selectedEyeColor: 1,
                    selectedHairIndex: 9,
                    selectedHairColor: 2,
                    selectedHeadAccessoryIndex: 12,
                    selectedEyeBrowsColor: 2,
                    selectedBottomIndex: 2,
                    selectedBodyIndex: 12,
                    selectedBodyIndex2: 12
                });
            }
        });
    }

    loadSavedAvatar = async () => {

        let avatarData = await getAvatarData(this.props.loggedInUser.userData._id)

        if (avatarData.avatarType == 'human') {
            this.setState({
                ...avatarData
            })
        }
        this.setState({
            loadingAvatar: false
        })
    }

    uploadAvatar = async (fullScreenShot, headScreenShot) => {

        if (this.state.saving == false) {


            let avatar = {
                selectedSkinColorIndex: this.state.selectedSkinColorIndex,
                selectedEyeIndex: this.state.selectedEyeIndex,
                selectedNoseIndex: this.state.selectedNoseIndex,
                selectedMouthIndex: this.state.selectedMouthIndex,
                selectedHairIndex: this.state.selectedHairIndex,
                selectedEyeBrowsIndex: this.state.selectedEyeBrowsIndex,
                FrontFaceAccessoryActive: this.state.FrontFaceAccessoryActive,
                backHairActive: this.state.backHairActive,
                selectedEyeColor: this.state.selectedEyeColor,
                selectedHairColor: this.state.selectedHairColor,
                selectedEyeBrowsColor: this.state.selectedEyeBrowsColor,
                selectedBottomIndex: this.state.selectedBottomIndex,
                selectedShirtIndex: this.state.selectedShirtIndex,
                selectedFaceAccessoryIndex: this.state.selectedFaceAccessoryIndex,
                selectedHeadAccessoryIndex: this.state.selectedHeadAccessoryIndex,
                selectedBodyIndex: this.state.selectedBodyIndex,
                selectedBodyIndex2: this.state.selectedBodyIndex2,
                selectedBackgroundIndex: this.state.selectedBackgroundIndex,
                avatarType: 'human'
            }
            this.setState({
                saving: true
            })
            let saveAvatar = await saveAvatarData(fullScreenShot, headScreenShot, avatar, this.props.loggedInUser.userData._id)
            this.setState({
                saving: false
            })
            // POP to Root once avatar is saved
        }
    }

    handleSelect = (index) => {

        this.setState({
            tabIndex: index
        });
    }

    renderTabIcon = (index) => {
        switch (index) {


            case 0: // body
            return (
                <Tab>
                    {
                        <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 13.4033C19.6532 14.2312 19.1279 14.5757 18.3137 14.5092C17.4346 14.4375 16.7548 13.9151 16.5965 13.1036C16.3941 12.068 16.2751 11.0166 16.0704 9.98091C15.7915 8.57386 15.3551 7.21388 14.6197 5.95777C14.5734 5.87856 14.517 5.80458 14.3995 5.63122C14.3995 5.85017 14.4003 5.95553 14.3995 6.06163C14.3501 13.7298 14.2829 21.3973 14.2667 29.0654C14.2628 30.7236 12.6862 31.1592 11.7059 30.672C11.1868 30.4142 10.8933 30.0025 10.8454 29.4361C10.8299 29.2508 10.8315 29.0639 10.8315 28.8771C10.8307 24.7636 10.8307 20.65 10.8307 16.5357C10.8307 16.3892 10.8307 16.2428 10.8307 16.0717C10.2629 16.0717 9.72993 16.0717 9.14516 16.0717C9.14516 16.2226 9.14516 16.3661 9.14516 16.5103C9.14516 20.6739 9.14593 24.8368 9.14439 29.0004C9.14362 30.0481 8.58975 30.755 7.62184 30.959C6.5481 31.1854 5.53229 30.4493 5.45736 29.386C5.44423 29.1999 5.445 29.0131 5.445 28.8271C5.45041 21.4077 5.45581 13.9876 5.46199 6.56826C5.46199 6.43376 5.46199 6.29926 5.46199 6.16475C5.42646 6.15205 5.3917 6.14009 5.35616 6.12739C5.10588 6.68259 4.83011 7.22882 4.60918 7.79449C3.9464 9.49147 3.69534 11.2766 3.4551 13.0625C3.30833 14.1528 2.38368 14.8469 1.29139 14.699C0.396867 14.5779 -0.10447 13.9816 0.0183534 13.1096C0.19834 11.8311 0.381417 10.5511 0.627837 9.28299C0.963864 7.55761 1.49919 5.89126 2.38522 4.34298C4.13411 1.28602 6.86558 -0.121784 10.4051 0.00823631C13.4602 0.120322 15.7722 1.54083 17.3396 4.10386C18.601 6.16625 19.2909 8.41021 19.6902 10.7536C19.8022 11.4119 19.8965 12.0724 19.9992 12.7315C20 12.9557 20 13.1799 20 13.4033Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>

                    }
                    <div
                        className="avatar-tab-text"
                        style={{
                            color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                        }}>
                            
                            {i18next.t('avatarTabs.skin')}

                    </div>
                </Tab>
            )


            

           

                case 1: // hair
                return (
                    <Tab>

                        <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.39187 11.5486L7.08777 11.2305C7.08777 11.234 7.18564 11.3754 7.39187 11.5486Z" fill="#C4C41E" />
                            <path d="M22.8556 1.49588C20.7514 0.410865 19.3846 2.28048 19.3846 2.28048C19.3846 2.28048 19.3392 0.273029 16.7841 0.018564C14.2289 -0.235901 13.5228 2.20979 13.5228 2.20979C13.5228 2.20979 14.8161 2.97319 14.3373 4.69436C16.3891 5.72636 15.9067 9.85435 15.9067 9.85435C15.9067 9.85435 16.4031 12.1905 19.2413 12.2753C22.0831 12.3601 22.6459 10.5789 22.6459 10.5789C22.915 9.17225 21.9503 7.65959 21.9503 7.65959C21.9503 7.65959 22.8206 7.45107 23.4009 6.95981C23.9811 6.46855 24.058 5.00538 24.058 5.00538C24.058 5.00538 24.9564 2.58089 22.8556 1.49588Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M14.3338 4.69738C14.8127 2.97267 13.5194 2.21281 13.5194 2.21281C13.5194 2.21281 12.8587 -0.0243628 10.7824 0.297253C8.70616 0.618869 8.93337 2.97267 8.93337 2.97267C8.93337 2.97267 7.56316 1.33632 6.40268 2.00429C5.23871 2.67226 5.71758 4.60902 5.71758 4.60902C5.34706 5.53146 5.98323 6.59173 6.75921 7.69795C5.89235 9.46154 7.08778 11.2287 7.08778 11.2287L7.39189 11.5467C7.76939 11.8684 8.51042 12.2854 9.6674 12.0592C11.4466 11.7128 11.8136 9.95986 11.8136 9.95986C11.8136 9.95986 12.4847 11.7765 14.1625 11.5503C15.8403 11.3241 15.9067 9.85384 15.9067 9.85384C15.9067 9.85384 16.3891 5.72938 14.3338 4.69738Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M4.98707 14.849C4.98707 14.849 6.06715 14.803 6.75925 13.5095C7.45134 12.2195 7.08782 11.2264 7.08782 11.2264C7.08782 11.2264 5.89238 9.46281 6.75925 7.69569C5.98326 6.58947 5.3471 5.5292 5.71761 4.60677C5.71761 4.60677 4.44178 3.82216 3.32325 4.81529C2.20471 5.80841 3.32325 7.60734 3.32325 7.60734C3.32325 7.60734 0.631774 7.88301 0.0829927 10.7457C-0.465789 13.6049 1.88663 14.7359 1.88663 14.7359C1.88663 14.7359 3.10304 15.8421 4.98707 14.849Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M0.359127 25.1938C0.495448 26.7666 2.22918 27.2967 2.22918 27.2967C2.22918 27.2967 1.43222 28.0106 2.00197 29.0744C2.57173 30.1347 3.44908 31.0253 4.49071 30.9971C5.32962 29.905 4.69345 27.8198 4.69345 27.8198C4.69345 27.8198 5.44496 27.6007 5.60575 26.6323C5.76654 25.6639 4.96609 25.0631 4.96609 25.0631C4.96609 25.0631 5.417 24.5329 5.47642 23.819C5.53584 23.1051 4.77734 22.7022 4.77734 22.7022C3.5819 24.3633 2.16276 20.8008 2.16276 20.8008C2.16276 20.8008 0.21931 23.6211 0.359127 25.1938Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M0.359173 17.4487C0.495494 19.0214 1.87968 19.905 1.87968 19.905C1.87968 19.905 0.383641 20.9723 0.953395 22.0361C1.52315 23.0964 3.44912 23.2802 4.49076 23.2519C5.32966 22.1598 4.69349 20.0746 4.69349 20.0746C4.69349 20.0746 5.44501 19.8555 5.6058 18.8871C5.76659 17.9187 4.96614 17.3179 4.96614 17.3179C4.96614 17.3179 5.41705 16.7878 5.47647 16.0739C5.53589 15.3599 4.98711 14.851 4.98711 14.851C3.09958 15.8441 1.88318 14.7344 1.88318 14.7344C1.88318 14.7344 0.219356 15.8759 0.359173 17.4487Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M31.1084 21.6228C30.7449 19.7779 29.3048 19.5234 29.3048 19.5234C27.5326 21.1492 26.2533 20.771 26.2533 20.771C26.2533 20.771 25.1243 22.7361 25.5332 24.3441C25.9422 25.9522 26.816 26.3799 26.816 26.3799C26.816 26.3799 26.1135 27.6133 26.2533 28.5145C26.3896 29.4158 26.5749 30.6457 27.0642 30.9956C29.0252 30.3241 29.109 27.8183 29.109 27.8183C29.109 27.8183 30.3849 27.4154 30.4827 26.0547C30.5806 24.694 29.9864 24.2558 29.9864 24.2558C29.9864 24.2558 31.472 23.4677 31.1084 21.6228Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M29.3047 11.7846C29.3047 11.7846 29.808 10.2154 29.1229 8.99257C28.4378 7.76973 27.0466 7.70257 27.0466 7.70257C27.0466 7.70257 27.8226 6.52567 26.5433 5.32757C25.2675 4.12946 24.0581 5.01302 24.0581 5.01302C24.0581 5.01302 23.9812 6.47619 23.4009 6.96745C22.8207 7.45871 21.9503 7.66723 21.9503 7.66723C21.9503 7.66723 22.9151 9.17989 22.6459 10.5865C22.6459 10.5865 22.3034 12.4385 23.5198 12.958C24.7327 13.4775 26.0819 12.9757 26.0819 12.9757C26.0819 12.9757 27.5325 13.4104 29.3047 11.7846Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M31.1085 13.8845C30.745 12.0396 29.3048 11.7852 29.3048 11.7852C27.5327 13.4109 26.0786 12.9727 26.0786 12.9727C26.0786 12.9727 25.1243 14.9978 25.5333 16.6059C25.9422 18.2139 26.8161 18.6416 26.8161 18.6416C26.8161 18.6416 26.1135 19.875 26.2533 20.7763C26.3233 21.2251 26.5015 21.4195 26.7252 21.5467C27.2495 21.8436 27.9067 21.7941 28.3995 21.4478C29.3083 20.8116 29.1126 20.0765 29.1126 20.0765C29.1126 20.0765 30.3884 19.6736 30.4863 18.3129C30.5842 16.9522 29.9899 16.514 29.9899 16.514C29.9899 16.514 31.472 15.7294 31.1085 13.8845Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.hair')}
                        </div>
                    </Tab>

                )


                
                case 2: //eyes
                return (
                    <Tab>

                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5952 16.8396C10.3322 19.1451 4.21864 17.7584 1.97148 13.4314C0.847906 11.293 0.600059 8.95403 0.914 7.41701C1.39317 6.48144 2.7646 5.24514 4.48301 4.54346C5.83791 3.97543 7.09368 3.60788 9.32431 3.57447C11.6871 3.52435 13.1742 3.69142 15.3388 4.54346C16.7928 5.11149 18.2964 6.19742 18.7425 7.26664C19.8661 10.1068 18.8582 14.5173 14.5952 16.8396Z" fill="white" />
                            <path d="M13.7528 17.0497C10.8447 18.7705 6.44951 17.6344 4.96243 16.2645C3.31011 14.7442 2.61613 13.274 2.8805 11.2859C3.26054 8.47918 4.56587 7.57701 5.60683 6.90874C7.04435 5.98987 9.20888 5.62233 10.2003 5.67245C11.423 5.72257 13.6701 5.88964 15.3225 7.19277C16.9748 8.47918 17.6192 10.7513 17.3052 12.5389C16.8756 14.8611 15.7521 15.8635 13.7528 17.0497Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M5.50723 8.38087C4.66455 8.11356 3.87144 8.83195 4.02015 9.7007C4.08624 10.1184 4.40019 10.4692 4.78022 10.5862C5.6229 10.8535 6.416 10.1351 6.2673 9.26633C6.21773 8.86536 5.90379 8.49782 5.50723 8.38087Z" fill="white" />
                            <path d="M14.6613 3.47658C13.5377 3.05892 12.1498 2.69137 10.2661 2.65796C10.167 1.98969 9.85306 -0.0652341 9.58869 0.00159256C9.3078 0.0684192 9.20866 2.12334 9.17561 2.67466C8.03551 2.74148 7.04412 2.92527 6.18491 3.19257C5.95359 2.72479 4.78044 0.469384 4.53259 0.619744C4.2517 0.786811 5.14395 3.56012 5.14395 3.56012L5.27614 3.5267C4.74739 3.74389 4.26822 3.97779 3.85514 4.21168C3.22726 4.57923 2.71504 4.96348 2.31848 5.33103L2.64895 4.9969C2.64895 4.9969 0.335698 2.92526 0.13742 3.17586C-0.0608588 3.42646 1.82278 5.71527 1.87235 5.7821C1.06272 6.66755 0.814872 7.43606 0.880965 7.56971C0.880965 7.56971 2.1863 6.08282 3.93775 5.18066C5.50746 4.36203 7.60591 3.89426 9.62174 3.86084C12.1333 3.81072 13.8352 4.16156 15.6858 4.9969C16.611 5.41456 17.5529 6.0327 18.5608 6.86804C18.5443 6.86804 17.6685 4.61264 14.6613 3.47658Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.eyes')}
                        </div>
                    </Tab>
                )

                case 3: // mouth
                return (
                    <Tab>
                        <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.31079 11.0015C3.00239 11.0015 0.626354 10.2109 0.460934 10.1653C0.160171 10.0588 -0.00525175 9.7395 0.100016 9.42019C0.205283 9.11609 0.521087 8.94884 0.836889 9.05527C0.897042 9.07048 6.59651 10.9407 12.5216 8.76637C15.86 7.53475 19.3038 4.09838 20.3865 0.920491C20.4918 0.616387 20.8226 0.449133 21.1234 0.555569C21.4242 0.662006 21.5896 0.996517 21.4843 1.30062C20.2963 4.82823 16.6119 8.50788 12.9276 9.86115C10.5666 10.7278 8.28079 11.0015 6.31079 11.0015Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M22.3567 2.54181C22.2063 2.54181 22.0559 2.48099 21.9506 2.37456C21.0934 1.50787 19.5746 1.20376 19.0633 1.15815C18.7475 1.12774 18.5069 0.854051 18.537 0.534745C18.567 0.215438 18.8377 -0.027841 19.1535 0.00256916C19.2438 0.0177742 21.4393 0.215435 22.7627 1.55348C22.9883 1.78156 22.9883 2.14648 22.7627 2.37456C22.6424 2.48099 22.492 2.54181 22.3567 2.54181Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.mouth')}
                        </div>
                    </Tab>
                )





            case 4: // eyeBrows
                return (
                    <Tab>

                        <svg width="45" height="11" viewBox="0 0 45 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.254132 6.4584C0.254132 6.4584 4.66827 4.5506 8.11387 4.7924C11.5595 5.03421 13.2251 6.19208 14.6306 5.85671C16.0361 5.52133 15.9953 3.7612 14.0627 3.11911C12.1301 2.47701 8.80089 1.83485 5.19491 2.88788C1.5783 3.92287 0.254132 6.4584 0.254132 6.4584Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M44.0056 6.74037C44.0056 6.74037 39.6635 4.67378 36.2114 4.7905C32.7593 4.90722 31.0528 6.00393 29.6604 5.61782C28.268 5.23171 28.3725 3.47422 30.3271 2.90261C32.2818 2.33101 35.6321 1.80998 39.1975 2.99306C42.7886 4.15541 44.0056 6.74037 44.0056 6.74037Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.eyebrows')}
                        </div>
                    </Tab>

                )


            case 5: // nose
                return (
                    <Tab>

                        <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.6754 0.344078C7.49395 0.0538835 7.08072 -0.043394 6.79428 0.138191C6.50785 0.319776 6.65872 0.305186 6.84673 0.619699C8.35957 2.97692 9.95535 7.26827 9.29059 8.43881C9.23811 8.53122 9.08068 8.80846 8.35479 8.79551C5.41406 8.70155 1.44125 9.56415 0.653982 11.8112C-0.100482 13.8929 2.13604 16.4462 4.70495 18.4143C5.61445 19.1082 6.48024 19.7356 7.17334 19.627C7.26955 19.601 7.32859 19.5329 7.35702 19.447C7.40077 19.2265 7.27834 18.8682 7.08157 18.7126C2.33293 14.8801 2.11661 12.9298 2.43152 12.0884C2.95636 10.5904 5.88841 9.98231 8.36343 10.0714C9.08932 10.0844 9.55723 9.90601 9.9027 9.65633C10.141 9.48772 10.3116 9.25913 10.4166 9.0743C11.663 6.8078 8.34437 1.38975 7.6754 0.344078Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.nose')}
                        </div>
                    </Tab>
                )


                case 6: // shirts
                return (
                    <Tab>
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.9666 3.55927C23.4237 2.89163 18.1559 0.730469 18.1559 0.730469C18.1559 0.730469 16.8108 1.70472 14.6001 1.93221C12.3893 1.70472 11.0442 0.730469 11.0442 0.730469C11.0442 0.730469 5.77645 2.89163 5.23353 3.55927C4.30421 6.22981 4.69061 21.714 4.69061 21.714H14.5805H14.6147H24.5046C24.5046 21.714 24.8959 6.22487 23.9666 3.55927Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M23.9666 3.5625C23.9666 3.5625 24.7883 4.25486 25.566 5.11537C26.3437 5.97588 29.2099 11.2725 29.2099 11.2725C29.2099 11.2725 28.398 12.1775 26.8768 13.0924C25.3557 14.0023 24.0449 14.2793 24.0449 14.2793L22.5042 11.9154L23.9666 3.5625Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M5.31177 3.49609C5.31177 3.49609 4.42648 4.18846 3.6439 5.04897C2.86621 5.90948 0 11.2061 0 11.2061C0 11.2061 0.811929 12.1111 2.33307 13.026C3.85422 13.936 5.16504 14.2129 5.16504 14.2129L6.70575 11.849L5.31177 3.49609Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.tops')}
                        </div>
                    </Tab>
                )


                case 7: // pants
                return (
                    <Tab>
                        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.7256 0.554688C17.7256 0.554688 14.1942 1.0245 8.8335 1.0245C8.8335 2.80487 8.8335 7.52778 8.8335 7.52778C8.8335 7.52778 9.90465 7.63164 10.022 9.57026C10.1394 11.5089 11.4111 23.734 11.4111 23.734H14.2871C14.292 23.734 17.7256 12.226 17.7256 0.554688Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M0 0.554688C0 0.554688 3.5314 1.0245 8.89208 1.0245C8.89208 2.80487 8.89208 7.52778 8.89208 7.52778C8.89208 7.52778 7.82092 7.63164 7.70354 9.57026C7.58615 11.5039 6.31446 23.734 6.31446 23.734H3.43847C3.43847 23.734 0 12.226 0 0.554688Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M4.60231 16.4815C5.32743 16.3619 5.81937 15.6705 5.70107 14.9374C5.58278 14.2042 4.89905 13.7068 4.17392 13.8264C3.44879 13.946 2.95686 14.6373 3.07515 15.3705C3.19345 16.1037 3.87718 16.6011 4.60231 16.4815Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M14.8692 15.1616C14.8692 14.4198 14.2724 13.8164 13.5388 13.8164C12.8051 13.8164 12.2084 14.4198 12.2084 15.1616C12.2084 15.9034 12.8051 16.5067 13.5388 16.5067C14.2773 16.5018 14.8692 15.9034 14.8692 15.1616Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.bottoms')}
                        </div>
                    </Tab>
                )





                case 8: // body
                return (
                    <Tab>
                        {
                            // <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //     <path d="M20 13.4033C19.6532 14.2312 19.1279 14.5757 18.3137 14.5092C17.4346 14.4375 16.7548 13.9151 16.5965 13.1036C16.3941 12.068 16.2751 11.0166 16.0704 9.98091C15.7915 8.57386 15.3551 7.21388 14.6197 5.95777C14.5734 5.87856 14.517 5.80458 14.3995 5.63122C14.3995 5.85017 14.4003 5.95553 14.3995 6.06163C14.3501 13.7298 14.2829 21.3973 14.2667 29.0654C14.2628 30.7236 12.6862 31.1592 11.7059 30.672C11.1868 30.4142 10.8933 30.0025 10.8454 29.4361C10.8299 29.2508 10.8315 29.0639 10.8315 28.8771C10.8307 24.7636 10.8307 20.65 10.8307 16.5357C10.8307 16.3892 10.8307 16.2428 10.8307 16.0717C10.2629 16.0717 9.72993 16.0717 9.14516 16.0717C9.14516 16.2226 9.14516 16.3661 9.14516 16.5103C9.14516 20.6739 9.14593 24.8368 9.14439 29.0004C9.14362 30.0481 8.58975 30.755 7.62184 30.959C6.5481 31.1854 5.53229 30.4493 5.45736 29.386C5.44423 29.1999 5.445 29.0131 5.445 28.8271C5.45041 21.4077 5.45581 13.9876 5.46199 6.56826C5.46199 6.43376 5.46199 6.29926 5.46199 6.16475C5.42646 6.15205 5.3917 6.14009 5.35616 6.12739C5.10588 6.68259 4.83011 7.22882 4.60918 7.79449C3.9464 9.49147 3.69534 11.2766 3.4551 13.0625C3.30833 14.1528 2.38368 14.8469 1.29139 14.699C0.396867 14.5779 -0.10447 13.9816 0.0183534 13.1096C0.19834 11.8311 0.381417 10.5511 0.627837 9.28299C0.963864 7.55761 1.49919 5.89126 2.38522 4.34298C4.13411 1.28602 6.86558 -0.121784 10.4051 0.00823631C13.4602 0.120322 15.7722 1.54083 17.3396 4.10386C18.601 6.16625 19.2909 8.41021 19.6902 10.7536C19.8022 11.4119 19.8965 12.0724 19.9992 12.7315C20 12.9557 20 13.1799 20 13.4033Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            // </svg>

<svg
width={20}
height={34}
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path

  d="M19.031 33.11c-.005-.139-.02-.282-.02-.376.01-.623.015-1.246.015-1.87 0-2.25-.063-4.505-.156-6.755-.078-1.855-.19-3.714-.269-5.569-.073-1.824.034-3.669-.108-5.489 0 0-.132.005-.337.005-.435-.015-1.174-.109-1.507-.53-.366-.464-.655-2.596-.88-4.613a86.596 86.596 0 0 0-1.12-7.399C14.165.193 13.524 0 13.524 0s.303 2.745.63 6.88c-.307-.045-1.447-.065-2.635-.07a91.703 91.703 0 0 0-2.006.005v.005c-1.545-.015-4.143-.015-4.637.06.328-4.135.631-6.88.631-6.88s-.64.193-1.125.514c-.67 3.358-.997 6.3-1.12 7.399-.22 2.013-.508 4.144-.88 4.614-.333.425-1.071.514-1.506.529-.206 0-.338-.005-.338-.005-.142 1.82-.034 3.665-.108 5.49-.073 1.854-.19 3.713-.269 5.568-.102 2.458-.166 4.92-.151 7.374.005.415.005.835.01 1.251 0 .099-.015.237-.02.376V33.313a.504.504 0 0 0 .034.163l8.814.232c.108-.934.196-1.582.25-1.696.16-.346.298-.396.376-.396v.015h.005l.024-.01.025.01h.005v-.015c.073-.005.215.05.376.396.054.114.142.757.25 1.696l8.814-.232a.503.503 0 0 0 .034-.163v-.055c.024-.05.024-.099.024-.148Z"
  fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"}
/>
</svg>

                        }
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.body')}
                        </div>
                    </Tab>
                )


  




            case 9: // head accessories
                return (
                    <Tab>

                        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.9998 12.4905C27.6584 13.3929 26.9007 13.8318 26.1024 14.2057C24.8033 14.8143 23.4181 15.1298 22.016 15.3679C18.2157 16.0121 14.3902 16.1212 10.5504 15.887C8.41135 15.7562 6.28984 15.4981 4.20503 14.984C3.19522 14.7348 2.20131 14.4293 1.30492 13.8791C0.989325 13.6849 0.678658 13.4563 0.427166 13.1853C-0.161293 12.5505 -0.132801 11.7945 0.457301 11.1569C0.937273 10.6384 1.54655 10.324 2.18706 10.0787C2.86428 9.81944 3.55849 9.60413 4.30913 9.34766C4.30913 9.60747 4.32392 9.78828 4.30694 9.96631C4.20174 11.0723 4.78581 11.7533 5.66905 12.249C6.6142 12.7798 7.6503 13.0129 8.7001 13.2143C10.9783 13.6516 13.279 13.7345 15.5841 13.6365C17.4678 13.5564 19.3472 13.3517 21.1503 12.7519C21.7454 12.5539 22.313 12.2295 22.8439 11.8852C23.4105 11.518 23.7091 10.9516 23.6872 10.2423C23.679 9.97522 23.6861 9.70817 23.6861 9.38994C24.0126 9.47895 24.3217 9.53904 24.6126 9.64753C25.2608 9.88843 25.9133 10.1232 26.5385 10.4164C27.2042 10.7291 27.7439 11.202 27.9998 11.9363C27.9998 12.121 27.9998 12.3058 27.9998 12.4905Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M14.0081 12.9054C11.9929 12.9315 9.99249 12.7373 8.01781 12.309C7.15321 12.1215 6.30504 11.8617 5.5933 11.2892C5.28099 11.0383 5.07114 10.7262 5.07004 10.3017C5.06566 8.53526 5.12429 6.77386 5.52974 5.04473C5.69631 4.33316 5.93629 3.64663 6.32312 3.02241C7.06554 1.82403 8.17233 1.37506 9.51855 1.47966C10.3163 1.54141 11.1097 1.66047 11.9053 1.75505C12.4236 1.8168 12.9107 1.75393 13.3802 1.48744C14.3183 0.956132 15.2771 0.464321 16.3297 0.201169C17.3948 -0.0653216 18.4528 -0.11428 19.4867 0.347488C20.3453 0.731368 20.9612 1.38341 21.4318 2.18566C22.0975 3.32172 22.4257 4.57462 22.6416 5.86479C22.8783 7.28014 22.9495 8.70772 22.9742 10.1403C22.9824 10.641 22.7874 11.0116 22.412 11.3059C21.7096 11.8567 20.8828 12.1215 20.0363 12.3056C18.0523 12.7362 16.0425 12.9326 14.0081 12.9054Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.head')}
                        </div>
                    </Tab>
                )
            case 10: // face accessories
                return (
                    <Tab>
                        <svg width="38" height="11" viewBox="0 0 38 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5165 3.15028C15.4139 2.03472 13.0995 -0.0459248 9.42015 0.000772944C5.74075 0.0474707 4.02679 2.43943 4.02679 2.43943C3.31862 3.17103 2.76953 10.8554 9.10712 10.6064C15.4447 10.3521 15.6192 4.26584 15.5165 3.15028ZM9.14817 10.1549C3.34941 10.3884 3.85231 3.35264 4.4989 2.6833C4.4989 2.6833 6.06405 0.498884 9.43554 0.452186C12.8019 0.410677 14.9213 2.30972 15.0136 3.33188C15.106 4.35404 14.9469 9.92665 9.14817 10.1549Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path opacity="0.75" d="M9.43536 0.453793C6.06899 0.495302 4.49871 2.68491 4.49871 2.68491C3.85212 3.35424 3.34922 10.39 9.14798 10.1566C14.9467 9.92306 15.1058 4.35565 15.0135 3.33349C14.9211 2.31651 12.8017 0.412283 9.43536 0.453793Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M19.0417 3.16484C19.0417 3.16484 18.2002 3.06107 17.5074 3.57475C16.8146 4.08842 16.6915 4.58134 16.3066 4.48276C15.9217 4.37899 15.5317 3.82899 15.5317 3.82899C15.5317 3.82899 15.3418 5.837 14.9724 6.64124C15.5933 6.1535 15.8037 5.51011 15.6497 4.81483C16.3476 5.18322 16.6504 5.04313 17.0045 4.62804C17.3637 4.21814 17.8461 3.62145 19.0417 3.62145C19.0417 3.43466 19.0417 3.16484 19.0417 3.16484Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M3.87288 2.74219C3.87288 2.74219 2.64641 3.04313 2.62588 3.15728C2.60536 3.26624 2.62588 3.63982 2.62588 3.63982L3.65222 3.88369L3.87288 2.74219Z" fill="#6AC3DB" />
                            <path d="M2.62059 3.15234L0.506348 5.99572L0.886091 6.05798L2.62059 3.63489V3.15234Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M28.9768 10.6064C35.3144 10.8606 34.7602 3.17622 34.0571 2.43943C34.0571 2.43943 32.3432 0.0474707 28.6638 0.000772943C24.9844 -0.0459248 22.67 2.03472 22.5674 3.15028C22.4647 4.26583 22.6392 10.3521 28.9768 10.6064ZM23.0703 3.33707C23.1626 2.31491 25.282 0.415863 28.6484 0.457372C32.0147 0.498881 33.585 2.68849 33.585 2.68849C34.2316 3.35782 34.7345 10.3936 28.9357 10.1601C23.137 9.92664 22.9779 4.35404 23.0703 3.33707Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path opacity="0.75" d="M28.6484 0.453793C32.0147 0.495302 33.585 2.68491 33.585 2.68491C34.2316 3.35424 34.7345 10.39 28.9357 10.1566C23.137 9.92306 22.9779 4.35565 23.0703 3.33349C23.1626 2.31651 25.282 0.412283 28.6484 0.453793Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M19.042 3.16484C19.042 3.16484 19.8836 3.06107 20.5764 3.57475C21.2691 4.08842 21.3923 4.58134 21.7772 4.48276C22.162 4.37899 22.552 3.82899 22.552 3.82899C22.552 3.82899 22.7419 5.837 23.1114 6.64124C22.4905 6.1535 22.2801 5.51011 22.434 4.81483C21.7361 5.18322 21.4333 5.04313 21.0793 4.62804C20.72 4.21814 20.2377 3.62145 19.042 3.62145C19.042 3.43466 19.042 3.16484 19.042 3.16484Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M34.2164 2.74219C34.2164 2.74219 35.4429 3.04313 35.4634 3.15728C35.4839 3.26624 35.4634 3.63982 35.4634 3.63982L34.4371 3.88369L34.2164 2.74219Z" fill="#6AC3DB" />
                            <path d="M35.4634 3.15234L37.5828 5.99572L37.203 6.05798L35.4634 3.63489V3.15234Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.face')}
                        </div>
                    </Tab>
                )

            case 11: // background
                return (
                    <Tab>
                        <svg width="50" height="50" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} transform={'scale(1.3), translate(-180,-180)'}>
                                <circle
                                    transform="rotate(-67.611 302.868 305.072)"
                                    cx={302.85}
                                    cy={305.06}
                                    r={7.87}
                                />
                                <circle
                                    transform="rotate(-22.089 314.827 251.021)"
                                    cx={314.85}
                                    cy={251.05}
                                    r={7.87}
                                />
                                <circle
                                    transform="rotate(-22.12 267.15 207.021)"
                                    cx={267.17}
                                    cy={207.05}
                                    r={7.87}
                                />
                                <circle
                                    transform="rotate(-45.001 201.3 234.484)"
                                    cx={201.3}
                                    cy={234.48}
                                    r={7.87}
                                />
                                <circle
                                    transform="rotate(-67.5 198.057 286.055)"
                                    cx={198.06}
                                    cy={286.06}
                                    r={7.87}
                                />
                            </g>
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.background')}
                        </div>
                    </Tab>
                )
        }
    }
    renderAvatarHair = () => {

        return (
            <div>
                <div class="colorPaletteBtn">
                    {
                        this.state.hairColors.map((item, index) => {

                            return (<AvatarSkinColorBtn
                                color={item}
                                selected={this.state.selectedHairColor == index}
                                onColorSelected={() => {
                                    this.setState({
                                        selectedHairColor: index,
                                        selectedHairColor2: index
                                    });
                                }}
                            />)
                        })

                    }
                </div>
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.hairMaleItems.map((item, index) => {
                            return (
                                <HumanHair
                                    type="button"
                                    x={-5}
                                    y={0}
                                    z={0.7}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedHair, index).points}
                                    locked={this.getLockedItemData(this.state.lockedHair, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedHairIndex}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedHair, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedHair, index).points,
                                                AssetType: "Hair",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanHair
                                                    type="button"
                                                    x={-5}
                                                    y={0}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedHairIndex}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />

                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedHairIndex: item,
                                            selectedHairIndex2:item
                                        });

                                    }}
                                />

                            );
                        }) :

                        this.state.hairFemaleItems.map((item, index) => {
                            return (
                                <HumanHair
                                    type="button"
                                    x={-5}
                                    y={0}
                                    z={0.7}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedHair, index).points}
                                    locked={this.getLockedItemData(this.state.lockedHair, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedHairIndex}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedHair, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedHair, index).points,
                                                AssetType: "Hair",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanHair
                                                    type="button"
                                                    x={-5}
                                                    y={0}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedHairIndex}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />

                                            })
                                        }
                                        else this.setState({
                                            selectedHairIndex: item,
                                            selectedHairIndex2:item
                                        });

                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )

    }

    renderAvatarSkin = () => {

        return (
            <div>
                <div class="colorPaletteBtn">
                    {
                        this.state.skinColors.map((item, index) => {

                            return (<AvatarSkinColorBtn
                                color={item}
                                selected={this.state.selectedSkinColorIndex == index}
                                onColorSelected={() => {
                                    this.setState({
                                        selectedSkinColorIndex: index,

                                    });
                                }}
                            />)
                        })

                    }
                </div>
                {/* <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.bodyMaleItems.map((item, index) => {
                            return (
                                <HumanBody
                                    type="button"
                                    x={-5}
                                    y={-65}
                                    z={0.7}
                                    index={index}
                                    targetId={item}

                                    points={this.getLockedItemData(this.state.lockedDresses, index).points}
                                    locked={this.getLockedItemData(this.state.lockedDresses, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBodyIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedDresses, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedDresses, index).points,
                                                //points: 1,
                                                selectedBodyIndex2: item,
                                                AssetType: "Body",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanBody
                                                    type="button"
                                                    x={-5}
                                                    y={-65}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}
                                                    OnItemSelected={() => {

                                                    }}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBodyIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBodyIndex: item,
                                            selectedBodyIndex2: item
                                        });
                                    }}
                                />
                            );
                        }) :
                        this.state.bodyFemaleItems.map((item, index) => {
                            return (
                                <HumanBody
                                    type="button"
                                    x={-5}
                                    y={-65}
                                    z={0.7}
                                    index={index}
                                    targetId={item}

                                    points={this.getLockedItemData(this.state.lockedDresses, index).points}
                                    locked={this.getLockedItemData(this.state.lockedDresses, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBodyIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedDresses, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedDresses, index).points,
                                                AssetType: "Body",
                                                lockedindex: index,
                                                selectedBodyIndex2: item,
                                                lockedItemSvg: <HumanBody
                                                    type="button"
                                                    x={-5}
                                                    y={-65}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBodyIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBodyIndex: item,
                                            selectedBodyIndex2: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div> */}
            </div>
        )
    }
    renderAvatarBody = () => {

        return (
            <div>
                {/* <div class="colorPaletteBtn">
                    {
                        this.state.skinColors.map((item, index) => {

                            return (<AvatarSkinColorBtn
                                color={item}
                                selected={this.state.selectedSkinColorIndex == index}
                                onColorSelected={() => {
                                    this.setState({
                                        selectedSkinColorIndex: index,

                                    });
                                }}
                            />)
                        })

                    }
                </div> */}
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.bodyMaleItems.map((item, index) => {
                            return (
                                <HumanBody
                                    type="button"
                                    x={-5}
                                    y={-65}
                                    z={0.7}
                                    index={index}
                                    targetId={item}

                                    points={this.getLockedItemData(this.state.lockedDresses, index).points}
                                    locked={this.getLockedItemData(this.state.lockedDresses, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBodyIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedDresses, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedDresses, index).points,
                                                //points: 1,
                                                selectedBodyIndex2: item,
                                                AssetType: "Body",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanBody
                                                    type="button"
                                                    x={-5}
                                                    y={-65}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}
                                                    OnItemSelected={() => {

                                                    }}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBodyIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBodyIndex: item,
                                            selectedBodyIndex2: item
                                        });
                                    }}
                                />
                            );
                        }) :
                        this.state.bodyFemaleItems.map((item, index) => {
                            return (
                                <HumanBody
                                    type="button"
                                    x={-5}
                                    y={-65}
                                    z={0.7}
                                    index={index}
                                    targetId={item}

                                    points={this.getLockedItemData(this.state.lockedDresses, index).points}
                                    locked={this.getLockedItemData(this.state.lockedDresses, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBodyIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedDresses, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedDresses, index).points,
                                                AssetType: "Body",
                                                lockedindex: index,
                                                selectedBodyIndex2: item,
                                                lockedItemSvg: <HumanBody
                                                    type="button"
                                                    x={-5}
                                                    y={-65}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBodyIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBodyIndex: item,
                                            selectedBodyIndex2: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    getLockedItemData = (items, index) => {
        return {
            locked: items.findIndex(lockedItem => index == lockedItem.index) != -1 ? true : false,
            points: items.findIndex(lockedItem => index == lockedItem.index) != -1 ? items[items.findIndex(lockedItem => index == lockedItem.index)].points : null
        }
    }
    renderAvatarEyes = () => {

        return (
            <div>
                <div class="colorPaletteBtn">
                    {
                        this.state.eyeColors.map((item, index) => {

                            return (<AvatarSkinColorBtn
                                color={item}
                                selected={this.state.selectedEyeColor == index}
                                onColorSelected={() => {
                                    this.setState({
                                        selectedEyeColor: index,
                                    });
                                }}
                            />)
                        })

                    }
                </div>
                <div class="buttonList">
                    {
                        this.state.eyeItems.map((item, index) => {
                            return (
                                <HumanEyes
                                    type="button"
                                    x={-45}
                                    y={-35}
                                    z={1.5}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedEyes, index).points}
                                    locked={this.getLockedItemData(this.state.lockedEyes, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedEyeIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedEyes, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedEyes, index).points,
                                                AssetType: "Eye",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanEyes
                                                    type="button"
                                                    x={-45}
                                                    y={-35}
                                                    z={1.5}
                                                    index={index}
                                                    targetId={item}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedEyeIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]}
                                                />
                                            })
                                        }
                                        else this.setState({
                                            selectedEyeIndex: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarMouth = () => {

        return (
            <div>
                <div class="buttonList">
                    {
                        this.state.mouthItems.map((item, index) => {
                            return (
                                <HumanMouth
                                    type="button"
                                    x={-43}
                                    y={-50}
                                    z={1.5}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedMouth, index).points}
                                    locked={this.getLockedItemData(this.state.lockedMouth, index).locked}

                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedMouthIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedMouth, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedMouth, index).points,
                                                AssetType: "Mouth",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanMouth
                                                    type="button"
                                                    x={-43}
                                                    y={-50}
                                                    z={1.5}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedMouthIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedMouthIndex: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    getRandomNumber = (length, lockedItems) => {
        let rand = 0;
        let freeItems = []
        for (let index = 0; index < length; index++) {
            if (lockedItems.findIndex(item => item.index == index) == -1) {
                freeItems.push(index)
            }
        }
        console.log('freeeeee', freeItems)
        rand = (Math.floor(Math.random() * freeItems.length));

        console.log('freeItems[rand]', freeItems[rand])
        return freeItems[rand];
    }
    generateRandomAvatar = () => {
        clearInterval(this.generateInterval);
        this.generateInterval = setInterval(() => {
            this.setState({
                selectedSkinColorIndex: Math.floor(Math.random() * this.state.skinColors.length - 1) + 1,
                selectedEyeIndex: this.getRandomNumber(26, this.state.lockedEyes), //(Math.floor(Math.random() * 26) + 1)
                selectedNoseIndex: this.getRandomNumber(6, this.state.lockedNoses),
                selectedMouthIndex: this.getRandomNumber(27, this.state.lockedMouth),
                selectedHairIndex: this.getRandomNumber(12, this.state.lockedHair),
                selectedEyeBrowsIndex: this.getRandomNumber(12, this.state.lockedEyeBrows),
                selectedEyeColor: Math.floor(Math.random() * 5) + 1,
                selectedHairColor: Math.floor(Math.random() * 5) + 1,
                selectedEyeBrowsColor: Math.floor(Math.random() * 5) + 1,
                selectedBottomIndex: this.getRandomNumber(10, this.state.lockedBottoms),
                selectedShirtIndex: this.getRandomNumber(15, this.state.lockedTops),
                selectedFaceAccessoryIndex: 0,
                selectedHeadAccessoryIndex: this.getRandomNumber(12, this.state.lockedHeadAcc),
                selectedBodyIndex: this.getRandomNumber(GetBodyOptionsLength(this.props.loggedInUser.userData.gender), this.state.lockedDresses),
                selectedBodyIndex2: this.getRandomNumber(GetBodyOptionsLength(this.props.loggedInUser.userData.gender), this.state.lockedDresses),

                selectedBackgroundIndex: this.getRandomNumber(8, this.state.lockedBackgrounds),
            });
        }, 1)

        setTimeout(() => {

            clearInterval(this.generateInterval);
            // this.screenShotRef.takeScreenShot()
        }, 100);

    }
    renderAvatarNose = () => {

        return (
            <div>
                <div class="buttonList">
                    {
                        this.state.noseItems.map((item, index) => {
                            return (
                                <HumanNose
                                    type="button"
                                    x={-47}
                                    y={-45}
                                    z={1.7}
                                    index={index}
                                    targetId={item}
                                    innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]}
                                    points={this.getLockedItemData(this.state.lockedNoses, index).points}
                                    locked={this.getLockedItemData(this.state.lockedNoses, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedNoseIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedNoses, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedNoses, index).points,
                                                AssetType: "Nose",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanNose
                                                    type="button"
                                                    x={-47}
                                                    y={-45}
                                                    z={1.7}
                                                    index={index}
                                                    targetId={item}
                                                    innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]}
                                                    points={this.getLockedItemData(this.state.lockedNoses, index).points}
                                                    locked={this.getLockedItemData(this.state.lockedNoses, index).locked}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedNoseIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedNoseIndex: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarEyeBrows = () => {

        return (
            <div>
                <div class="colorPaletteBtn">
                    {
                        this.state.hairColors.map((item, index) => {

                            return (<AvatarSkinColorBtn
                                color={item}
                                selected={this.state.selectedEyeBrowsColor == index}
                                onColorSelected={() => {
                                    this.setState({
                                        selectedEyeBrowsColor: index,
                                    });
                                }}
                            />)
                        })

                    }
                </div>
                <div class="buttonList">
                    {
                        this.state.eyeBrowsItems.map((item, index) => {
                            return (
                                <HumanEyeBrows
                                    type="button"
                                    x={-43}
                                    y={-35}
                                    z={1.5}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedEyeBrows, index).points}
                                    locked={this.getLockedItemData(this.state.lockedEyeBrows, index).locked}
                                    activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedEyeBrowsIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedEyeBrows, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedEyeBrows, index).points,
                                                AssetType: "Eyebrows",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanEyeBrows
                                                    type="button"
                                                    x={-43}
                                                    y={-35}
                                                    z={1.5}
                                                    index={index}
                                                    targetId={item}
                                                    activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedEyeBrowsIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />

                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedEyeBrowsIndex: item
                                        });

                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarFaceAccessories = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.faceItems.map((item, index) => {
                            return (
                                <HumanFaceAccessoryBack
                                    type="button"
                                    x={-25}
                                    y={-25}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedFaceAcc, index).points}
                                    locked={this.getLockedItemData(this.state.lockedFaceAcc, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedFaceAccessoryIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={(isFrontFace) => {
                                        if (this.getLockedItemData(this.state.lockedFaceAcc, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedFaceAcc, index).points,
                                                AssetType: "HumanFaceAccessoryBack",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanFaceAccessoryBack
                                                    type="button"
                                                    x={- 25
                                                    }
                                                    y={- 25}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedFaceAccessoryIndex
                                                    }
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedFaceAccessoryIndex: item,
                                            FrontFaceAccessoryActive: isFrontFace
                                        });
                                    }}
                                />
                            );
                        }) :
                        this.state.faceItems.map((item, index) => {
                            return (
                                <HumanFaceAccessoryBack
                                    type="button"
                                    x={-25}
                                    y={-25}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedFaceAcc, index).points}
                                    locked={this.getLockedItemData(this.state.lockedFaceAcc, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedFaceAccessoryIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={(isFrontFace) => {
                                        if (this.getLockedItemData(this.state.lockedFaceAcc, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedFaceAcc, index).points,
                                                AssetType: "HumanFaceAccessoryBack",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanFaceAccessoryBack
                                                    type="button"
                                                    x={- 25
                                                    }
                                                    y={- 25}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedFaceAccessoryIndex
                                                    }
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedFaceAccessoryIndex: item,
                                            FrontFaceAccessoryActive: isFrontFace
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarHeadAccessories = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.headItems.map((item, index) => {
                            return (
                                <HumanHeadAccessory
                                    type="button"
                                    x={-5}
                                    y={15}
                                    z={0.7}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedHeadAcc, index).points}
                                    locked={this.getLockedItemData(this.state.lockedHeadAcc, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedHeadAccessoryIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedHeadAcc, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedHeadAcc, index).points,
                                                AssetType: "HumanHeadAccessory",
                                                lockedindex: index,

                                                lockedItemSvg: <HumanHeadAccessory
                                                    type="button"
                                                    x={-5}
                                                    y={15}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedHeadAccessoryIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedHeadAccessoryIndex: item,

                                        });

                                    }}
                                />
                            );
                        }) :
                        this.state.headItems.map((item, index) => {
                            return (
                                <HumanHeadAccessory
                                    type="button"
                                    x={-5}
                                    y={15}
                                    z={0.7}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedHeadAcc, index).points}
                                    locked={this.getLockedItemData(this.state.lockedHeadAcc, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedHeadAccessoryIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedHeadAcc, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedHeadAcc, index).points,
                                                AssetType: "HumanHeadAccessory",
                                                lockedindex: index,

                                                lockedItemSvg: <HumanHeadAccessory
                                                    type="button"
                                                    x={-5}
                                                    y={15}
                                                    z={0.7}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedHeadAccessoryIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}

                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedHeadAccessoryIndex: item,

                                        });

                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarPants = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.pantsItems.map((item, index) => {
                            return (
                                <HumanPants
                                    type="button"
                                    x={-25}
                                    y={-110}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedBottoms, index).points}
                                    locked={this.getLockedItemData(this.state.lockedBottoms, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBottomIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        console.log("checklock",this.getLockedItemData(this.state.lockedBottoms, index).locked)

                                        if (this.getLockedItemData(this.state.lockedBottoms, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedBottoms, index).points,
                                                AssetType: "Pants",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanPants
                                                    type="button"
                                                    x={-25}
                                                    y={-110}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBottomIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBottomIndex: item,
                                            selectedBodyIndex: 0,
                                            selectedBodyIndex2: 0


                                        });
                                    }}
                                />
                            );
                        }) :
                        this.state.pantsItems.map((item, index) => {
                            return (
                                <HumanPants
                                    type="button"
                                    x={-25}
                                    y={-110}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedBottoms, index).points}
                                    locked={this.getLockedItemData(this.state.lockedBottoms, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBottomIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        console.log("checklock",this.getLockedItemData(this.state.lockedBottoms, index).locked)

                                        if (this.getLockedItemData(this.state.lockedBottoms, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedBottoms, index).points,
                                                AssetType: "Pants",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanPants
                                                    type="button"
                                                    x={-25}
                                                    y={-110}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBottomIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBottomIndex: item,
                                            selectedBodyIndex: 0,
                                            selectedBodyIndex2: 0

                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarShirts = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.activeGender == 'm' ?
                        this.state.shirtItems.map((item, index) => {
                            return (
                                <HumanShirt
                                    type="button"
                                    x={-25}
                                    y={-75}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedTops, index).points}
                                    locked={this.getLockedItemData(this.state.lockedTops, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedShirtIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedTops, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedTops, index).points,
                                                AssetType: "shirt",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanShirt
                                                    type="button"
                                                    x={-25}
                                                    y={-75}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}
                                                    points={this.getLockedItemData(this.state.lockedTops, index).points}
                                                    locked={this.getLockedItemData(this.state.lockedTops, index).locked}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedShirtIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedShirtIndex: item,
                                            selectedBodyIndex: 0,
                                            selectedBodyIndex2: 0

                                        });
                                    }}
                                />
                            );
                        }) :
                        this.state.shirtItems.map((item, index) => {
                            return (
                                <HumanShirt
                                    type="button"
                                    x={-25}
                                    y={-75}
                                    z={1}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedTops, index).points}
                                    locked={this.getLockedItemData(this.state.lockedTops, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedShirtIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedTops, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedTops, index).points,
                                                AssetType: "shirt",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanShirt
                                                    type="button"
                                                    x={-25}
                                                    y={-75}
                                                    z={1}
                                                    index={index}
                                                    targetId={item}
                                                    points={this.getLockedItemData(this.state.lockedTops, index).points}
                                                    locked={this.getLockedItemData(this.state.lockedTops, index).locked}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedShirtIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeHairColor={this.state.hairColors[this.state.selectedHairColor]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedShirtIndex: item,
                                            selectedBodyIndex: 0,
                                            selectedBodyIndex2: 0

                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    renderAvatarBackground = () => {

        return (
            <div>
                <div class="buttonList">
                    {
                        this.state.noseItems.map((item, index) => {
                            return (
                                <HumanBackground
                                    type="button"
                                    x={10}
                                    y={25}
                                    z={0.6}
                                    index={index}
                                    targetId={item}
                                    points={this.getLockedItemData(this.state.lockedBackgrounds, index).points}
                                    locked={this.getLockedItemData(this.state.lockedBackgrounds, index).locked}
                                    activeGender={this.state.activeGender}
                                    selected={item == this.state.selectedBackgroundIndex}
                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                    OnItemSelected={() => {
                                        if (this.getLockedItemData(this.state.lockedBackgrounds, index).locked) {
                                            this.setState({
                                                open: true,
                                                points: this.getLockedItemData(this.state.lockedBackgrounds, index).points,
                                                AssetType: "Background",
                                                lockedindex: index,
                                                lockedItemSvg: <HumanBackground
                                                    type="button"
                                                    x={10}
                                                    y={25}
                                                    z={0.6}
                                                    index={index}
                                                    targetId={item}
                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedBackgroundIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                />
                                            })
                                            console.log("locked")
                                        }
                                        else this.setState({
                                            selectedBackgroundIndex: item
                                        });
                                    }}
                                />
                            );
                        })
                    }
                </div>
            </div>
        )
    }
    saveAvatar = async () => {
        let finalAvatar = await window.btoa(new XMLSerializer().serializeToString(document.getElementById("final-avatar")))
        let finalAvatarHead = await window.btoa(new XMLSerializer().serializeToString(document.getElementById("final-avatar-head")))
        this.setState({
            finalImage: 'data:image/svg+xml;base64,' + finalAvatar,
            finalImageHead: 'data:image/svg+xml;base64,' + finalAvatarHead
        })
        setTimeout(() => {
            var canvas = document.createElement('canvas');
            canvas.width = 400; // or 'width' if you want a special/scaled size
            canvas.height = 554.31; // or 'height' if you want a special/scaled size
            canvas.getContext('2d').drawImage(document.getElementById('final-image'), 0, 0);
            let finalav = canvas.toDataURL('image/png')

            var canvasHead = document.createElement('canvas');
            canvasHead.width = 100; // or 'width' if you want a special/scaled size
            canvasHead.height = 100; // or 'height' if you want a special/scaled size
            canvasHead.getContext('2d').drawImage(document.getElementById('final-image-head'), 0, 0);
            let finalavHead = canvasHead.toDataURL('image/png')
            this.uploadAvatar(finalav, finalavHead)
        }, 250);

    }
    uploadAvatar = async (fullScreenShot, headScreenShot) => {

        if (this.state.saving == false) {


            let avatar = {
                selectedSkinColorIndex: this.state.selectedSkinColorIndex,
                selectedEyeIndex: this.state.selectedEyeIndex,
                selectedNoseIndex: this.state.selectedNoseIndex,
                selectedMouthIndex: this.state.selectedMouthIndex,
                selectedHairIndex: this.state.selectedHairIndex,
                selectedEyeBrowsIndex: this.state.selectedEyeBrowsIndex,
                FrontFaceAccessoryActive: this.state.FrontFaceAccessoryActive,
                backHairActive: this.state.backHairActive,
                selectedEyeColor: this.state.selectedEyeColor,
                selectedHairColor: this.state.selectedHairColor,
                selectedEyeBrowsColor: this.state.selectedEyeBrowsColor,
                selectedBottomIndex: this.state.selectedBottomIndex,
                selectedShirtIndex: this.state.selectedShirtIndex,
                selectedFaceAccessoryIndex: this.state.selectedFaceAccessoryIndex,
                selectedHeadAccessoryIndex: this.state.selectedHeadAccessoryIndex,
                selectedBodyIndex: this.state.selectedBodyIndex,
                selectedBodyIndex2: this.state.selectedBodyIndex2,
                selectedBackgroundIndex: this.state.selectedBackgroundIndex,
                avatarType: 'human'
            }
            this.setState({
                saving: true
            })
            let saveAvatar = await saveAvatarData(fullScreenShot, headScreenShot, avatar, this.props.loggedInUser.userData._id)
            this.setState({
                saving: false
            })
            const avatarLinkBody = saveAvatar.avatarLinkBody;
            // console.log('this.props.',this.props)
            console.log(saveAvatar)
            router.push("/AvatarScreens/AvatarConfirmation")
            this.props.dispatch({ type: "CHANGE_AVATAR", avatarLinkBody })



            // this.props.navigation.popToTop()
        }
    }
    onAfterRedeem = (redeem) => {
        console.log('redeeeeeeeeeeeem', redeem)
        if (redeem.message == 'success') {
            this.getLockedItems()
        }

    }
    getLockedItems = async () => {
        let lockedAssets = await getLockedAssets(this.props.loggedInUser.userData._id, this.props.loggedInUser.userData.gender, 'human')
        this.setState({
            lockedDresses: lockedAssets.lockItembody.items,
            lockedEyes: lockedAssets.lockItemeyes.items,
            lockedEyeBrows: lockedAssets.lockItemeyebrows.items,
            lockedFaceAcc: lockedAssets.lockItemglasses.items,
            lockedHair: lockedAssets.lockItemhair.items,
            lockedHeadAcc: lockedAssets.lockItemhat.items,
            lockedMouth: lockedAssets.lockItemmouth.items,
            lockedTops: lockedAssets.lockItemtshirt.items,
            lockedBottoms: lockedAssets.lockItempant.items,
            lockedBackgrounds: lockedAssets.lockItembackgrounds.items,
        })
    }
    getPreviewAvatar2 = () => {

        console.log("AssetType",this.state.AssetType);
        console.log("AssetTypeIndex",this.state.lockedindex);

        let AssetType = this.state.AssetType;
        AssetType = AssetType.trim();

        let selectedBodyIndex = this.state.selectedBodyIndex;

        if(AssetType === "shirt" || AssetType === "Pants") {
            selectedBodyIndex = 0;
        }

        let FrontFaceAccessoryActive = true;
        if(AssetType === "HumanFaceAccessoryBack") {
            FrontFaceAccessoryActive = false;
        }
        
        return(                <div className="finalAvatar" style={{height:"55vh",marginTop:0,marginBottom:0}} >
        <svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

            <g transform="translate(0, 15.01)">
                <HumanBackground targetId={this.state.selectedBackgroundIndex} />
                <g id='bodyParts'>
                    {
                        selectedBodyIndex == 0
                            ?
                            <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.AssetType === "Body"?this.state.lockedindex:selectedBodyIndex} />
                            :
                            null
                    }
                    <HumanFace activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} />
                    <HumanNose targetId={this.state.selectedNoseIndex} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                    <HumanMouth targetId={this.state.AssetType === "Mouth"?this.state.lockedindex:this.state.selectedMouthIndex} />
                    {!FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={AssetType === "HumanFaceAccessoryBack"?this.state.lockedindex:this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                    {this.state.backHairActive ? <HumanHairBack targetId={this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                    <HumanEars activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                    <HumanEyes targetId={this.state.AssetType === "Eye"?this.state.lockedindex:this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
                    <HumanEyeBrows targetId={this.state.selectedEyeBrowsIndex} activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]} />
                    {FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                    {!this.state.backHairActive ? <HumanHair targetId={this.state.AssetType === "Hair"?this.state.lockedindex:this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                </g>

                <HumanHeadAccessory targetId={AssetType === "HumanHeadAccessory"?this.state.lockedindex:this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} />
                {
                    selectedBodyIndex == 0
                        ?
                        <g id='bodyClothes'>
                            <HumanPants targetId={this.state.AssetType === "Pants"?this.state.lockedindex:this.state.selectedBottomIndex} activeGender={this.state.activeGender} />
                            <HumanShirt targetId={AssetType === "shirt"?this.state.lockedindex:this.state.selectedShirtIndex} activeGender={this.state.activeGender} />
                        </g>
                        :
                        <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.AssetType === "Body"?this.state.lockedindex:selectedBodyIndex} />
                }
            </g>

        </svg>
    </div>)
    }
    getPreviewAvatar = () => {
        return( <div className="finalAvatar" style={{height:"auto"}} >
        <svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="25vh" width="100%">

            <g transform="translate(0, 15.01)">
                <HumanBackground targetId={this.state.selectedBackgroundIndex2} />
                <g id='bodyParts'>
                    {
                        this.state.selectedBodyIndex2 == 0
                            ?
                            <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex2} />
                            :
                            null
                    }
                    <HumanFace activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} />
                    <HumanNose targetId={this.state.selectedNoseIndex2} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                    <HumanMouth targetId={this.state.selectedMouthIndex2} />
                    {!this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor2]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                    {this.state.backHairActive ? <HumanHairBack targetId={this.state.selectedHairIndex2} activeHairColor={this.state.hairColors[this.state.selectedHairColor2]} activeGender={this.state.activeGender} /> : null}
                    <HumanEars activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                    <HumanEyes targetId={this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
                    <HumanEyeBrows targetId={this.state.selectedEyeBrowsIndex} activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]} />
                    {this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                    {!this.state.backHairActive ? <HumanHair targetId={this.state.selectedHairIndex2} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                </g>

                <HumanHeadAccessory targetId={this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} />
                {
                    this.state.selectedBodyIndex2 == 0
                        ?
                        <g id='bodyClothes'>
                            <HumanPants targetId={this.state.selectedBottomIndex2} activeGender={this.state.activeGender} />
                            <HumanShirt targetId={this.state.selectedShirtIndex2} activeGender={this.state.activeGender} />
                        </g>
                        :
                        <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex2} />
                }
            </g>

        </svg>
    </div>);
    }

    render() {
        return (
            <div>
                <RedeemAvatarModal
                    lockedItemSvg={this.state.lockedItemSvg}
                    index={this.state.lockedindex}
                    open={this.state.open}
                    Asseststype={this.state.AssetType}
                    points={this.state.points}
                    onAfterRedeem={this.onAfterRedeem}
                    getPreviewAvatar={this.getPreviewAvatar2}
                    type={'human'}
                    setOpen={() => {
                        this.setState({
                            open: !this.state.open
                        })
                    }} />

                <div
                    className="ltrDir"
                    style={{
                        display: 'flex',

                    }}>
                    <div className="save" onClick={this.saveAvatar}>
                        {i18next.language == "ar" ?
                            <span>حفظ
                            </span>

                            :
                            <span>Save</span>
                        }

                    </div>

                    <div className="save" onClick={this.generateRandomAvatar}>
                        <div className="icon-random"></div>

                    </div>
                </div>
                <img src={this.state.finalImage} id="final-image" />
                <img src={this.state.finalImageHead} id="final-image-head" />
                <ScreenshotAvatar {...this.state} />
                <div className="finalAvatar" >
                    <svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

                        <g transform="translate(0, 15.01)">
                            <HumanBackground targetId={this.state.selectedBackgroundIndex} />
                            <g id='bodyParts'>
                                {
                                    this.state.selectedBodyIndex == 0
                                        ?
                                        <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex} />
                                        :
                                        null
                                }
                                <HumanFace activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} />
                                <HumanNose targetId={this.state.selectedNoseIndex} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                                <HumanMouth targetId={this.state.selectedMouthIndex} />
                                {!this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                                {this.state.backHairActive ? <HumanHairBack targetId={this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                                <HumanEars activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                                <HumanEyes targetId={this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
                                <HumanEyeBrows targetId={this.state.selectedEyeBrowsIndex} activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]} />
                                {this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                                {!this.state.backHairActive ? <HumanHair targetId={this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                            </g>

                            <HumanHeadAccessory targetId={this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} />
                            {
                                this.state.selectedBodyIndex == 0
                                    ?
                                    <g id='bodyClothes'>
                                        <HumanPants targetId={this.state.selectedBottomIndex} activeGender={this.state.activeGender} />
                                        <HumanShirt targetId={this.state.selectedShirtIndex} activeGender={this.state.activeGender} />
                                    </g>
                                    :
                                    <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex} />
                            }
                        </g>

                    </svg>
                </div>


                {/* <div className="finalAvatar" >
                    <svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

                        <g transform="translate(0, 15.01)">
                            <HumanBackground targetId={this.state.selectedBackgroundIndex2} />
                            <g id='bodyParts'>
                                {
                                    this.state.selectedBodyIndex2 == 0
                                        ?
                                        <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex2} />
                                        :
                                        null
                                }
                                <HumanFace activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} />
                                <HumanNose targetId={this.state.selectedNoseIndex2} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                                <HumanMouth targetId={this.state.selectedMouthIndex2} />
                                {!this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                                {this.state.backHairActive ? <HumanHairBack targetId={this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                                <HumanEars activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} innerEarColor={this.state.innerEarSkinColors[this.state.selectedSkinColorIndex]} />
                                <HumanEyes targetId={this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
                                <HumanEyeBrows targetId={this.state.selectedEyeBrowsIndex} activeHairColor={this.state.hairColors[this.state.selectedEyeBrowsColor]} />
                                {this.state.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} targetId={this.state.selectedFaceAccessoryIndex} activeGender={this.state.activeGender} /> : null}
                                {!this.state.backHairActive ? <HumanHair targetId={this.state.selectedHairIndex} activeHairColor={this.state.hairColors[this.state.selectedHairColor]} activeGender={this.state.activeGender} /> : null}
                            </g>

                            <HumanHeadAccessory targetId={this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} />
                            {
                                this.state.selectedBodyIndex2 == 0
                                    ?
                                    <g id='bodyClothes'>
                                        <HumanPants targetId={this.state.selectedBottomIndex2} activeGender={this.state.activeGender} />
                                        <HumanShirt targetId={this.state.selectedShirtIndex2} activeGender={this.state.activeGender} />
                                    </g>
                                    :
                                    <HumanBody activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex2]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex2} />
                            }
                        </g>

                    </svg>
                </div> */}

                <Tabs selectedTabClassName="active-tab" selectedIndex={this.state.tabIndex} onSelect={this.handleSelect} className={'rtlDir'} >
                    <div className={`flex-wrapper-row  sticky-top `}>

                        <TabList activeTabClassName="ActiveTab" className="avatar-tabs sticky-top">

                            {
                                this.state.tabIcons.map((item, index) => {
                                    return this.renderTabIcon(item)
                                })
                            }

                        </TabList>
                    </div>

                        <TabPanel>

    {
        this.renderAvatarSkin()
    }

    </TabPanel>
                    <TabPanel>
                        {
                            //this.renderAvatarEyes()
                            this.renderAvatarHair()
                        }
                    </TabPanel>


                    <TabPanel>
                        {
                            //this.renderAvatarHair()
                            this.renderAvatarEyes()
                        }
                    </TabPanel>

                    <TabPanel>
                        {
                            this.renderAvatarMouth()
                        }
                    </TabPanel>
                    
                    <TabPanel>
                        {
                            this.renderAvatarEyeBrows()
                        }
                    </TabPanel>
        
                    <TabPanel>
                        {
                            this.renderAvatarNose()
                        }
                    </TabPanel>

                    <TabPanel>
                        {
                            this.renderAvatarShirts()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarPants()
                        }
                    </TabPanel>

                    
                    <TabPanel>

                        {
                            this.renderAvatarBody()
                        }

                    </TabPanel>
                    

                   
                    <TabPanel>
                        {
                            this.renderAvatarHeadAccessories()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarFaceAccessories()
                        }
                    </TabPanel>                   
                    <TabPanel>
                        {
                            this.renderAvatarBackground()
                        }
                    </TabPanel>

                </Tabs>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.mainReducer.loggedInUser,
})

HumanAvatar.layout = "In";

export default connect(mapStateToProps)(HumanAvatar);