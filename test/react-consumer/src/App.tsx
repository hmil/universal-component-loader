import * as React from "react";
import { MySvelteComponentSpec } from '@hmil/test-svelte-producer';
import { MyReactComponentSpec } from '@hmil/test-react-producer';
import { loadComponent } from '@hmil/ucl-react';

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
