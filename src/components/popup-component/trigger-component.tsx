import React, { Component, MouseEvent } from 'react';

interface PropTypes {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export class Trigger extends Component<PropTypes> {

    render() {
        // console.log('trigger', props);
        return (
            <button onClick={this.props.onClick} className="trigger-button">
                {this.props.children}
            </button>
        )
    }
}