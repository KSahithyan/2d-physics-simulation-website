import React, { ChangeEvent } from 'react';
const css = require('./input-component.css');

interface PropTypes {
    type?: string,
    placeholder?: string,
    id?: string,
    label?: string,
    value: string | number,
    size?: 'small' | 'normal',
    onChangeListener: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * @deprecated
 * Will be omitted in near future
 */
const InputComponent = (props: PropTypes) => {
    let id = props.id || props.label;
    let value = props.value;
    let size = props.size || 'normal';
    if (typeof props.value == 'number') {
        value = props.value.toFixed(3);
        if (Math.floor(props.value) == props.value) {
            value = props.value.toString();
        }
    }
    return (
        <div className={`input-container ${size}`}>
            {props.label ? <label htmlFor={id}>{props.label}</label> : null}
            <input
                type={props.type || 'text'}
                id={id} placeholder={props.placeholder || ''}
                value={value}
                disabled={true}
                onChange={e => props.onChangeListener(e)} ></input>
        </div>
    )
}