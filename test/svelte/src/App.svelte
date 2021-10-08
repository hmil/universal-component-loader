<svelte:options tag="my-svelte-app" />

<script lang="ts">
    import type { Counter } from '@hmil/test-common';
    import { MyReactComponentSpec } from '@hmil/test-react/widget';
    import { loadComponent } from '@hmil/ucl-svelte';
    import { MySvelteComponentSpec } from './widget';

    export let target: 'react' | 'svelte' = 'svelte';

    let counter: Counter = {
        count: 0
    };

    const MyReactComponent = loadComponent(MyReactComponentSpec);
    const MySvelteComponent = loadComponent(MySvelteComponentSpec);
</script>

<section class="container">
    <div class="thumbnail">
        {#if target === 'react'}
            <MyReactComponent counter={counter} on:counterChange={(evt) => counter = evt.detail } />
        {:else}
            <MySvelteComponent counter={counter} on:counterChange={(evt) => counter = evt.detail }/>
        {/if}
    </div>
    <img src="/arrow.svg" alt="included in">
    <div class="thumbnail">
        <MySvelteComponent counter={counter} on:counterChange={(evt) => counter = evt.detail } />
    </div>
</section>

<style>

.container {
    display: inline-flex;
    height: 100%;
}

.thumbnail {
    width: 100px;
    height: 100px;
}
</style>