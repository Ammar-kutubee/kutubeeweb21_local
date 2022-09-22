import React, { Component } from 'react'
import HumanFaceAccessoryBack from './HumanAccessories/HumanFaceAccessoryBack'
import HumanHeadAccessory from './HumanAccessories/HumanHeadAccessory'
import HumanBackground from './HumanBackgrounds/HumanBackground'
import HumanPants from './HumanClothes/HumanPants'
import HumanShirt from './HumanClothes/HumanShirt'
import HumanBody from './HumanParts/HumanBody'
import HumanEars from './HumanParts/HumanEars'
import HumanEyeBrows from './HumanParts/HumanEyeBrows'
import HumanEyes from './HumanParts/HumanEyes'
import HumanFace from './HumanParts/HumanFace'
import HumanHair from './HumanParts/HumanHair'
import HumanMouth from './HumanParts/HumanMouth'
import HumanNose from './HumanParts/HumanNose'
import HumanHairBack from './HumanParts/H_hair_back'


export default class ScreenshotAvatar extends Component {
    render() {
        return (
            <div>
                <svg id="final-avatars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="554.31" width="400">

                    <g transform="translate(0, 16.01)">
                        <HumanBackground targetId={this.props.selectedBackgroundIndex} />
                        <g id='bodyParts'>
                            {
                                this.props.selectedBodyIndex == 0
                                    ?
                                    <HumanBody activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} />
                                    :
                                    null
                            }
                            <HumanFace activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} />
                            <HumanNose targetId={this.props.selectedNoseIndex} />
                            <HumanMouth targetId={this.props.selectedMouthIndex} />
                            {!this.props.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} targetId={this.props.selectedFaceAccessoryIndex} activeGender={this.props.activeGender} /> : null}
                            {this.props.backHairActive ? <HumanHairBack targetId={this.props.selectedHairIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeGender={this.props.activeGender} /> : null}
                            <HumanEars activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} innerEarColor={this.props.innerEarSkinColors[this.props.selectedSkinColorIndex]} />
                            <HumanEyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                            <HumanEyeBrows targetId={this.props.selectedEyeBrowsIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} />
                            {this.props.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} targetId={this.props.selectedFaceAccessoryIndex} activeGender={this.props.activeGender} /> : null}
                            {!this.props.backHairActive ? <HumanHair targetId={this.props.selectedHairIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeGender={this.props.activeGender} /> : null}
                        </g>

                        <HumanHeadAccessory targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} />
                        {
                            this.props.selectedBodyIndex == 0
                                ?
                                <g id='bodyClothes'>
                                    <HumanPants targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} />
                                    <HumanShirt targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} />
                                </g>
                                :
                                <HumanBody activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} />
                        }
                    </g>

                </svg>

                <svg id="final-avatar-head" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 100" height="100" width="100">

                    <g transform="translate(0, 0)">
                        <HumanBackground targetId={this.props.selectedBackgroundIndex} />
                        <g id='bodyParts'>
                            {
                                this.props.selectedBodyIndex == 0
                                    ?
                                    <HumanBody activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} />
                                    :
                                    null
                            }
                            <HumanFace activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} />
                            <HumanNose targetId={this.props.selectedNoseIndex} />
                            <HumanMouth targetId={this.props.selectedMouthIndex} />
                            {!this.props.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} targetId={this.props.selectedFaceAccessoryIndex} activeGender={this.props.activeGender} /> : null}
                            {this.props.backHairActive ? <HumanHairBack targetId={this.props.selectedHairIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeGender={this.props.activeGender} /> : null}
                            <HumanEars activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} innerEarColor={this.props.innerEarSkinColors[this.props.selectedSkinColorIndex]} />
                            <HumanEyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                            <HumanEyeBrows targetId={this.props.selectedEyeBrowsIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} />
                            {this.props.FrontFaceAccessoryActive ? <HumanFaceAccessoryBack activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} targetId={this.props.selectedFaceAccessoryIndex} activeGender={this.props.activeGender} /> : null}
                            {!this.props.backHairActive ? <HumanHair targetId={this.props.selectedHairIndex} activeHairColor={this.props.hairColors[this.props.selectedHairColor]} activeGender={this.props.activeGender} /> : null}
                        </g>

                        <HumanHeadAccessory targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} />
                        {
                            this.props.selectedBodyIndex == 0
                                ?
                                <g id='bodyClothes'>
                                    <HumanPants targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} />
                                    <HumanShirt targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} />
                                </g>
                                :
                                <HumanBody activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} />
                        }
                    </g>

                </svg>
            </div>
        )
    }
}
