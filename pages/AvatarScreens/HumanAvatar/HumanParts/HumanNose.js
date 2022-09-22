import i18next from 'i18next';
import React, { Component } from 'react';

class HumanNose extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    renderSVG = (keyId) => {
        console.log(this.props.innerEarColor)
        switch (keyId) {
            case 0:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#e98146"}>
                            <path d="M78.61 79.07s-1.02-.05-1.95.42c-.93.48-1.36 1.45-1.36 1.45s.2-2.77 3.31-2.77v.9zM78.61 79.07s1.02-.05 1.95.42c.93.48 1.36 1.45 1.36 1.45s-.2-2.77-3.31-2.77v.9z" />
                        </g>
                    </g>
                );
            case 1:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#f88054"}>
                            <path d="M78.61 80.84s-1.34-.35-1.83-.72c-.48-.38-.54.27-1.42.21s-.32-2.93 3.25-2.93v3.44zM78.61 80.84s1.34-.35 1.83-.72c.48-.38.54.27 1.42.21.89-.05.32-2.93-3.25-2.93v3.44z" />
                        </g>
                    </g>
                );
            case 2:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#d88a55"}>
                            <path d="M78.61 78.11s-.79-.02-1.56.45c-.77.47-1.15 1.42-1.31 1.45-.16.04-.08-1.5.72-2.11 1.13-.88 2.15-.78 2.15-.78v.99zM78.61 78.11s.79-.02 1.56.45c.77.47 1.15 1.42 1.31 1.45.16.04.08-1.5-.72-2.11-1.13-.88-2.15-.78-2.15-.78v.99z" />
                        </g>
                    </g>
                );
            case 3:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path
                            d="M83.39 78.56a4.78 4.78 0 10-9.56 0 4.78 4.78 0 009.56 0z"
                            fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#f22f14"}
                        />
                    </g>
                );
            case 4:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#e98146"}>
                            <path d="M78.63 78.79s-1.69.12-2.27-.76c-.59-.88-.72-1.05-.69-.54.03.5.32 2.53 2.98 2.5-.02-.64-.02-1.2-.02-1.2z" />
                            <path d="M78.63 78.79s1.69.08 2.25-.82c.57-.89.7-1.06.68-.56-.02.5-.26 2.53-2.92 2.56-.01-.62-.01-1.18-.01-1.18z" />
                        </g>
                    </g>
                );
            case 5:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <g fill={'' + this.props.innerEarColor != null ? this.props.innerEarColor : "#e98146"}>
                            <path d="M78.61 80.6s-2.3-.5-3.36-1.3c-1.01-.75-.47-.94.53-.68 1 .26 2.83.26 2.83.26v1.72zM78.61 80.6s2.3-.5 3.36-1.3c1.01-.75.47-.94-.53-.68-1 .26-2.83.26-2.83.26v1.72z" />
                        </g>
                    </g>
                );

            case 6:

                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <mask
                            maskUnits="userSpaceOnUse"
                            x={75.31}
                            y={73.63}
                            width={4.57}
                            height={7.52}
                            id="prefix__c"
                        >
                            <g filter="url(#prefix__a)">
                                <radialgradient
                                    id="prefix__d"
                                    cx={-24.258}
                                    cy={227.361}
                                    r={4.325}
                                    gradientTransform="rotate(-4.863 -1739.126 -1052.788)"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset={0} stopColor="#fff" />
                                    <stop offset={0.088} stopColor="#f8f8f8" />
                                    <stop offset={0.217} stopColor="#e4e4e4" />
                                    <stop offset={0.371} stopColor="#c4c4c4" />
                                    <stop offset={0.544} stopColor="#979797" />
                                    <stop offset={0.735} stopColor="#5d5d5d" />
                                    <stop offset={0.936} stopColor="#181818" />
                                    <stop offset={1} />
                                </radialgradient>
                                <path
                                    d="M79.42 73.81a.264.264 0 00-.32-.17c-.13.04-.07.05-.03.19.34 1.06.51 2.87.13 3.25-.03.03-.12.12-.4.04-1.13-.34-2.76-.42-3.3.36-.51.72.09 1.93.88 2.95.28.36.55.69.83.72.04 0 .07-.02.09-.05.04-.08.03-.23-.03-.31-1.44-1.96-1.32-2.73-1.11-3.02.36-.52 1.56-.45 2.51-.16.28.08.48.06.64 0 .11-.04.2-.11.26-.17.72-.74 0-3.15-.15-3.63z"
                                    mask="url(#prefix__c)"
                                    fill="url(#prefix__d)"
                                />
                            </g>
                        </mask>
                        <path
                            d="M79.42 73.81a.264.264 0 00-.32-.17c-.13.04-.07.05-.03.19.34 1.06.51 2.87.13 3.25-.03.03-.12.12-.4.04-1.13-.34-2.76-.42-3.3.36-.51.72.09 1.93.88 2.95.28.36.55.69.83.72.04 0 .07-.02.09-.05.04-.08.03-.23-.03-.31-1.44-1.96-1.32-2.73-1.11-3.02.36-.52 1.56-.45 2.51-.16.28.08.48.06.64 0 .11-.04.2-.11.26-.17.72-.74 0-3.15-.15-3.63z"
                            fill="#d88a55"
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
        // return (
        //     <g fill="#e98146">
        //         <path d="M78.61 79.07s-1.02-.05-1.95.42c-.93.48-1.36 1.45-1.36 1.45s.2-2.77 3.31-2.77v.9zM78.61 79.07s1.02-.05 1.95.42c.93.48 1.36 1.45 1.36 1.45s-.2-2.77-3.31-2.77v.9z" />
        //     </g>
        // );
    }
}

export default HumanNose;
