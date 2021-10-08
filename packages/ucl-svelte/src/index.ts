import { ComponentBundle } from "@hmil/ucl-spec";
import { SvelteComponentTyped } from 'svelte';
import { generateComponent } from './template';

export function loadComponent<P extends {}, E extends {}>(def: ComponentBundle<P, E>): { new (): SvelteComponentTyped<P, E, {}> } {
    return generateComponent(def.load, def.TAG_NAME, def.$$events);
}

