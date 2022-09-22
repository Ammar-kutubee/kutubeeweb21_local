import React, { Component } from 'react'
import R_background from './R_background'
import R_body from './R_body'
import R_eyes from './R_eyes'
import R_hands from './R_hands'
import R_head from './R_head'
import R_legs from './R_legs'
import R_mouth from './R_mouth'


export default class ScreenshotRobotAvatar extends Component {

    render() {
        return (
            <div>
                <div  >

                    <svg id="final-avatars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

                        <g transform="translate(0, 0)">
                            <R_background targetId={this.props.selectedBackgroundIndex} />
                            <R_head targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_legs targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_hands targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_body activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_mouth targetId={this.props.selectedMouthIndex} />
                            <R_eyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                        </g>

                    </svg>
                </div>
                <div >

                    <svg id="final-avatar-head" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100%" width="100%">

                        <g transform="translate(0, 0)">
                            <R_background targetId={this.props.selectedBackgroundIndex} />
                            <R_head targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_legs targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_hands targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_body activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <R_mouth targetId={this.props.selectedMouthIndex} />
                            <R_eyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                        </g>


                    </svg>
                </div>
            </div >
        )
    }
}
