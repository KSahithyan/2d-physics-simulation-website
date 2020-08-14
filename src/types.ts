import {MouseEvent} from 'react';

export interface ControlButton {
    /**
     * Icon to show in the button
     */
    icon: string,
    /**
     * Function to call when button is clicked
     */
    onClickListener: (event: MouseEvent<HTMLElement>) => void
}

export interface ToolButton {
    /**
     * Icon to show in the button
     */
    icon: string,
    /**
     * Options to show in the popup
     */
    popOptions: PopOptions[]
}

export interface PopOptions {
    /**
     * Text to show
     */
    label: string,
    /**
     * Function to call when selected
     */
    onClickListener: (event: MouseEvent<HTMLElement>) => void
}

// RENDER
export interface Point {
    x: number,
    y: number
}