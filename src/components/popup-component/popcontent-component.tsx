import React, { Component } from 'react';

interface PropTypes {
   isToggled?: boolean
}

export class PopContent extends Component<PropTypes> {
   render() {
      return (
        <div className={`popup-content ${this.props.isToggled ? 'toggled' : null}`}>
           {this.props.children}
        </div>
      )
   }
}