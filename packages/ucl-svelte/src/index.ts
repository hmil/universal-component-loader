import { ComponentBundle } from "@hmil/ucl-spec";
import { onMount, SvelteComponentTyped } from 'svelte';
import TEMPLATE from "./template";
import {
    SvelteComponent,
    assign,
    bubble,
    detach,
    element,
    empty,
    exclude_internal_props,
    get_spread_update,
    init,
    insert,
    listen,
    noop,
    safe_not_equal,
    set_attributes,
    set_style
} from "svelte/internal";
// import { compile } from "svelte/compiler";

// const DEFAULT_PLACEHOLDER = '<div>placeholder</div>';

export function loadComponent<P extends {}, E extends {}>(def: ComponentBundle<P, E>): { new (): SvelteComponentTyped<P, E, {}> } {

    // const js: string = compile(`
    //     <script>
    //         let loaded = false;
    //         onMount(() => {
    //             __loadDefinition().then(() => {
    //                 loaded = true;
    //             });
    //         });
    //     </script>

    //     {#if loaded}
    //         <${def.TAG_NAME} {...$$props} ${
    //             def.$$events.map(evt => `on:${evt}`)
    //         } on:secondEvent />
    //     {:else}
    //         ${def.placeholder ?? DEFAULT_PLACEHOLDER}
    //     {/if}
    // `).js.code;

    // const replaced = js
    //     .replace(/import \{([\s\S]*)\} from ['"]svelte\/internal['"];?/m, 'const {$1} = svelte_internal;')
    //     .replace(/export default (.+?);/, 'return $1;');

    // console.log(replaced);
    const js = compileComponent(def);
    const fn = new Function('svelte_internal', 'onMount', '__loadDefinition', js);

    return fn({
        SvelteComponent,
        assign,
        bubble,
        detach,
        element,
        empty,
        exclude_internal_props,
        get_spread_update,
        init,
        insert,
        listen,
        noop,
        safe_not_equal,
        set_attributes,
        set_style
    }, onMount, def.load);
}


function compileComponent(def: ComponentBundle) {
    return TEMPLATE
        .replace('__TAG_NAME__', def.TAG_NAME)
        .replace('__LISTENERS__', def.$$events.map(evtName => `listen(my_svelte_component, "${String(evtName)}", /*events_handler*/ ctx[2]),`).join(','));
    
}
