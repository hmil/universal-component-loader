import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

export default {
    input: {
        'main': 'src/main.ts',
        'widget/index': 'src/widget/index.ts'
    },
    external: [
        'svelte', 'svelte/internal', 'svelte/compiler',
        /^@hmil\//
    ],
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        typescript(),
        svelte({

            // Optionally, preprocess components with svelte.preprocess:
            // https://svelte.dev/docs#svelte_preprocess
            preprocess: sveltePreprocess({ sourceMap: false }),

            // Emit CSS as "files" for other plugins to process. default is true
            emitCss: false,

            // Warnings are normally passed straight to Rollup. You can
            // optionally handle them here, for example to squelch
            // warnings with a particular code
            // onwarn: (warning, handler) => {
            //     // e.g. don't warn on <marquee> elements, cos they're cool
            //     if (warning.code === 'a11y-distracting-elements') return;

            //     // let Rollup handle all other warnings normally
            //     handler(warning);
            // },

            compilerOptions: {
                customElement: true
            }
        }),
        // see NOTICE below
        resolve({ browser: true }),
        // ...
    ]
}