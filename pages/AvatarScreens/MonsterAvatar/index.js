import React, { Component } from 'react';
import M_body from './M_body';
import M_hands from './M_hands';
import M_legs from './M_legs';
import M_head from './M_head';
import M_mouth from './M_mouth';
import M_eyes from './M_eyes';
import M_nose from './M_nose';
import M_hats from './M_hats';
import M_face from './M_face';
import { GetBackgroundOptionsLength, GetBodyOptionsLength, GetBottomsOptionsLength, GetEyeBrowsOptionsLength, GetEyesOptionsLength, GetFaceOptionsLength, GetHairOptionsLength, GetHeadOptionsLength, GetMiddleOptionsLength, GetMouthOptionsLength, GetNoseOptionsLength, SetActiveAvatarType } from '../AvatarGlobalProps';
import { getAvatarData, getLockedAssets, saveAvatarData } from '../../../src/utils/apis';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import AvatarSkinColorBtn from '../AvatarSkinColorBtn';
import ScreenshotMonsterAvatar from './ScreenshotMonsterAvatar';
import router from 'next/router';
import RedeemAvatarModal from '../../../components/redeemAvatarModal';
import i18next from 'i18next';

class MonsterAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            points: 0,
            type: "Monster",
            AssetType: "",
            lockedindex: 0,
            lockedItemSvg: null,

            // lockedEyes: [36, 34, 17, 28, 10, 42, 8, 38, 22, 2],
            lockedEyes: [{
                index: 36,
                points: 100
            },
            {
                index: 34,
                points: 100
            }

            ],

            lockedEyeBrows: [],
            lockedMouth: [30, 29, 28, 27, 26, 24, 18, 3],
            lockedNoses: [],
            lockedHair: [3, 2],
            lockedHeadAcc: [5, 4, 2, 0],
            lockedFaceAcc: [1, 2, 3, 4, 6],
            lockedLegs: [0, 2, 5, 6],
            lockedHands: [],
            lockedDresses: [1, 2, 3, 7],

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
                '#ffd216',
                '#59ECFC',
                '#BFEF2B',
                '#FF7C24',
                '#EF2240',
                '#EDA1FF',
                '#FF66AC',
            ],
            bodyPartsSkinColor: [
                '#CFA500',
                '#00C2E2',
                '#9DCE02',
                '#B9580E',
                '#C60521',
                '#C74CE5',
                '#DD1F64',

            ],
            headSkinColor: [
                '#FFF294',
                '#C0FCFF',
                '#E6FF99',
                '#FFAA71',
                '#FF7B8E',
                '#FECFFF',
                '#FFB3DF',
            ],
            innerEarSkinColors: [
                '#efaa7b',
                '#ea9671',
                '#d17154',
                '#99402b',
                '#490b07'
            ],
            eyeColors: [
                '#30120d',
                '#b55230',
                '#5b290d',
                '#94b74f',
                '#7ccbf7'
            ],
            hairColors: [
                '#30120d',
                '#ffdba1',
                '#ce5119',
                '#9e532e',
                '#823e29',
                '#422019'
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
            selectedSkinColorIndex: 0,
            selectedEyeIndex: 0,
            selectedNoseIndex: 0,
            selectedMouthIndex: 0,
            selectedHairIndex: 0,
            selectedEyeBrowsIndex: 0,
            FrontFaceAccessoryActive: true,
            backHairActive: false,
            activeGender: 'f',
            selectedEyeColor: 0,
            selectedHairColor: 0,
            selectedEyeBrowsColor: 0,
            selectedBottomIndex: 0,
            selectedShirtIndex: 0,
            selectedFaceAccessoryIndex: 0,
            selectedHeadAccessoryIndex: 0,
            selectedBodyIndex: 0,
            selectedBackgroundIndex: 0,
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

            selectedBottomIndex2:0,
            selectedShirtIndex2:0,
            selectedHairIndex2:0,
            selectedSkinColorIndex2:0,
            selectedHeadAccessoryIndex2:0,
            selectedMouthIndex2:0,
            selectedNoseIndex2:0,
            selectedEyeIndex2:0,
            selectedFaceAccessoryIndex2:0,
            activeGender2:0,
            selectedEyeColor2:0,
            selectedBodyIndex2:0

        };
    }

    getPreviewAvatar = () => {
        console.log("AssetType",this.state.AssetType)


        return(<div>


<svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%" style={{height:"55vh"}}>

<g transform="translate(0, 0)">
    <M_legs targetId={this.state.AssetType === "legs"?this.state.lockedindex:this.state.selectedBottomIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_hands targetId={this.state.AssetType === "hands"?this.state.lockedindex:this.state.selectedShirtIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_head targetId={this.state.AssetType === "head"?this.state.lockedindex:this.state.selectedHairIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_body activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.AssetType === "body"?this.state.lockedindex:this.state.selectedBodyIndex} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_hats targetId={this.state.AssetType === "hats"?this.state.lockedindex:this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_mouth targetId={this.state.AssetType === "Mouth"?this.state.lockedindex:this.state.selectedMouthIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_nose targetId={this.state.AssetType === "Nose"?this.state.lockedindex:this.state.selectedNoseIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
    <M_eyes targetId={this.state.AssetType === "Eyes"?this.state.lockedindex:this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
    <M_face targetId={this.state.AssetType === "Face"?this.state.lockedindex:this.state.selectedFaceAccessoryIndex} />
</g>

</svg>
        </div>)
    }
    getLockedItemData = (items, index) => {
        return {
            locked: items.findIndex(lockedItem => index == lockedItem.index) != -1 ? true : false,
            points: items.findIndex(lockedItem => index == lockedItem.index) != -1 ? items[items.findIndex(lockedItem => index == lockedItem.index)].points : null
        }
    }
    getLockedItems = async () => {
        let lockedAssets = await getLockedAssets(this.props.loggedInUser.userData._id, this.props.loggedInUser.userData.gender, 'monster')
        this.setState({
            lockedDresses: lockedAssets.lockItembody.items,
            lockedEyes: lockedAssets.lockItemeyes.items,
            lockedHair: lockedAssets.lockItemhair.items,
            lockedHands: lockedAssets.lockItemhand.items,
            lockedLegs: lockedAssets.lockItemlegs.items,
            lockedMouth: lockedAssets.lockItemmouth.items,
            lockedNoses: lockedAssets.lockItemnose.items,
            lockedHeadAcc: lockedAssets.lockItemhat.items,
            lockedFaceAcc: lockedAssets.lockItemglasses.items
        })
    }
    async componentDidMount() {
        this.getLockedItems()
        clearInterval(this.generateInterval);
        this.getActiveGender();
        this.loadSavedAvatar();
        SetActiveAvatarType('monster');
        this.InitAvatarTabs();
    }
    InitAvatarTabs = () => {
        let tabIcons = [];
        for (let x = 0; x < 9; x++) {
            tabIcons.push(x)
        }

        let hairArr = [];
        for (let x = 0; x < GetHairOptionsLength(); x++) {
            hairArr.push(x);
        }
        let bodyArr = [];
        for (let x = 0; x < GetBodyOptionsLength(); x++) {
            bodyArr.push(x);
        }
        let eyeArr = [];
        for (let x = 0; x < GetEyesOptionsLength(); x++) {
            eyeArr.push(x);
        }

        let mouthArr = [];

        for (let x = 0; x < GetMouthOptionsLength(); x++) {
            mouthArr.push(x);
        }

        let noseArr = [];

        for (let x = 0; x < GetNoseOptionsLength(); x++) {
            noseArr.push(x);
        }
        let eyeBrowsArr = [];

        for (let x = 0; x < GetEyeBrowsOptionsLength(); x++) {
            eyeBrowsArr.push(x);
        }

        let faceArr = [];

        for (let x = 0; x < GetFaceOptionsLength(); x++) {
            faceArr.push(x);
        }

        let headArr = [];

        for (let x = 0; x < GetHeadOptionsLength(); x++) {
            headArr.push(x);
        }

        let pantArr = [];

        for (let x = 0; x < GetBottomsOptionsLength(); x++) {
            pantArr.push(x);
        }

        let shirtArr = [];

        for (let x = 0; x < GetMiddleOptionsLength(); x++) {
            shirtArr.push(x);
        }


        let backgroundArr = [];

        for (let x = 0; x < GetBackgroundOptionsLength(); x++) {
            backgroundArr.push(x);
        }

        this.setState({
            hairMaleItems: hairArr,
            hairFemaleItems: hairArr,

            bodyMaleItems: bodyArr,
            bodyFemaleItems: bodyArr,

            eyeItems: eyeArr,

            mouthItems: mouthArr,
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
                    selectedBottomIndex: 0,
                    selectedBottomIndex2: 0
                });
            }
        });
    }
    loadSavedAvatar = async () => {

        let avatarData = await getAvatarData(this.props.loggedInUser.userData._id)

        if (avatarData.avatarType == 'monster') {
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
                selectedBackgroundIndex: this.state.selectedBackgroundIndex,
                avatarType: 'monster'
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
            case 0: // body  fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} 
                return (
                    <Tab>
                        <svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.62446 25.9601C2.90902 26.3958 0.263444 23.1838 0.0583532 20.0931C-0.172503 16.6145 -0.142616 0.584097 8.64435 0.0151008C17.4303 -0.553895 18.6608 15.1194 18.9772 19.547C19.2926 23.9746 16.3389 25.5254 9.62446 25.9601Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.body')}
                        </div>
                    </Tab>
                )

            case 1: //eyes
                return (
                    <Tab>
                        <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M23.4275 23.571C20.3481 23.571 17.855 21.1043 17.855 18.0595C17.855 15.0146 20.3506 12.548 23.4275 12.548C26.5069 12.548 29 15.0146 29 18.0595C29 21.1043 26.5044 23.571 23.4275 23.571ZM14.9936 11.023C11.9142 11.023 9.42112 8.55635 9.42112 5.51151C9.42112 2.46667 11.9167 0 14.9936 0C18.073 0 20.5661 2.46667 20.5661 5.51151C20.5661 8.55635 18.073 11.023 14.9936 11.023ZM5.57249 23.571C2.49559 23.571 0 21.1043 0 18.0595C0 15.0146 2.49559 12.548 5.57249 12.548C8.64939 12.548 11.145 15.0146 11.145 18.0595C11.1475 21.1043 8.65189 23.571 5.57249 23.571Z" fill="white" />
                            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M23.4275 24.9978C20.3481 24.9978 17.855 22.4983 17.855 19.4156C17.855 16.3329 20.3506 13.8334 23.4275 13.8334C26.5069 13.8334 29 16.3329 29 19.4156C29 22.4983 26.5044 24.9978 23.4275 24.9978ZM14.9936 12.2933C11.9142 12.2933 9.42112 9.79383 9.42112 6.71111C9.42112 3.6284 11.9167 1.12891 14.9936 1.12891C18.073 1.12891 20.5661 3.6284 20.5661 6.71111C20.5686 9.79383 18.073 12.2933 14.9936 12.2933ZM5.57249 24.9978C2.49559 24.9978 0 22.4983 0 19.4181C0 16.3354 2.49559 13.8359 5.57249 13.8359C8.64939 13.8359 11.145 16.3354 11.145 19.4181C11.1475 22.4983 8.65189 24.9978 5.57249 24.9978Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.3523 24.1819C20.3205 24.1819 17.865 21.7051 17.865 18.6527C17.865 15.5978 20.3231 13.1235 23.3523 13.1235C26.3841 13.1235 28.8396 15.6003 28.8396 18.6527C28.8396 21.7051 26.3841 24.1819 23.3523 24.1819ZM15.0487 11.5935C12.0169 11.5935 9.56143 9.11676 9.56143 6.06434C9.56143 3.0094 12.0194 0.535156 15.0487 0.535156C18.078 0.535156 20.536 3.01193 20.536 6.06434C20.536 9.11676 18.0805 11.5935 15.0487 11.5935ZM5.77294 24.1819C2.74115 24.1819 0.285645 21.7051 0.285645 18.6527C0.285645 15.5978 2.74365 13.1235 5.77294 13.1235C8.80474 13.1235 11.2602 15.6003 11.2602 18.6527C11.2602 21.7051 8.80474 24.1819 5.77294 24.1819Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5026 15.7517C23.0842 16.0622 22.2473 16.3425 21.7362 16.6126C21.1799 16.7767 20.8442 16.1758 21.0421 15.3805C21.2601 14.6332 22.0344 14.2141 22.7735 14.4464C23.5302 14.714 23.871 15.3326 23.5026 15.7517ZM12.9465 4.05455C12.8813 4.0899 12.8212 4.11262 12.7661 4.12272C12.7085 4.13282 12.6583 4.13282 12.6082 4.12272C12.5105 4.1 12.4253 4.03688 12.3501 3.93841C12.275 3.83995 12.2098 3.70614 12.1647 3.54708C12.1597 3.52688 12.1547 3.50668 12.1497 3.48649C12.1447 3.46629 12.1397 3.44357 12.1347 3.42337C12.1271 3.38045 12.1196 3.335 12.1146 3.28956C12.1046 3.19866 12.0996 3.1002 12.1046 2.99669C12.1347 2.60788 12.3201 2.26956 12.5807 2.01204C12.711 1.88327 12.8613 1.77723 13.0292 1.70907C13.0718 1.69139 13.1144 1.67625 13.157 1.66615C13.1996 1.65352 13.2447 1.64595 13.2923 1.63837C13.385 1.62575 13.4777 1.62575 13.5754 1.63837C13.9813 1.71159 14.3146 1.92115 14.4975 2.13827C14.5426 2.19382 14.5801 2.24936 14.6077 2.30743C14.6227 2.3352 14.6328 2.3655 14.6428 2.3958C14.6478 2.41095 14.6503 2.42609 14.6553 2.44124C14.6578 2.45639 14.6603 2.47154 14.6628 2.48669C14.6804 2.60535 14.6553 2.72906 14.5877 2.85025C14.2494 3.23906 13.415 3.68594 12.9465 4.05455ZM11.6937 5.67039C11.6636 5.71836 11.6461 5.75623 11.626 5.78148C11.621 5.78653 11.616 5.7941 11.611 5.79915C11.606 5.8042 11.5985 5.80672 11.5935 5.81177C11.5809 5.81682 11.5659 5.81935 11.5484 5.81682C11.4782 5.80925 11.3679 5.72341 11.2702 5.5795C11.2477 5.54415 11.2301 5.5088 11.2151 5.47093C11.2076 5.45326 11.2001 5.43306 11.1951 5.41539C11.1926 5.40529 11.19 5.39772 11.1875 5.38762C11.185 5.37752 11.1825 5.36742 11.18 5.35984C11.165 5.2841 11.165 5.20584 11.1825 5.13009C11.2151 4.98113 11.3228 4.84985 11.4506 4.75391C11.7288 4.59485 12.072 4.64282 12.1021 4.87509C12.1748 5.12757 11.8064 5.49113 11.6937 5.67039ZM3.55794 16.5369C3.0017 16.701 2.66594 16.1001 2.86389 15.3048C3.08187 14.5575 3.85611 14.1384 4.59527 14.3707C5.34946 14.6408 5.69273 15.2568 5.3244 15.6759C4.90596 15.9865 4.06909 16.2642 3.55794 16.5369ZM2.06961 17.259C1.99444 17.0721 2.08464 16.8626 2.27006 16.7894C2.46549 16.7212 2.63337 16.7919 2.62585 16.9358C2.59077 17.0671 2.46549 17.259 2.40536 17.3953C2.32267 17.519 2.1573 17.4508 2.06961 17.259Z" fill="white" />
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
            case 2: // mouth fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} 
                return (
                    <Tab>
                        <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5559 1.86142C21.1906 3.40874 17.7059 5.42588 14.7917 5.33226C11.8776 5.23864 9.24539 2.69381 7.45887 0.809445C5.67236 -1.07492 -1.01859 0.203453 0.221104 5.99102C1.57458 12.3029 6.83902 15.2256 14.2636 15.2256C21.6899 15.2256 28.6253 11.4756 28.9701 5.07522C29.2299 0.310693 24.7195 -0.588083 22.5559 1.86142Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.3166 3.2085C21.0633 4.50219 17.368 6.13122 14.695 6.05292C12.022 5.97462 8.62221 3.38724 6.98514 1.81269C5.34806 0.23813 0.260232 1.17435 1.55257 5.97802C2.84491 10.7817 7.41479 13.9308 14.2263 13.9308C21.0378 13.9308 27.3976 10.797 27.7135 5.44863C27.9478 1.46883 24.2984 1.16243 22.3166 3.2085Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7007 13.6229L11.4734 12.5403L12.078 13.8237C11.6042 13.7727 11.1457 13.7063 10.7007 13.6229ZM13.5265 5.88286L11.5906 7.46423L11.1372 4.89557C11.9268 5.32963 12.7403 5.6837 13.5265 5.88286ZM6.95448 12.4007L8.75458 10.7955L8.76986 13.1377C8.12794 12.9301 7.52338 12.6832 6.95448 12.4007ZM6.58427 1.51835L5.24608 3.32101L4.2781 1.16429C5.11871 1.03151 5.97121 1.16088 6.58427 1.51835ZM5.32589 9.2805L4.82153 11.0338C4.32735 10.6287 3.88072 10.1861 3.48164 9.70946L5.32589 9.2805ZM2.45592 8.21831C2.1944 7.7485 1.97193 7.25655 1.78852 6.74248L3.34239 6.84632L2.45592 8.21831ZM1.50662 3.40612L2.84141 4.04956L1.37756 5.08281C1.30284 4.44107 1.35718 3.88274 1.50662 3.40612ZM8.05152 5.13898L8.25191 2.92949C8.79364 3.36867 9.40669 3.82316 10.0554 4.24532L8.05152 5.13898ZM27.7134 5.45049C27.6981 5.70582 27.6692 5.95605 27.6268 6.20288L26.0559 5.17303L27.6658 4.32702C27.7202 4.66236 27.7372 5.03685 27.7134 5.45049ZM26.0067 9.57328L24.9827 7.95957L27.1258 7.83361C26.8405 8.45832 26.4635 9.03878 26.0067 9.57328ZM22.8022 12.0279L22.5203 9.82521L24.7959 10.7393C24.2015 11.221 23.5324 11.6517 22.8022 12.0279ZM24.3934 2.04263L24.3373 3.80784L22.7274 2.83928C23.2352 2.43415 23.8126 2.16349 24.3934 2.04263ZM21.5404 3.84869L21.4742 5.93733L19.6978 4.86833C20.3992 4.55172 21.0343 4.20105 21.5404 3.84869ZM17.7958 13.6399L18.3529 11.2312L20.3364 13.0356C19.5263 13.2892 18.6755 13.4918 17.7958 13.6399ZM14.4164 13.9327L15.184 12.5317L16.0161 13.8612C15.488 13.9037 14.953 13.9276 14.4164 13.9327ZM16.8788 8.29321L14.9734 6.05648C15.8888 6.04457 16.906 5.84881 17.896 5.54752L16.8788 8.29321ZM27.1632 3.0061L25.915 3.40952L26.1595 2.18222C26.5518 2.35074 26.8982 2.62309 27.1632 3.0061Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M23.084 3.33006C22.2807 3.9003 21.2669 5.77785 16.32 6.33108C11.3731 6.886 8.0786 3.55646 7.04439 2.32235C5.45996 0.431178 2.34714 2.06361 2.34714 2.06361C3.63438 0.553734 5.40052 0.381813 6.51794 1.2159C7.04099 1.60571 10.9401 5.26038 14.0631 5.64848C17.1861 6.03659 21.2754 3.93095 22.2705 3.07303C23.2657 2.21511 23.6563 1.79295 24.7295 1.54954C26.2002 1.2142 26.7912 2.58959 26.7912 2.58959C24.1963 2.00743 23.9365 2.72577 23.084 3.33006ZM13.2955 14.7094C24.3169 15.3086 28.435 7.86478 28.435 7.86478C28.435 7.86478 24.7618 15.8533 13.6215 15.518C2.18072 15.1741 0.496094 7.04601 0.496094 7.04601C0.496094 7.04601 2.99076 14.1477 13.2955 14.7094Z" fill="white" />
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
            case 3: //nose fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} 
                return (
                    <Tab>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.71332 10.0787C0.2967 10.0787 -0.693145 8.3619 0.515959 6.26287L3.21698 1.57428C4.42609 -0.524759 6.40419 -0.524759 7.6117 1.57428L10.3127 6.26287C11.5218 8.36031 10.532 10.0787 8.11537 10.0787H2.71332Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
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
            case 4: // hands
                return (
                    <Tab>
                        <svg width="38" height="16" viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.5143 12.3185C35.5143 12.3185 22.6766 9.81972 18.1706 7.18239C18.1706 7.18239 21.0655 -4.34479 0.669592 1.80739C0.669592 1.80739 -0.0453835 1.99531 0.00228157 2.21828C0.0420025 2.39983 1.21297 2.28676 1.56887 2.45876C1.92477 2.63076 1.68168 3.34743 1.8072 3.6325C1.93431 3.91757 2.53489 3.76946 3.30547 3.38883C4.07606 3.0082 4.00138 4.89065 4.48598 5.04832C4.97057 5.20757 5.81424 3.91757 6.50062 4.15965C7.18541 4.40331 6.42753 5.62961 7.1441 5.85098C7.55402 5.97839 8.16731 4.70909 8.95855 4.9002C9.74979 5.08972 9.15874 6.40202 9.78156 6.64409C10.4044 6.88776 10.9001 5.44965 11.5531 5.59776C12.2077 5.74587 11.6373 7.04542 12.2284 7.28909C12.8194 7.53275 13.5471 5.92583 14.3272 6.2539C15.1073 6.58198 14.3066 7.79713 14.9183 8.00894C15.53 8.22076 16.0146 6.66639 16.6167 6.98331C17.2173 7.30024 16.4896 9.26709 15.3727 9.08712C14.2557 8.90716 7.22036 7.77802 3.07668 5.54998C3.07668 5.54998 3.66296 8.32427 6.43389 10.0013C9.20641 11.6799 14.3209 13.0766 17.4779 9.83087C17.4779 9.83087 31.4406 13.9159 34.9678 15.4256C34.9678 15.4256 36.1388 15.9002 36.7425 15.7314C37.3463 15.5626 37.9373 14.8268 37.9691 14.365C37.9993 13.9047 38.2996 12.6052 35.5143 12.3185Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.hands')}
                        </div>
                    </Tab>
                )
            case 5: // legs
                return (
                    <Tab>
                        <svg width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8149 26.6569H13.3224C12.9871 26.6569 12.7139 26.3845 12.7139 26.0469V0H14.4219V26.0485C14.4219 26.3845 14.1502 26.6569 13.8149 26.6569Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6503 26.6569H30.1577C29.8225 26.6569 29.5492 26.3845 29.5492 26.0469V0H31.2572V26.0485C31.2572 26.3845 30.9855 26.6569 30.6503 26.6569Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M15.7708 21.1523H11.3363V24.0668H15.7708V21.1523Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M7.78057 24.5039C7.03064 24.5039 6.32679 24.5278 5.67536 24.5883C5.66265 24.8288 5.50377 25.0741 5.19712 25.0979C2.6677 25.3034 1.46812 27.1938 1.28541 29.5269C1.34578 29.6767 1.33943 29.8455 1.23139 29.9761C1.2155 30.1417 1.1154 30.285 0.975586 30.3631H16.3428V24.5039C16.3428 24.5039 10.3164 24.5039 7.78057 24.5039Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M16.5699 24.2846C16.5699 24.404 16.473 24.5028 16.3522 24.5028H10.7627C10.642 24.5028 10.545 24.4056 10.545 24.2846C10.545 24.1651 10.642 24.0664 10.7627 24.0664H16.3538C16.473 24.068 16.5699 24.1651 16.5699 24.2846Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M16.562 20.6731C16.562 20.9375 16.3475 21.1509 16.0853 21.1509H11.0217C10.7579 21.1509 10.545 20.9359 10.545 20.6731C10.545 20.4087 10.7595 20.1953 11.0217 20.1953H16.0837C16.3475 20.1953 16.562 20.4103 16.562 20.6731Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M16.705 30.3633H0.551326C0.246269 30.3633 0 30.6101 0 30.9159C0 31.2217 0.246269 31.4685 0.551326 31.4685H1.1392C1.21069 31.2726 1.395 31.1309 1.61585 31.1309C1.83669 31.1309 2.02259 31.2711 2.0925 31.4685H2.89168C2.96318 31.2726 3.14907 31.1309 3.36833 31.1309C3.58759 31.1309 3.77507 31.2711 3.84498 31.4685H4.64417C4.71566 31.2726 4.89997 31.1309 5.12082 31.1309C5.34167 31.1309 5.52597 31.2711 5.59747 31.4685H6.39665C6.46656 31.2726 6.65245 31.1309 6.8733 31.1309C7.09415 31.1309 7.27846 31.2711 7.34995 31.4685H8.14914C8.22064 31.2726 8.40494 31.1309 8.62579 31.1309C8.84664 31.1309 9.03253 31.2711 9.10244 31.4685H9.90162C9.97312 31.2726 10.159 31.1309 10.3783 31.1309C10.5991 31.1309 10.785 31.2711 10.8549 31.4685H11.6541C11.7256 31.2726 11.9099 31.1309 12.1308 31.1309C12.3516 31.1309 12.5359 31.2711 12.6074 31.4685H13.4066C13.4781 31.2726 13.6624 31.1309 13.8832 31.1309C14.1041 31.1309 14.2884 31.2711 14.3599 31.4685H15.1591C15.2306 31.2726 15.4149 31.1309 15.6357 31.1309C15.8566 31.1309 16.0425 31.2711 16.1124 31.4685H16.7002C17.0053 31.4685 17.2516 31.2217 17.2516 30.9159C17.2563 30.6117 17.0085 30.3633 16.705 30.3633Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M5.74681 24.582V30.3615H0.815063V29.4442C0.815063 25.9533 2.71054 24.8575 5.74681 24.582Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M9.72686 26.3737C9.72686 26.611 9.5362 26.8021 9.29947 26.8021C9.06273 26.8021 8.87207 26.6094 8.87207 26.3737C8.87207 26.1364 9.06273 25.9453 9.29947 25.9453C9.5362 25.9453 9.72686 26.1364 9.72686 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M9.56326 26.3737C9.56326 26.5203 9.44569 26.6381 9.29951 26.6381C9.15493 26.6381 9.03577 26.5203 9.03577 26.3737C9.03577 26.2288 9.15334 26.1094 9.29951 26.1094C9.44569 26.1094 9.56326 26.2272 9.56326 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M8.63214 26.3737C8.63214 26.611 8.44148 26.8021 8.20474 26.8021C7.968 26.8021 7.77734 26.6094 7.77734 26.3737C7.77734 26.1364 7.968 25.9453 8.20474 25.9453C8.43989 25.9453 8.63214 26.1364 8.63214 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M8.46695 26.3737C8.46695 26.5203 8.34937 26.6381 8.2032 26.6381C8.05703 26.6381 7.93945 26.5203 7.93945 26.3737C7.93945 26.2288 8.05703 26.1094 8.2032 26.1094C8.34937 26.1094 8.46695 26.2272 8.46695 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M9.48691 26.3879C9.48691 26.4914 9.4027 26.5759 9.29942 26.5759C9.19615 26.5759 9.11194 26.4914 9.11194 26.3879V24.3207C9.11194 24.2172 9.19615 24.1328 9.29942 24.1328C9.4027 24.1328 9.48691 24.2172 9.48691 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M8.39231 26.3879C8.39231 26.4914 8.3081 26.5759 8.20482 26.5759C8.10154 26.5759 8.01733 26.4914 8.01733 26.3879V24.3207C8.01733 24.2172 8.10154 24.1328 8.20482 24.1328C8.3081 24.1328 8.39231 24.2172 8.39231 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M7.5755 26.3737C7.5755 26.611 7.38484 26.8021 7.1481 26.8021C6.91295 26.8021 6.7207 26.6094 6.7207 26.3737C6.7207 26.1364 6.91136 25.9453 7.1481 25.9453C7.38325 25.9453 7.5755 26.1364 7.5755 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M7.41201 26.3737C7.41201 26.5203 7.29444 26.6381 7.14827 26.6381C7.00368 26.6381 6.88452 26.5203 6.88452 26.3737C6.88452 26.2288 7.0021 26.1094 7.14827 26.1094C7.29285 26.1094 7.41201 26.2272 7.41201 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M7.33566 26.3879C7.33566 26.4914 7.25145 26.5759 7.14818 26.5759C7.0449 26.5759 6.96069 26.4914 6.96069 26.3879V24.3207C6.96069 24.2172 7.0449 24.1328 7.14818 24.1328C7.25145 24.1328 7.33566 24.2172 7.33566 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M32.6713 21.1523H28.2368V24.0668H32.6713V21.1523Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M36.2254 24.5039C36.9754 24.5039 37.6792 24.5278 38.3306 24.5883C38.3434 24.8288 38.5022 25.0741 38.8073 25.0979C41.3367 25.3034 42.5363 27.1938 42.719 29.5269C42.6586 29.6767 42.665 29.8455 42.773 29.9761C42.7889 30.1417 42.889 30.285 43.0288 30.3631H27.6616V24.5039C27.6632 24.5039 33.6897 24.5039 36.2254 24.5039Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M27.4376 24.2846C27.4376 24.404 27.5345 24.5028 27.6553 24.5028H33.2464C33.3672 24.5028 33.4641 24.4056 33.4641 24.2846C33.4641 24.1651 33.3672 24.0664 33.2464 24.0664H27.6553C27.5345 24.068 27.4376 24.1651 27.4376 24.2846Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M27.4456 20.6731C27.4456 20.9375 27.66 21.1509 27.9222 21.1509H32.9842C33.248 21.1509 33.4625 20.9359 33.4625 20.6731C33.4625 20.4087 33.248 20.1953 32.9842 20.1953H27.9222C27.6585 20.1953 27.4456 20.4103 27.4456 20.6731Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M27.3026 30.3633H43.4547C43.7597 30.3633 44.006 30.6101 44.006 30.9159C44.006 31.2217 43.7582 31.4685 43.4547 31.4685H42.8668C42.7953 31.2726 42.611 31.1309 42.3902 31.1309C42.1693 31.1309 41.9834 31.2711 41.9135 31.4685H41.1143C41.0428 31.2726 40.8585 31.1309 40.6377 31.1309C40.4168 31.1309 40.2309 31.2711 40.161 31.4685H39.3618C39.2919 31.2726 39.106 31.1309 38.8852 31.1309C38.6643 31.1309 38.48 31.2711 38.4085 31.4685H37.6094C37.5394 31.2726 37.3536 31.1309 37.1327 31.1309C36.9119 31.1309 36.7276 31.2711 36.6561 31.4685H35.8569C35.787 31.2726 35.6011 31.1309 35.3802 31.1309C35.1594 31.1309 34.9735 31.2711 34.9036 31.4685H34.1044C34.0329 31.2726 33.8486 31.1309 33.6277 31.1309C33.4069 31.1309 33.221 31.2711 33.1511 31.4685H32.3519C32.282 31.2726 32.0961 31.1309 31.8752 31.1309C31.6544 31.1309 31.4701 31.2711 31.3986 31.4685H30.5994C30.5295 31.2726 30.3436 31.1309 30.1228 31.1309C29.9019 31.1309 29.7176 31.2711 29.6461 31.4685H28.8469C28.777 31.2726 28.5911 31.1309 28.3703 31.1309C28.1494 31.1309 27.9635 31.2711 27.8936 31.4685H27.3058C27.0007 31.4685 26.7544 31.2217 26.7544 30.9159C26.7512 30.6117 26.9975 30.3633 27.3026 30.3633Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M38.2593 24.582V30.3615H43.191V29.4442C43.191 25.9533 41.2971 24.8575 38.2593 24.582Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M34.2792 26.3737C34.2792 26.611 34.4698 26.8021 34.7066 26.8021C34.9433 26.8021 35.134 26.6094 35.134 26.3737C35.134 26.1364 34.9417 25.9453 34.7066 25.9453C34.4714 25.9453 34.2792 26.1364 34.2792 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M34.4443 26.3737C34.4443 26.5203 34.5619 26.6381 34.7081 26.6381C34.8543 26.6381 34.9718 26.5203 34.9718 26.3737C34.9718 26.2288 34.8543 26.1094 34.7081 26.1094C34.5619 26.1094 34.4443 26.2272 34.4443 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M35.3754 26.3737C35.3754 26.611 35.566 26.8021 35.8028 26.8021C36.0379 26.8021 36.2302 26.6094 36.2302 26.3737C36.2302 26.1364 36.0379 25.9453 35.8028 25.9453C35.566 25.9453 35.3754 26.1364 35.3754 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M35.5392 26.3737C35.5392 26.5203 35.6568 26.6381 35.8029 26.6381C35.9475 26.6381 36.0667 26.5203 36.0667 26.3737C36.0667 26.2288 35.9491 26.1094 35.8029 26.1094C35.6568 26.1094 35.5392 26.2272 35.5392 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M34.519 26.3879C34.519 26.4914 34.6033 26.5759 34.7065 26.5759C34.8098 26.5759 34.894 26.4914 34.894 26.3879V24.3207C34.894 24.2172 34.8098 24.1328 34.7065 24.1328C34.6033 24.1328 34.519 24.2172 34.519 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M35.6138 26.3879C35.6138 26.4914 35.698 26.5759 35.8012 26.5759C35.9045 26.5759 35.9887 26.4914 35.9887 26.3879V24.3207C35.9887 24.2172 35.9045 24.1328 35.8012 24.1328C35.698 24.1328 35.6138 24.2172 35.6138 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M36.432 26.3737C36.432 26.611 36.6227 26.8021 36.8594 26.8021C37.0961 26.8021 37.2868 26.6094 37.2868 26.3737C37.2868 26.1364 37.0961 25.9453 36.8594 25.9453C36.6227 25.9453 36.432 26.1364 36.432 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M36.5957 26.3737C36.5957 26.5203 36.7133 26.6381 36.8595 26.6381C37.004 26.6381 37.1232 26.5203 37.1232 26.3737C37.1232 26.2288 37.0056 26.1094 36.8595 26.1094C36.7133 26.1094 36.5957 26.2272 36.5957 26.3737Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M36.6704 26.3879C36.6704 26.4914 36.7546 26.5759 36.8579 26.5759C36.9612 26.5759 37.0454 26.4914 37.0454 26.3879V24.3207C37.0454 24.2172 36.9612 24.1328 36.8579 24.1328C36.7546 24.1328 36.6704 24.2172 36.6704 24.3207V26.3879Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                        </svg>
                        <div
                            className="avatar-tab-text"
                            style={{
                                color: this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB",

                            }}>
                            {i18next.t('avatarTabs.legs')}
                        </div>
                    </Tab>
                )

            case 6: // hats  fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} 
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

            case 7: // head 
                return (
                    <Tab>
                        <svg width="8" height="21" viewBox="0 0 8 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.45482 3.73622C7.45482 1.67222 5.78654 0 3.72741 0C1.66828 0 0 1.67222 0 3.73622C0 5.13452 0.765817 6.35126 1.90025 6.99307C4.41537 8.98859 2.84084 13.3826 3.0887 18.3116C3.1173 18.8722 3.2158 19.3404 3.2158 19.7386C3.2158 20.8391 4.79034 20.4489 4.84277 20.1957C4.86184 20.1017 4.88885 19.8246 4.88567 19.6399C4.85072 17.6252 4.29303 10.8424 4.29303 10.0524C4.29303 7.6747 5.8056 6.84815 5.8056 6.84815L5.78813 6.84974C6.79068 6.18244 7.45482 5.03737 7.45482 3.73622Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
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
                        
            
            case 8: // face
                return (
                    <Tab>
                        <svg width="34" height="15" viewBox="0 0 34 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5958 2.85343C13.5028 1.84299 11.4065 -0.0415974 8.07385 0.00070011C4.74116 0.0429976 3.1887 2.20957 3.1887 2.20957C2.54726 2.87223 2.04991 9.83253 7.79032 9.60694C13.5307 9.37665 13.6888 3.86387 13.5958 2.85343ZM7.8275 9.19806C2.57515 9.40955 3.03066 3.03672 3.61632 2.43046C3.61632 2.43046 5.03399 0.451875 8.0878 0.409577C11.137 0.37198 13.0566 2.09208 13.1403 3.01792C13.2239 3.94377 13.0799 8.99127 7.8275 9.19806Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path opacity="0.75" d="M8.08775 0.410761C5.03859 0.448359 3.61627 2.43164 3.61627 2.43164C3.03061 3.0379 2.5751 9.41073 7.82745 9.19925C13.0798 8.98776 13.2239 3.94495 13.1402 3.01911C13.0566 2.09796 11.1369 0.373163 8.08775 0.410761Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M16.7888 2.86716C16.7888 2.86716 16.0266 2.77316 15.3991 3.23844C14.7716 3.70371 14.66 4.15018 14.3114 4.06089C13.9628 3.96689 13.6095 3.46872 13.6095 3.46872C13.6095 3.46872 13.4376 5.28752 13.1029 6.01598C13.6653 5.5742 13.8559 4.99143 13.7165 4.36167C14.3486 4.69535 14.6228 4.56846 14.9436 4.19248C15.2689 3.8212 15.7058 3.28074 16.7888 3.28074C16.7888 3.11155 16.7888 2.86716 16.7888 2.86716Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M3.04925 2.48438C3.04925 2.48438 1.93835 2.75696 1.91976 2.86035C1.90117 2.95904 1.91976 3.29743 1.91976 3.29743L2.84938 3.51831L3.04925 2.48438Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M1.91502 2.85547L0 5.43092L0.343961 5.48731L1.91502 3.29254V2.85547Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M25.7877 9.60693C31.5281 9.83722 31.0261 2.87693 30.3893 2.20957C30.3893 2.20957 28.8369 0.0429976 25.5042 0.00070011C22.1715 -0.0415974 20.0752 1.84299 19.9822 2.85343C19.8893 3.86387 20.0473 9.37665 25.7877 9.60693ZM20.4378 3.02262C20.5214 2.09678 22.4411 0.376677 25.4902 0.414274C28.5394 0.451872 29.9617 2.43516 29.9617 2.43516C30.5474 3.04142 31.0029 9.41425 25.7505 9.20276C20.4982 8.99127 20.3541 3.94377 20.4378 3.02262Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path opacity="0.75" d="M25.4904 0.410761C28.5395 0.448359 29.9618 2.43164 29.9618 2.43164C30.5475 3.0379 31.003 9.41073 25.7507 9.19925C20.4983 8.98776 20.3542 3.94495 20.4379 3.01911C20.5216 2.09796 22.4412 0.373163 25.4904 0.410761Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M16.7891 2.86716C16.7891 2.86716 17.5514 2.77316 18.1788 3.23844C18.8063 3.70371 18.9179 4.15018 19.2665 4.06089C19.6151 3.96689 19.9684 3.46872 19.9684 3.46872C19.9684 3.46872 20.1403 5.28752 20.475 6.01598C19.9126 5.5742 19.722 4.99143 19.8615 4.36167C19.2293 4.69535 18.9551 4.56846 18.6344 4.19248C18.309 3.8212 17.8721 3.28074 16.7891 3.28074C16.7891 3.11155 16.7891 2.86716 16.7891 2.86716Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M30.5336 2.48438C30.5336 2.48438 31.6445 2.75696 31.6631 2.86035C31.6817 2.95904 31.6631 3.29743 31.6631 3.29743L30.7335 3.51831L30.5336 2.48438Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
                            <path d="M31.6631 2.85547L33.5828 5.43092L33.2388 5.48731L31.6631 3.29254V2.85547Z" fill={this.state.tabIndex == index ? "#6A6A6D" : "#6AC3DB"} />
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
        }
    }
    renderAvatarBody = () => {

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
                <div class="buttonList">
                    {this.state.bodyMaleItems.map((item, index) => {
                        return (
                            <M_body
                                type="button"
                                x={-2}
                                y={-40}
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
                                            AssetType: "body",
                                            lockedindex: index,
                                            lockedItemSvg: <M_body
                                                type="button"
                                                x={-2}
                                                y={-40}
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
                                        selectedBodyIndex: item


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
    renderAvatarEyes = () => {

        return (
            <div>
                <div class="buttonList">
                    {
                        this.state.eyeItems.map((item, index) => {
                            return (
                                <M_eyes
                                    type="button"
                                    x={-42}
                                    y={-60}
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
                                                AssetType: "Eyes",
                                                lockedindex: index,
                                                lockedItemSvg: <M_eyes
                                                    type="button"
                                                    x={-42}
                                                    y={-60}
                                                    z={1.5}
                                                    index={index}
                                                    targetId={item}

                                                    activeGender={this.state.activeGender}
                                                    selected={item == this.state.selectedEyeIndex}
                                                    activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                    activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]}
                                                />
                                            })
                                            console.log("locked")
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
                                <M_mouth
                                    type="button"
                                    x={-42}
                                    y={-80}
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
                                                lockedItemSvg: <M_mouth
                                                    type="button"
                                                    x={-42}
                                                    y={-80}
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
    renderAvatarNose = () => {

        return (
            <div>
                <div class="buttonList">
                    {
                        this.state.noseItems.map((item, index) => {
                            return (
                                <M_nose
                                    type="button"
                                    x={-52}
                                    y={-80}
                                    z={2}
                                    index={index}
                                    targetId={item}
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
                                                lockedItemSvg: <M_nose
                                                    type="button"
                                                    x={-52}
                                                    y={-80}
                                                    z={2}
                                                    index={index}
                                                    targetId={item}

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
    renderAvatarHair = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.headItems.map((item, index) => {
                        return (
                            <M_head
                                type="button"
                                x={-44}
                                y={-22}
                                z={1.5}
                                index={index}
                                targetId={item}
                                points={this.getLockedItemData(this.state.lockedHair, index).points}
                                locked={this.getLockedItemData(this.state.lockedHair, index).locked}

                                activeGender={this.state.activeGender}
                                selected={item == this.state.selectedHairIndex}
                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                OnItemSelected={() => {
                                    if (this.getLockedItemData(this.state.lockedHair, index).locked) {
                                        this.setState({
                                            open: true,
                                            points: this.getLockedItemData(this.state.lockedHair, index).points,
                                            AssetType: "head",
                                            lockedindex: index,
                                            lockedItemSvg: <M_head
                                                type="button"
                                                x={-44}
                                                y={-22}
                                                z={1.5}
                                                index={index}
                                                targetId={item}


                                                activeGender={this.state.activeGender}
                                                selected={item == this.state.selectedHairIndex}
                                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                            />
                                        })
                                        console.log("locked")
                                    }
                                    else this.setState({
                                        selectedHairIndex: item,
                                        selectedHairIndex2: item,





                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
    renderAvatarBottom = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.pantsItems.map((item, index) => {
                        return (
                            <M_legs
                                type="button"
                                x={-40}
                                y={-115}
                                z={1.4}
                                index={index}
                                targetId={item}
                                points={this.getLockedItemData(this.state.lockedLegs, index).points}
                                locked={this.getLockedItemData(this.state.lockedLegs, index).locked}
                                activeGender={this.state.activeGender}
                                selected={item == this.state.selectedBottomIndex}
                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}

                                OnItemSelected={() => {
                                    if (this.getLockedItemData(this.state.lockedLegs, index).locked) {
                                        this.setState({
                                            open: true,
                                            points: this.getLockedItemData(this.state.lockedLegs, index).points,
                                            AssetType: "legs",
                                            lockedindex: index,
                                            lockedItemSvg: <M_legs
                                                type="button"
                                                x={-40}
                                                y={-115}
                                                z={1.4}
                                                index={index}
                                                targetId={item}
                                                activeGender={this.state.activeGender}
                                                selected={item == this.state.selectedBottomIndex}
                                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                            />
                                        })
                                        console.log("locked")
                                    }
                                    else this.setState({
                                        selectedBottomIndex: item,
                                        
                                        selectedBottomIndex2: item




                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
    renderAvatarMiddle = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.shirtItems.map((item, index) => {
                        return (
                            <M_hands
                                type="button"
                                x={5}
                                y={-20}
                                z={0.6}
                                index={index}
                                targetId={item}
                                points={this.getLockedItemData(this.state.lockedHands, index).points}
                                locked={this.getLockedItemData(this.state.lockedHands, index).locked}

                                activeGender={this.state.activeGender}
                                selected={item == this.state.selectedShirtIndex}
                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                OnItemSelected={() => {
                                    if (this.getLockedItemData(this.state.lockedHands, index).locked) {
                                        this.setState({
                                            open: true,
                                            points: this.getLockedItemData(this.state.lockedHands, index).points,
                                            AssetType: "hands",
                                            lockedindex: index,
                                            lockedItemSvg: <M_hands
                                                type="button"
                                                x={5}
                                                y={-20}
                                                z={0.6}
                                                index={index}
                                                targetId={item}

                                                activeGender={this.state.activeGender}
                                                selected={item == this.state.selectedShirtIndex}
                                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                            />
                                        })

                                        console.log("locked")
                                    }
                                    else this.setState({
                                        selectedShirtIndex: item,
                                        selectedShirtIndex2: item,





                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
    renderAvatarHat = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.shirtItems.map((item, index) => {
                        return (
                            <M_hats
                                type="button"
                                x={-40}
                                y={-20}
                                z={1.4}
                                index={index}
                                targetId={item}
                                points={this.getLockedItemData(this.state.lockedHeadAcc, index).points}
                                locked={this.getLockedItemData(this.state.lockedHeadAcc, index).locked}
                                activeGender={this.state.activeGender}
                                selected={item == this.state.selectedHeadAccessoryIndex}
                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                OnItemSelected={() => {
                                    if (this.getLockedItemData(this.state.lockedHeadAcc, index).locked) {
                                        this.setState({
                                            open: true,
                                            points: this.getLockedItemData(this.state.lockedHeadAcc, index).points,
                                            AssetType: "hats",
                                            lockedindex: index,
                                            lockedItemSvg: <M_hats
                                                type="button"
                                                x={-40}
                                                y={-20}
                                                z={1.4}
                                                index={index}
                                                targetId={item}
                                                points={this.getLockedItemData(this.state.lockedHeadAcc, index).points}
                                                locked={this.getLockedItemData(this.state.lockedHeadAcc, index).locked}
                                                activeGender={this.state.activeGender}
                                                selected={item == this.state.selectedHeadAccessoryIndex}
                                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]}
                                                activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                                activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
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
                    })}
                </div>
            </div>
        )
    }
    renderAvatarGlasses = () => {

        return (
            <div>
                <div class="buttonList">
                    {this.state.faceItems.map((item, index) => {
                        return (
                            <M_face
                                type="button"
                                x={-40}
                                y={-55}
                                z={1.4}
                                index={index}
                                targetId={item}
                                points={this.getLockedItemData(this.state.lockedFaceAcc, index).points}
                                locked={this.getLockedItemData(this.state.lockedFaceAcc, index).locked}
                                activeGender={this.state.activeGender}
                                selected={item == this.state.selectedFaceAccessoryIndex}
                                OnItemSelected={() => {
                                    console.log(this.state.lockedFaceAcc)
                                    if (this.getLockedItemData(this.state.lockedFaceAcc, index).locked) {
                                        console.log("loocccceed")
                                        this.setState({
                                            open: true,
                                            points: this.getLockedItemData(this.state.lockedFaceAcc, index).points,
                                            AssetType: "Face",
                                            lockedindex: index,
                                            lockedItemSvg: <M_face
                                                type="button"
                                                x={-40}
                                                y={-20}
                                                z={1.4}
                                                index={index}
                                                targetId={item}
                                                points={this.getLockedItemData(this.state.lockedFaceAcc, index).points}
                                                locked={this.getLockedItemData(this.state.lockedFaceAcc, index).locked}
                                                activeGender={this.state.activeGender}
                                                selected={item == this.state.selectedFaceAccessoryIndex}
                                                activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} 
                                                // activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]}
                                                // activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]}
                                            />
                                        })
                                        console.log("locked")
                                    }
                                    else this.setState({
                                        selectedFaceAccessoryIndex: item,





                                    });
                                }}
                            />
                        );
                    })}
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
                activeGender: this.state.activeGender,
                selectedEyeColor: this.state.selectedEyeColor,
                selectedHairColor: this.state.selectedHairColor,
                selectedEyeBrowsColor: this.state.selectedEyeBrowsColor,
                selectedBottomIndex: this.state.selectedBottomIndex,
                selectedShirtIndex: this.state.selectedShirtIndex,
                selectedFaceAccessoryIndex: this.state.selectedFaceAccessoryIndex,
                selectedHeadAccessoryIndex: this.state.selectedHeadAccessoryIndex,
                selectedBodyIndex: this.state.selectedBodyIndex,
                selectedBackgroundIndex: this.state.selectedBackgroundIndex,
                avatarType: 'monster'
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
    getRandomNumber = (length, lockedItems) => {
        let rand = 0;
        let freeItems = []
        for (let index = 0; index < length; index++) {
            //console.log('index',index,lockedItems[index].index)
            if (lockedItems.findIndex(item => item.index == index) == -1) {
                freeItems.push(index)
            }
        }
        console.log('freeeeee', freeItems)
        rand = (Math.floor(Math.random() * freeItems.length));
        // while (findIndex!=-1) {
        //     rand = (Math.floor(Math.random() * length) + 1);
        // }
        console.log('freeItems[rand]', freeItems[rand])
        return freeItems[rand];
    }
    generateRandomAvatar = () => {
        clearInterval(this.generateInterval);
        this.generateInterval = setInterval(() => {

            this.setState({
                selectedSkinColorIndex: Math.floor(Math.random() * this.state.skinColors.length - 1) + 1,
                selectedEyeIndex: this.getRandomNumber(41, this.state.lockedEyes),
                selectedMouthIndex: this.getRandomNumber(35, this.state.lockedMouth),
                selectedBottomIndex: this.getRandomNumber(5, this.state.lockedLegs),
                selectedBottomIndex2: this.getRandomNumber(5, this.state.lockedLegs),
                selectedShirtIndex: this.getRandomNumber(4, this.state.lockedHands),
                selectedShirtIndex2: this.getRandomNumber(4, this.state.lockedHands),
                selectedBodyIndex: this.getRandomNumber(9, this.state.lockedDresses),
                selectedNoseIndex: Math.floor(Math.random() * 4) + 1,
                selectedHairIndex: this.getRandomNumber(5, this.state.lockedHair),
                selectedHairIndex2: this.getRandomNumber(5, this.state.lockedHair),

                selectedFaceAccessoryIndex: this.getRandomNumber(7, this.state.lockedFaceAcc),
                selectedHeadAccessoryIndex: this.getRandomNumber(4, this.state.lockedHeadAcc),
            });
        }, 1)

        setTimeout(() => {

            clearInterval(this.generateInterval);
            // this.screenShotRef.takeScreenShot()
        }, 100);

    }
    render() {
        return (
            <div>
                <RedeemAvatarModal
                    lockedItemSvg={this.state.lockedItemSvg}
                    index={this.state.lockedindex}
                    getPreviewAvatar={this.getPreviewAvatar}
                    open={this.state.open}
                    Asseststype={this.state.AssetType}
                    points={this.state.points}
                    onAfterRedeem={this.onAfterRedeem}
                    type={'monster'}
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
                <ScreenshotMonsterAvatar {...this.state} />
                <div>
                    <div className="finalAvatar" >
                        <svg id="final-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

                            <g transform="translate(0, 0)">
                                <M_legs targetId={this.state.selectedBottomIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_hands targetId={this.state.selectedShirtIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_head targetId={this.state.selectedHairIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_body activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeGender={this.state.activeGender} targetId={this.state.selectedBodyIndex} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_hats targetId={this.state.selectedHeadAccessoryIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_mouth targetId={this.state.selectedMouthIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_nose targetId={this.state.selectedNoseIndex} activeGender={this.state.activeGender} activeSkinColor={this.state.skinColors[this.state.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.state.bodyPartsSkinColor[this.state.selectedSkinColorIndex]} activeHeadSkinColor={this.state.headSkinColor[this.state.selectedSkinColorIndex]} />
                                <M_eyes targetId={this.state.selectedEyeIndex} activeEyeColor={this.state.eyeColors[this.state.selectedEyeColor]} />
                                <M_face targetId={this.state.selectedFaceAccessoryIndex} />
                            </g>

                        </svg>
                    </div>
                </div>


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
                            this.renderAvatarBody()
                        }

                    </TabPanel>
                    <TabPanel>
                        {
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
                            this.renderAvatarNose()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarMiddle()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarBottom()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarHat()
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            this.renderAvatarHair()
                        }
                    </TabPanel>
                    
                    <TabPanel>
                        {
                            this.renderAvatarGlasses()
                        }
                    </TabPanel>

                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.mainReducer.loggedInUser,
})

MonsterAvatar.layout = "In";

export default connect(mapStateToProps)(MonsterAvatar);