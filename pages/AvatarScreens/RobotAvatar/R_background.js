import React, { Component } from 'react';

class R_background extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderSVG = (keyId) => {
        switch (0) {
            case 0:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >

                    </g>
                );
        }
    }

    render() {
        if (this.props.type == 'button') {
            return (
                <div className="vectorBtn" style={{ backgroundColor: '#ffffff', width: 100, marginHorizontal: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 20, borderColor: this.props.selected ? '#6AC3DB' : '#E5E5E5', borderWidth: this.props.selected ? 3 : 1 }}
                    onClick={() => {
                        this.props.OnItemSelected();
                    }}>
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

export default R_background;
