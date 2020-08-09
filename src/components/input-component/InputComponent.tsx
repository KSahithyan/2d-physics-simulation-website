import React, { ChangeEvent } from 'react';
const css = require('./input-component.css');

interface PropTypes {
    type?: string,
    placeholder?: string,
    id?: string,
    label?: string,
    value: string,
    onChangeListener: (event: ChangeEvent<HTMLInputElement>) => void
}

export const InputComponent = (props: PropTypes) => {
    let id = props.id || props.label;
    return (
        <div className="input-container">
            {props.label ? <label htmlFor={id}>{props.label}</label> : null}
            <input
                type={props.type || 'text'}
                id={id} placeholder={props.placeholder || ''}
                value={props.value}
                disabled={true}
                onChange={e => props.onChangeListener(e)} ></input>
        </div>
    )
}