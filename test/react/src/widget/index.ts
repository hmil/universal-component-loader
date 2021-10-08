import { ReactEvents, ReactProps } from '@hmil/ucl-react';
import { ComponentBundle } from '@hmil/ucl-spec';
import type { MyReactComponentProps } from './MyReactComponent';

export const MyReactComponentSpec: ComponentBundle<ReactProps<MyReactComponentProps>, ReactEvents<MyReactComponentProps>> = {
    $$props: ['counter'],
    $$events: ['counterChange'],
    load: () => import('./MyReactComponent').then(() => {}),
    placeholder: `<span style="background-color: #88888880; width: 100px; text-align: center; display: inline-block;">...</span>`,
    TAG_NAME: 'my-react-component'
}
