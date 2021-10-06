import type { ComponentBundle } from '@hmil/ucl-spec';
import type { SvelteComponentTyped } from 'svelte';
import type Component from './MySvelteComponent.svelte';
import type { User } from './types';

type ComponentProps<T> = T extends SvelteComponentTyped<infer Props> ? Props : {};
type ComponentEvents<T> = T extends SvelteComponentTyped<{}, infer Events> ? Events : {};

export const MySvelteComponentSpec: ComponentBundle<{ 'user': User }, ComponentEvents<Component>> = {
    $$props: ['user'],
    $$events: ['hello'],
    load: () => new Promise((resolve) => window.setTimeout(() => resolve(import('./MySvelteComponent.svelte').then(() => {})), 1000)),
    placeholder: `<span style="background-color: #88888880; width: 100px; text-align: center; display: inline-block;">...</span>`,
    TAG_NAME: 'my-svelte-component'
}
