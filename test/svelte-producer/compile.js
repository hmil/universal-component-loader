const { compile, preprocess } = require('svelte/compiler');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');



async function run() {
    console.log(process.argv);
    const filename = process.argv[2];
    const code = readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

    const processed = await preprocess(code, sveltePreprocess({ sourceMap: false }), { filename });

    const res = compile(processed.code, {
        customElement: true
    });
    console.log(res.js.code);

    writeFileSync(path.join(__dirname, 'dist', path.basename(filename) + '.js'), res.js.code, 'utf-8');
}

run();
