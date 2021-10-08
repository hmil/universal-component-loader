import * as React from "react";
import { MySvelteComponentSpec } from '@hmil/test-svelte/widget';
import { defineReactElement, loadComponent } from '@hmil/ucl-react';
import { MyReactComponentSpec } from "./widget";

const SvelteComponent = loadComponent(MySvelteComponentSpec);
const ReactComponent = loadComponent(MyReactComponentSpec);

const STYLES = {
    container: {
        display: 'inline-flex',
        height: '100%'
    } as React.CSSProperties,
    thumbnail: {
        width: '100px',
        height: '100px'
    }
}

export function App(props: { target: 'react' | 'svelte' }) {

    const [counter, setCounter] = React.useState({ count: 0 });

    return <section style={STYLES.container}>
        <div style={STYLES.thumbnail}>
            { props.target === 'svelte'
            ? <SvelteComponent counter={counter} onCounterChange={evt => setCounter(evt.detail)} />
            : <ReactComponent counter={counter} onCounterChange={evt => setCounter(evt.detail)} />
            }
        </div>
        <img src="/arrow.svg" alt="included in" />
        <div style={STYLES.thumbnail}>
            <ReactComponent counter={counter} onCounterChange={evt => setCounter(evt.detail)}/>
        </div>
    </section>;
}

defineReactElement('my-react-app', App, {
    target: 'react'
}, []);
