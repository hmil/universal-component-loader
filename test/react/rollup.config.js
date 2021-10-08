import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
    input: {
        'main': 'src/main.ts',
        'widget/index': 'src/widget/index.ts'
    },
    external: [
        'react', 'react-dom', 'styled-components',
        /^@hmil\//
    ],
    output: {
        dir: 'dist',
        format: 'es'
    },
    plugins: [
        typescript(),
        // see NOTICE below
        resolve({ browser: true }),
        // ...
    ]
}