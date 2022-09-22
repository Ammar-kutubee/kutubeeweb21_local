import React, { Component } from 'react';

class AvatarSkinColorBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="vectorBtn"
                style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderColor: 'blue',
                    marginHorizontal: 100,
                    backgroundColor: this.props.color, borderWidth: this.props.selected ? 3 : 0
                }}
                onClick={() => {

                    console.log('this.props.index ', this.props.index);
                    this.props.onColorSelected();
                }}>
            </div>
        );
    }
}

export default AvatarSkinColorBtn;
