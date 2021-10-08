import * as React from "react";
import { defineReactElement } from '@hmil/ucl-react';
import { Counter } from '@hmil/test-common';

export interface User {
    name: string;
    birthdate: Date;
}

export interface MyReactComponentProps {
    counter: Counter;
    onCounterChange: (counter: Counter) => void;
}

const STYLES = {
    background: {
        display: 'block',
        backgroundImage: "url('/react-logo.svg')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        opacity: 0.5,
        position: 'absolute',
        backgroundPosition: 'center',
    } as React.CSSProperties,
    root: {
        display: 'block',
        position: 'relative',
        height: '100%',
        width: '100%',
        cursor: 'pointer'
    } as React.CSSProperties,
    text: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '1.5em',
        pointerEvents: 'none',
    } as React.CSSProperties,
    counter: {
        fontSize: '1em'
    } as React.CSSProperties
};

function MyReactComponent(props: MyReactComponentProps) {
    return (
        <div style={STYLES.root} onClick={() => props.onCounterChange({ count: props.counter.count + 1})}>
            <div style={STYLES.background} />
            <div style={STYLES.text}>
                <div>React</div>
                <div style={STYLES.counter}>{props.counter.count}</div>
            </div>
        </div>
    );
}

defineReactElement('my-react-component', MyReactComponent, {
    counter: {
        count: 0
    }
}, ['counterChange']);
