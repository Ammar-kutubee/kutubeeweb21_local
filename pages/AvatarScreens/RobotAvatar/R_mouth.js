import React, { Component } from 'react';

class R_mouth extends Component {
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
                            d="M91.03 69.18c0 2.47-2.61 4.48-5.84 4.48H71.75c-3.22 0-5.84-2-5.84-4.48 0-2.47 2.61-4.48 5.84-4.48h13.44c3.23 0 5.84 2.01 5.84 4.48z"
                            fill="#fff"
                        />
                        <path fill="#000" d="M65.8 69.45v-.56l25.28.1-.01.56-25.27-.1z" />
                        <path fill="#fff" d="M68.88 64.98v8.63" />
                        <path fill="#000" d="M68.6 64.98h.56v8.63h-.56z" />
                        <path fill="#fff" d="M73.68 64.99v8.63" />
                        <path fill="#000" d="M73.4 64.99h.56v8.63h-.56z" />
                        <path fill="#fff" d="M78.48 65v8.64" />
                        <path fill="#000" d="M78.2 65h.56v8.63h-.56z" />
                        <g>
                            <path fill="#fff" d="M83.28 65.02v8.63" />
                            <path fill="#000" d="M83 65.02h.56v8.63H83z" />
                        </g>
                        <g>
                            <path fill="#fff" d="M88.09 65.03v8.63" />
                            <path fill="#000" d="M87.8 65.03h.56v8.63h-.56z" />
                        </g>
                        <g>
                            <path fill="#000" d="M71.43 74.51c-3.56-.01-6.6-2.21-6.63-5.22.03-3.01 3.07-5.21 6.63-5.22H85.4c3.56.01 6.6 2.21 6.63 5.22-.03 3.01-3.07 5.21-6.63 5.22H71.43zm-3.95-8.06c-.99.76-1.55 1.76-1.56 2.84 0 1.08.57 2.08 1.56 2.84.99.76 2.39 1.25 3.95 1.25H85.4c1.56 0 2.96-.49 3.95-1.25.99-.76 1.56-1.76 1.56-2.84 0-1.08-.57-2.08-1.56-2.84-.99-.76-2.39-1.25-3.95-1.25H71.43h-.01c-1.55.01-2.95.49-3.94 1.25z" />
                        </g>
                    </g>
                );

            case 1:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path fill="#000" d="M91.15 67.79H65.68c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h25.48c.83 0 1.5-.67 1.5-1.5s-.68-1.5-1.51-1.5zm-3.9 2.31H69.42c-.58 0-1.05-.38-1.05-.85s.47-.85 1.05-.85h17.84c.58 0 1.05.38 1.05.85-.01.47-.48.85-1.06.85z" />
                        <path
                            d="M87.25 68.41H69.42c-.58 0-1.05.38-1.05.85s.47.85 1.05.85h17.84c.58 0 1.05-.38 1.05-.85-.01-.47-.48-.85-1.06-.85z"
                            fill="#fff"
                        />
                    </g>
                );
            case 2:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path fill="#000" d="M84.43 67.7h-2.46c.44 0 .8.36.8.8s-.36.8-.8.8h-7.1c-.44 0-.8-.36-.8-.8s.36-.8.8-.8H72.4c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6h12.02c.88 0 1.6-.72 1.6-1.6 0-.89-.71-1.6-1.59-1.6z" />
                        <path
                            d="M74.06 68.5c0 .44.36.8.8.8h7.1c.44 0 .8-.36.8-.8s-.36-.8-.8-.8h-7.1c-.44 0-.8.36-.8.8z"
                            fill="#fff"
                        />
                    </g>
                );
            case 3:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path fill="#000" d="M98.14 66.43H58.69c-1.98 0-3.59 1.28-3.59 2.87 0 1.58 1.61 2.87 3.59 2.87h39.44c1.98 0 3.59-1.28 3.59-2.87s-1.6-2.87-3.58-2.87zm.14 1.73H58.55a.85.85 0 110-1.7h39.73a.85.85 0 110 1.7z" />
                        <path
                            d="M98.28 66.45H58.55a.85.85 0 100 1.7h39.73a.85.85 0 100-1.7z"
                            fill="#fff"
                        />
                    </g>
                );
            case 4:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path fill="#000" d="M78.41 65.56c-2.23 0-4.03 1.67-4.03 3.73s1.81 3.73 4.03 3.73c2.23 0 4.03-1.67 4.03-3.73.01-2.06-1.8-3.73-4.03-3.73zm0 3.73c-1.53 0-2.77-.8-2.77-1.78 0-.99 1.24-1.78 2.77-1.78s2.77.8 2.77 1.78c.01.99-1.23 1.78-2.77 1.78z" />
                        <path
                            d="M78.41 65.73c-1.53 0-2.77.8-2.77 1.78 0 .99 1.24 1.78 2.77 1.78s2.77-.8 2.77-1.78c.01-.99-1.23-1.78-2.77-1.78z"
                            fill="#fff"
                        />
                    </g>
                );
            case 5:
                return (
                    <g transform={`translate(${this.props.x}, ${this.props.y})`} >
                        <path fill="#000" d="M82.83 67.09h-8.82c-1.22 0-2.21.99-2.21 2.21s.99 2.2 2.21 2.2h8.82a2.2 2.2 0 002.2-2.2c0-1.22-.99-2.21-2.2-2.21zm-5.61 1.24H74.9c-.34 0-.61-.28-.61-.61 0-.34.27-.61.61-.61h2.32c.34 0 .61.27.61.61a.6.6 0 01-.61.61zm4.71 0h-2.32c-.34 0-.61-.28-.61-.61 0-.34.27-.61.61-.61h2.32c.34 0 .61.27.61.61a.6.6 0 01-.61.61z" />
                        <path
                            d="M77.22 67.1H74.9c-.34 0-.61.27-.61.61 0 .34.27.61.61.61h2.32c.34 0 .61-.28.61-.61a.606.606 0 00-.61-.61zM81.93 67.1h-2.32c-.34 0-.61.27-.61.61 0 .34.27.61.61.61h2.32c.34 0 .61-.28.61-.61a.606.606 0 00-.61-.61z"
                            fill="#fff"
                        />
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

export default R_mouth;
