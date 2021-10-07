import * as React from "react";
import { defineReactElement } from '@hmil/ucl-react';

export interface User {
    name: string;
    birthdate: Date;
}

export interface MyReactComponentProps {
    user: User;
    title?: string;
    onSetUser: (data: User) => void;
}

function MyReactComponent(props: MyReactComponentProps) {
    return <div onClick={() => {
        props.onSetUser({
        name: 'custom',
        birthdate: new Date()
    })}}>
        <h1>{ props.title }</h1>
        Hello {props.user.name}, ({props.user.birthdate.getFullYear()})!
    </div>;
}

defineReactElement('my-react-component', MyReactComponent, {
    user: { name: 'tmp', birthdate: new Date() },
    title: undefined
}, ['setUser']);
