import * as React from "react";
import { MySvelteComponentSpec } from '@hmil/test-svelte/widget';
import { defineReactElement, loadComponent } from '@hmil/ucl-react';
import { MyReactComponentSpec } from "./widget";

const SvelteComponent = loadComponent(MySvelteComponentSpec);
const ReactComponent = loadComponent(MyReactComponentSpec);

export function App() {

    const [user, setUser] = React.useState({
        name: 'init',
        birthdate: new Date()
    })

    return <>
        <h1>Hello {user.name}</h1>
        <SvelteComponent user={user} />
        <ReactComponent user={user} title="hello" onSetUser={(evt) => setUser(evt.detail)} />
    </>;
}

defineReactElement('my-react-app', App, {
    user: { name: 'tmp', birthdate: new Date() },
    title: undefined
}, []);