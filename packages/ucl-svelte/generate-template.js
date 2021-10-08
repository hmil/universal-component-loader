import { compile } from "svelte/compiler";


/**
 * This script compiles the generic component wrapper using the svelte compiler.
 * 
 * The generated code is then used as a template to create wrappers on the go.
 * 
 * The reason we take these steps offline is because we don't want to ship the entire svelte compiler
 * into user apps. That would defeat the whole point of using svelte in the first place.
 * 
 * By pre-compiling a generic component, and then hacking the resulting code on the fly
 */

const DEFAULT_PLACEHOLDER = '<div>placeholder</div>';

const js = compile(`
    <script>
        let loaded = false;
        onMount(() => {
            __loadDefinition().then(() => {
                loaded = true;
            });
        });
    </script>

    {#if loaded}
        <tag-name-replace-me {...$$props} on:firstEvent on:secondEvent />
    {:else}
        ${def.placeholder ?? DEFAULT_PLACEHOLDER}
    {/if}
`).js.code;

const replaced = js
    .replace(/import \{([\s\S]*)\} from ['"]svelte\/internal['"];?/m, 'const {$1} = svelte_internal;')
    .replace(/export default (.+?);/, 'return $1;');

console.log(replaced);