import React from 'react';
import { InputComponent } from './../objects/index'
import { capitalize } from './../utils';

interface PropertiesGroupPropTypes {
    entry: [string, any[]]
}
const PropertiesGroup = (props: PropertiesGroupPropTypes) => {
    let title = capitalize(props.entry[0]);

    return (
        <div>
            <h4>{title}</h4>
            <div>
                {props.entry[1].map(a => <InputComponent key={a[0]} label={a[0]} value={a[1]} onChangeListener={this.getChange} />)}
            </div>
        </div>
    )
}

interface PropTypes {
    getSelectedObj: Function,
    timing: number,
    isPaused: Function
}
interface StateTypes {
    render: boolean
}
export class PropertiesContainer extends React.Component<PropTypes, StateTypes> {
    runner;

    constructor(props: PropTypes) {
        super(props);
        console.log(props);
        this.state = {
            render: true
        }
    }

    // update properties while simulation running
    extractProperties = (obj?: Object) => {
        if (obj == null) return;
        if (obj.hasOwnProperty('parent')) {delete obj['parent']}
        let entries = Object.entries(obj);
        let n = []
        for (let [key, val] of entries) {
            if (typeof val == 'string') { n.push([key,val]) }
            else if (val instanceof Array) {
                n.push([key, val.length]);
            }
            else if (typeof val == 'number') {
                n.push([key,val]);
            }
            else if (typeof val == 'object') {
                if (val != null) {
                    n.push([key, this.extractProperties(val)]);
                }
            }
        }
        return n;
    }
    getChange = (...a) => {
        console.log('change', a);
        console.log(a[0].target.value);
    }

    renderProperties() {
        this.setState(state => ({ render: !state.render }))
    }

    componentDidUpdate() {
        this.runner = setInterval(() => {
            if (!this.props.isPaused()) {
                this.renderProperties();
            }
        }, this.props.timing);
    }

    componentDidMount() {
        this.renderProperties();
    }


    render() {
        let properties = this.extractProperties(this.props.getSelectedObj()) || [];
        console.log('prop-r', properties);
        
        return (
            <div id="properties">
            {properties.map(entry => {
                return (
                    entry[1] instanceof Array ?
                    <PropertiesGroup key={entry[0]} entry={entry} /> :
                    <InputComponent key={entry[0]} label={capitalize(entry[0])} value={entry[1]} onChangeListener={this.getChange} />)
                })}
            </div>
        )
    }
}