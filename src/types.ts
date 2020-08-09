import {MouseEvent} from 'react';

export interface ControlButton {
    icon: string,
    onClickListener: (event: MouseEvent<HTMLElement>) => void
}

export interface ToolButton {
    icon: string,
    onClickListener: (event: MouseEvent<HTMLElement>) => void
}

// RENDER
export interface Point {
    x: number,
    y: number
}