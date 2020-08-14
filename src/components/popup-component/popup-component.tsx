import React, { Component } from 'react';
const css = require("popup-component.css");

export class PopupComponent extends Component {
   render() {
      return (
        <div>
            {this.props.children}
        </div>
      )
   }
}