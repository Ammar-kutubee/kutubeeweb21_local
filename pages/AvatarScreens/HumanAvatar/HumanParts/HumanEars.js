import React, { Component } from 'react';

class HumanEars extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <g>
                <path
                    d="M43.51 76.69s-1.97-2.01-4.28-.63c-2.31 1.39-2.95 4.62-.4 8.95 2.54 4.33 6.35 3.99 6.64.46.29-3.52-1.96-8.78-1.96-8.78z"
                    fill={'' + this.props.activeSkinColor}
                />
                <path
                    d="M39.21 82.85s-1.7-2.66.26-4.22c1.96-1.56 3.7 4.68 3.23 6.53-.46 1.85-1.65 1.18-1.94-1.01-.29-2.2.12-3.58-.95-3.78-1.07-.21-.6 2.48-.6 2.48z"
                    fill={'' + this.props.innerEarColor}
                />
                <g>
                    <path
                        d="M113.82 76.7s1.97-2.01 4.28-.63c2.31 1.39 2.95 4.62.4 8.95-2.54 4.33-6.35 3.99-6.64.46-.29-3.52 1.96-8.78 1.96-8.78z"
                        fill={'' + this.props.activeSkinColor}
                    />
                    <path
                        d="M118.12 82.86s1.7-2.66-.26-4.22c-1.96-1.56-3.7 4.68-3.23 6.53.46 1.85 1.65 1.18 1.94-1.01.29-2.2-.12-3.58.95-3.78 1.07-.21.6 2.48.6 2.48z"
                        fill={'' + this.props.innerEarColor}
                    />
                </g>
            </g>
        );
    }
}

export default HumanEars;
