import { ReactEvents, ReactProps } from '@hmil/ucl-react';
import { ComponentBundle } from '@hmil/ucl-spec';
import type { MyReactComponentProps } from './MyReactComponent';

export const MyReactComponentSpec: ComponentBundle<ReactProps<MyReactComponentProps>, ReactEvents<MyReactComponentProps>> = {
    $$props: ['user'],
    $$events: ['setUser'],
    load: () => new Promise((resolve) => window.setTimeout(() => resolve(import('./MyReactComponent').then(() => {})), 1000)),
    placeholder: `<span style="background-color: #88888880; width: 100px; text-align: center; display: inline-block;">...</span>`,
    TAG_NAME: 'my-react-component'
}
