import type { ComponentBundle } from '@hmil/ucl-spec';
import type { SvelteComponentTyped } from 'svelte';
import type { Counter } from '@hmil/test-common';

type ComponentProps<T> = T extends SvelteComponentTyped<infer Props> ? Props : {};
type ComponentEvents<T> = T extends SvelteComponentTyped<{}, infer Events> ? Events : {};

export const MySvelteComponentSpec: ComponentBundle<{ counter: Counter }, { counterChange: CustomEvent<Counter> }> = {
    $$props: ['counter'],
    $$events: ['counterChange'],
    load: () => import('./MySvelteComponent.svelte').then(() => {}),
    placeholder: `<span style="background-color: #88888880; width: 100px; text-align: center; display: inline-block;">...</span>`,
    TAG_NAME: 'my-svelte-component'
}
