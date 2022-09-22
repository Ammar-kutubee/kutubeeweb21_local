import React, { Component } from 'react';

class M_nose extends Component {
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
                        <path
                            d="M81.42 108.1h-.39v-2.92c0-1.09-.88-1.97-1.97-1.97-1.09 0-1.97.88-1.97 1.97v2.92h-.39c-.66 0-1.19.53-1.19 1.19s.53 1.19 1.19 1.19h4.71c.66 0 1.19-.53 1.19-1.19s-.52-1.19-1.18-1.19z"
                            fill={this.props.activeHeadSkinColor != null ? this.props.activeHeadSkinColor : "#d88d73"}
                        />
                    </g>
                );
            case 1:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M80.41 109.61a1.53 1.53 0 11-3.06 0v-4.2a1.53 1.53 0 113.06 0v4.2z"
                            fill={this.props.activeHeadSkinColor != null ? this.props.activeHeadSkinColor : "#d88d73"}
                        />
                    </g>
                );
            case 2:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M82.56 107.09h-1.49v-.04c0-1.14-.92-2.06-2.06-2.06-1.14 0-2.06.92-2.06 2.06v.04h-1.49c-.94 0-1.7.76-1.7 1.71 0 .94.76 1.7 1.7 1.7h7.11c.94 0 1.7-.76 1.7-1.7-.01-.94-.77-1.71-1.71-1.71z"
                            fill={this.props.activeHeadSkinColor != null ? this.props.activeHeadSkinColor : "#dc6a42"}
                        />
                    </g>
                );
            case 3:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M77.63 110.6c-1.49 0-2.09-1.05-1.35-2.34l1.66-2.88c.74-1.29 1.96-1.29 2.7 0l1.66 2.88c.74 1.29.14 2.34-1.35 2.34h-3.32z"
                            fill={this.props.activeHeadSkinColor != null ? this.props.activeHeadSkinColor : "#c16161"}
                        />
                    </g>
                );
            case 4:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M78.94 103.81c-2.04 0-3.7 1.66-3.7 3.7 0 .9.32 1.72.85 2.36.68.82 1.7 1.34 2.85 1.34 1.15 0 2.17-.52 2.85-1.34a3.698 3.698 0 00-2.85-6.06z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill={this.props.activeHeadSkinColor != null ? this.props.activeHeadSkinColor : "#e52630"}
                        />
                        <path
                            d="M80.62 104.89c.52 0 .99.45.99.96 0 .47-.41.73-.86.63-.4-.09-.74-.44-.8-.82-.06-.41.21-.77.67-.77z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#fff"
                        />
                    </g>
                );
        }
    }
    render() {

        if (this.props.type == 'button') {
            return (
                <div className={`vectorBtn ${this.props.locked ? 'locked' : ''}`} style={{ backgroundColor: '#F9F9F9', width: 100, marginHorizontal: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderColor: this.props.selected ? '#6AC3DB' : '#E5E5E5', borderWidth: this.props.selected ? 3 : 1 }}
                    onClick={() => {
                        if (!this.props.locked) {
                            this.props.OnItemSelected();
                        }
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

export default M_nose;
