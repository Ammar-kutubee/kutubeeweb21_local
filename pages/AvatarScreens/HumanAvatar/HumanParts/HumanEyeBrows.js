import i18next from 'i18next';
import React, { Component } from 'react';

class HumanEyeBrows extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    renderSVG = (keyId) => {
        switch (keyId) {
            case 0:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#422019"}>
                            <path d="M54.05 66.63s2.59-1.97 4.9-2.38c2.31-.41 3.6.07 4.47-.38.87-.45.55-1.59-.83-1.69-1.38-.1-3.68.03-5.88 1.31-2.21 1.28-2.66 3.14-2.66 3.14zM101.49 66.63s-2.59-1.97-4.9-2.38c-2.31-.41-3.6.07-4.47-.38-.87-.45-.55-1.59.83-1.69 1.38-.1 3.68.03 5.88 1.31 2.21 1.28 2.66 3.14 2.66 3.14z" />
                        </g>
                    </g>
                );
            case 1:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#c35d27"}>
                            <path d="M102.7 65.86s-2.78-.47-4.66-1.94c-1.89-1.47-2.64-3.54-3.48-4.45-.84-.91-1.97.84-.26 2.98 1.71 2.15 3.49 3.17 5.47 3.5 1.84.32 2.93-.09 2.93-.09zM52.84 65.86s2.78-.47 4.66-1.94c1.89-1.47 2.64-3.54 3.48-4.45.84-.91 1.97.84.26 2.98-1.71 2.15-3.49 3.17-5.47 3.5-1.84.32-2.93-.09-2.93-.09z" />
                        </g>
                    </g>
                );
            case 2:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#7d452d"}>
                            <path d="M53.53 67.11s1.98-2 4.27-2.7c2.29-.69 4.41-.12 5.64-.29 1.23-.16.45-2.09-2.29-1.93-2.74.16-4.6 1.03-6.01 2.46-1.32 1.34-1.61 2.46-1.61 2.46zM102.01 67.11s-1.98-2-4.27-2.7c-2.29-.69-4.41-.12-5.64-.29-1.23-.16-.45-2.09 2.29-1.93 2.74.16 4.6 1.03 6.01 2.46 1.32 1.34 1.61 2.46 1.61 2.46z" />
                        </g>
                    </g>
                );
            case 3:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#31373f"}>
                            <path d="M53.85 67.8s2.17-2.78 4.47-3.71c2.3-.94 3.84-.96 4.9-.53 1.07.44 2.05-2.56-2.15-2-4.2.57-6.44 4-7.22 6.24zM101.69 67.8s-2.17-2.78-4.47-3.71c-2.3-.94-3.84-.96-4.9-.53-1.07.44-2.05-2.56 2.15-2 4.2.57 6.44 4 7.22 6.24z" />
                        </g>
                    </g>
                );
            case 4:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#7d452d"}>
                            <path d="M57.21 64.77s1.07-1.41 3.36-2.46 4.2-1.46 4.62-.9c.41.56.45 1.5 0 2.03s-6.72 2.78-7.47 2.7c-.75-.08-.93-.82-.51-1.37zM98.33 64.77s-1.07-1.41-3.36-2.46-4.2-1.46-4.62-.9c-.41.56-.45 1.5 0 2.03s6.72 2.78 7.47 2.7c.75-.08.93-.82.51-1.37z" />
                        </g>
                    </g>
                );
            case 5:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#7d452d"}>
                            <path d="M58.21 61.53s1.07 1.41 3.36 2.46 4.2 1.46 4.62.9c.41-.56.45-1.5 0-2.03s-6.72-2.78-7.47-2.7c-.75.07-.93.81-.51 1.37zM97.33 61.53s-1.07 1.41-3.36 2.46-4.2 1.46-4.62.9c-.41-.56-.45-1.5 0-2.03s6.72-2.78 7.47-2.7c.75.07.93.81.51 1.37z" />
                        </g>
                    </g>
                );
            case 6:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#9b5d42"}>
                            <path d="M55.34 67.27c.06-.09.97-1.3 2.93-2.17 1.96-.88 6.73-.48 7.82-1.03s.85-2.32.21-2.6c-.63-.27-5.61.09-8.15 1.48s-4.23 4.62-3.89 4.89c.33.28 1.08-.57 1.08-.57zM100.2 67.27c-.06-.09-.97-1.3-2.93-2.17-1.96-.88-6.73-.48-7.82-1.03s-.85-2.32-.21-2.6c.63-.27 5.61.09 8.15 1.48s4.23 4.62 3.89 4.89c-.33.28-1.08-.57-1.08-.57z" />
                        </g>
                    </g>
                );
            case 7:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#472b1f"}>
                            <path d="M58.27 63.02c.2.16.44.26.69.27.43.01.83-.22 1.22-.42.92-.47 1.99-.82 2.97-.49.48.16.88.48 1.25.82.37.34.64.79 1.21.77.46-.01 1.01-.39.88-.9-.15-.57-.98-1.07-1.43-1.38-.61-.41-1.28-.73-1.99-.92a6.678 6.678 0 00-4.05.24c-.49.19-1.2.56-1.18 1.17-.01.32.17.63.43.84zM90.34 62.87c.15-.09.32-.15.51-.16.38-.02.76.14 1.09.34s.62.46.95.66c.48.3 1.04.5 1.6.45.95-.07 1.71-.79 2.58-1.19.33-.15.7-.26 1.05-.17s.66.43.59.79c-.05.32-.35.52-.62.69-1.21.75-2.51 1.51-3.94 1.54-1.27.02-2.49-.55-3.53-1.28-.2-.14-.41-.3-.55-.5-.3-.45-.11-.92.27-1.17z" />
                        </g>
                    </g>
                );
            case 8:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M58.43 63.8c1.22-.76 2.71-1.29 4.16-1.02.82.15 1.59.56 2.2 1.13.65.6 1.71 2.36 2.79 1.64 1.39-.93-.75-2.51-1.4-3.09-.73-.64-1.53-1.22-2.44-1.58-2.23-.89-4.62-.38-6.66.76-.57.32-.72 1.09-.31 1.6l.28.34c.33.41.92.51 1.38.22zM97.27 63.05l-6.63 4.01c-.47.28-1.07.16-1.4-.27-.38-.5-.24-1.22.3-1.54l6.63-4.01c.47-.28 1.07-.16 1.4.27.38.5.24 1.21-.3 1.54z"
                            fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#472b1f"}
                        />
                    </g>
                );
            case 9:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M58.66 64.3c.95-.74 2.12-1.31 3.35-1.29.8.01 1.56.29 2.21.75.69.48 1.21 1.45 2.16 1.35 1.44-.15 1.04-1.52.26-2.17-.98-.82-2.31-1.39-3.53-1.74-.89-.25-1.82-.3-2.72-.13-.52.1-1.03.26-1.51.47-.23.1-1.63.68-1.63.92-.57.4-.62 1.22-.12 1.7l.07.06c.39.4 1.01.42 1.46.08zM90.93 67.98c1.22-1.08 3.91-2.75 6.63.01.57.58 1.81.29 1.99-.52.33-1.41-2.29-2.11-3.21-2.5-2.43-1.01-4.93-.35-6.94 1.26-.54.43-.54 1.26-.02 1.71l.07.06c.44.37 1.06.35 1.48-.02z"
                            fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#472b1f"}
                        />
                    </g>
                );
            case 10:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#472b1f"}>
                            <path d="M65.48 62.17c-1.27 1.03-4.01 2.6-6.62-.26-.37-.41-.98-.48-1.44-.18-1.81 1.21 3.17 3.55 4.03 3.72 1.98.39 3.91-.31 5.5-1.48.56-.41.59-1.24.08-1.71l-.07-.06c-.42-.38-1.04-.39-1.48-.03zM90.05 62.46c1.3.98 4.11 2.45 6.61-.51.38-.45 1.31-.5 1.72-.05.64.7-.28 1.67-.83 2.1-2.36 1.85-6.53 2.68-8.89.32-.57-.39-.63-1.21-.15-1.7l.07-.07c.4-.4 1.02-.43 1.47-.09z" />
                        </g>
                    </g>
                );
            case 11:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#42210b"}>
                            <path d="M57.32 64.56s1.85-.76 3.44-.82c3.04-.11 4.46.8 4.46.8s.08-2.05-1.34-2.82c-1.17-.64-2.28-1-4.27-.3-1.99.69-2.93 2.6-2.29 3.14zM92.71 64.02s1.72-.71 3.21-.76c2.83-.11 4.16.74 4.16.74s.07-1.91-1.25-2.63c-1.09-.59-2.12-.93-3.98-.28-1.86.64-2.73 2.43-2.14 2.93z" />
                        </g>
                    </g>
                );
            case 12:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#42210b"}>
                            <path d="M56.23 63.73s2.2.12 4.4-.81c3.34-1.41 3.98-3.53 4.98-3.24.81.23.13 2.9-1.97 4.28a8.434 8.434 0 01-4.63 1.39c-1.97 0-2.78-.81-2.78-1.62zM100.97 64.21s-1.94.1-3.87-.71c-2.94-1.24-3.5-3.11-4.38-2.85-.71.2-.12 2.56 1.73 3.77 1.37.9 2.82 1.22 4.08 1.22 1.73 0 2.44-.71 2.44-1.43z" />
                        </g>
                    </g>
                );
            case 13:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={this.props.activeHairColor != null ? this.props.activeHairColor : "#42210b"}>
                            <path d="M57.14 61.98c-1.28.79 1.66 2.52 2.25 2.77 1.58.66 3.28 1 4.99.98.4 0 .82-.03 1.18-.23.62-.35.7-.93.12-1.4-.27-.22-.59-.33-.92-.45-2.09-.73-4.19-1.44-6.37-1.81-.33-.06-.68-.1-.99.02-.1.03-.19.07-.26.12zM89.67 66.07c-.85.07-.83-2.36.33-2.97 1.64-.87 5.22-2.47 6.96-1.84 2.49.91 2.11 2.41 1.46 2.28-.65-.13-2.21-.47-3.81.3-1.25.59-3.53 2.11-4.94 2.23z" />
                        </g>
                    </g>
                );
        }
    }
    render() {

        if (this.props.type == 'button') {
            return (
                <div className={`vectorBtn ${this.props.locked ? 'locked' : ''}`} style={{ backgroundColor: '#F9F9F9', width: 100, marginHorizontal: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderColor: this.props.selected ? '#6AC3DB' : '#E5E5E5', borderWidth: this.props.selected ? 3 : 1 }}
                    onClick={() => {
                        this.props.OnItemSelected();


                    }}>

                    {
                        this.props.locked
                            ?
                            <img
                                src={'../../../../assets/images/lockIcon.png'}
                                width="35"
                                style={{
                                    position: 'absolute',
                                    top: -1,
                                    right: 0
                                }}
                            />
                            : null
                    }
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ height: 100, width: 100, }}>

                        <g transform={`scale(${this.props.z})`}>
                            {
                                this.renderSVG(this.props.targetId)
                            }
                        </g>
                    </svg>
                    {this.props.locked &&
                        <div className="itempoints">
                            {this.props.points} {i18next.t('levelsMap.points')}
                        </div>
                    }
                </div>
            );
        } else {
            return (
                <g>
                    {
                        this.renderSVG(this.props.targetId)
                    }
                </g>
            );
        }
    }
}

export default HumanEyeBrows;
