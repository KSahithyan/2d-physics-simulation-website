import React, { Component, cloneElement, createElement, DetailedReactHTMLElement, ReactComponentElement } from 'react';
import { PopContent } from './popcontent-component';
const css = require("./popup-component.css");

interface StateTypes {
   isToggled: boolean
}

export class PopupComponent extends Component<any, StateTypes> {
   trigger: any;
   popContent: DetailedReactHTMLElement<{}, HTMLElement>;

   constructor(props) {
      super(props);

      this.state = {
         isToggled: true
      }
   }

   triggerClicked() {
      // console.log(this, 'working');
      let popCloserListener = () => {
         console.log('closing');
         this.setState({ isToggled: false });
      };

      // TODO Fix the logic here
      // if (!isToggled) {
      //    // popup will be shown
      //    if (!isPopupCloserAdded) {
      //       window.addEventListener('click', popCloserListener)
      //       console.log('aa');
      //       this.setState({ isPopupCloserAdded: true })
      //       console.log('111aa');
      //    }
      // } else {
      //    console.log('sss');
      //    // popup will be closed
      //    if (isPopupCloserAdded) {
      //       window.removeEventListener('click', popCloserListener);
      //       this.setState({ isPopupCloserAdded: false })
      //    }
      // }

      this.setState(state => ({ isToggled: !state.isToggled }));
   }

   render() {
      let popContent = cloneElement(this.props.children[1], {
         isToggled: this.state.isToggled
      })
      let trigger = cloneElement(this.props.children[0], {
         onClick: this.triggerClicked.bind(this)
      })

      return (
         <div className="popup-component">
            {trigger}
            {popContent}
         </div>
      )
   }
}