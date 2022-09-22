import React, { Component } from 'react'
import M_body from './M_body'
import M_eyes from './M_eyes'
import M_hands from './M_hands'
import M_hats from './M_hats'
import M_head from './M_head'
import M_legs from './M_legs'
import M_mouth from './M_mouth'
import M_nose from './M_nose'

export default class ScreenshotMonsterAvatar extends Component {

    render() {
        return (
            <div>
                <div  >
                    <svg id="final-avatars" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="554.31" width="400">

                        <g transform="translate(0, 0)">
                            <M_legs targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_hands targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_head targetId={this.props.selectedHairIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_body activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_hats targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_mouth targetId={this.props.selectedMouthIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_nose targetId={this.props.selectedNoseIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_eyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                        </g>

                    </svg>
                </div>
                <div >
                    <svg id="final-avatar-head" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 156.83 217.33" height="100" width="100">

                        <g transform="translate(0, 0)">
                            <M_legs targetId={this.props.selectedBottomIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_hands targetId={this.props.selectedShirtIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_head targetId={this.props.selectedHairIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_body activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeGender={this.props.activeGender} targetId={this.props.selectedBodyIndex} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_hats targetId={this.props.selectedHeadAccessoryIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_mouth targetId={this.props.selectedMouthIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_nose targetId={this.props.selectedNoseIndex} activeGender={this.props.activeGender} activeSkinColor={this.props.skinColors[this.props.selectedSkinColorIndex]} activeBodyPartsSkinColor={this.props.bodyPartsSkinColor[this.props.selectedSkinColorIndex]} activeHeadSkinColor={this.props.headSkinColor[this.props.selectedSkinColorIndex]} />
                            <M_eyes targetId={this.props.selectedEyeIndex} activeEyeColor={this.props.eyeColors[this.props.selectedEyeColor]} />
                        </g>

                    </svg>
                </div>
            </div >
        )
    }
}
