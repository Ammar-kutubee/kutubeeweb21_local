import React, { Component } from 'react';

class HumanFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <path
                d="M78.64 37.11h-.04c-41.85.01-37.23 32.35-33.38 49.29 3.85 16.94 27.27 17.41 27.27 17.41s.62 6.16-1.39 7.86c2.23 2.38 7.17 2.89 7.51 2.92h.04c.34-.03 5.28-.54 7.52-2.92-2-1.69-1.39-7.86-1.39-7.86s23.41-.46 27.26-17.41c3.85-16.94 8.47-49.28-33.4-49.29z"
                fill={'' + this.props.activeSkinColor}
            />
        );
    }
}

export default HumanFace;
