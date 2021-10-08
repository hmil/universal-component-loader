import { ComponentBundle } from "@hmil/ucl-spec";
import { onMount, SvelteComponentTyped } from 'svelte';
import * as svelte_internal from "svelte/internal";
import { compile } from "svelte/compiler";

const DEFAULT_PLACEHOLDER = '<div>placeholder</div>';

export function loadComponent<P extends {}, E extends {}>(def: ComponentBundle<P, E>): { new (): SvelteComponentTyped<P, E, {}> } {

    const js: string = compile(`
        <script>
            let loaded = false;
            onMount(() => {
                __loadDefinition().then(() => {
                    loaded = true;
                });
            });
        </script>

        {#if loaded}
            <${def.TAG_NAME} {...$$props} ${
                def.$$events.map(evt => `on:${evt}`)
            } />
        {:else}
            ${def.placeholder ?? DEFAULT_PLACEHOLDER}
        {/if}
    `).js.code;

    const replaced = js
        .replace(/import \{([\s\S]*)\} from ['"]svelte\/internal['"];?/m, 'const {$1} = svelte_internal;')
        .replace(/export default (.+?);/, 'return $1;');

    const fn = new Function('svelte_internal', 'onMount', '__loadDefinition', replaced);

    return fn({...svelte_internal, bubble: function () {
        console.log('bubble');
        // @ts-ignore
        svelte_internal.bubble.call(this, ...arguments);
    }}, onMount, def.load);
}