<svelte:options tag="my-svelte-component" />

<script lang="ts">
    import type { Counter } from '@hmil/test-common';
    import { createElementDispatcher } from "../custom-element-fix";

    export let counter: Counter = {
        count: 0
    };
    const dispatch = createElementDispatcher<{
        'counterChange': Counter
    }>();

    function handleClick() {
        dispatch('counterChange', {
            count: counter.count + 1
        });
    }


</script>

<div on:click={handleClick}>
    <div class="background"></div>
    <div class="text-container">
        <div class="title">Svelte</div>
        <div class="count">{counter.count}</div>
    </div>
</div>


<style>

:host {
    display: block;
    position: relative;
    cursor: pointer;
    height: 100%;
    width: 100%;
}

.text-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.5em;
    pointer-events: none;
}

.background {
    display: block;
    background-image: url('/svelte-logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    opacity: 0.5;
    position: absolute;
    background-position: center;
}
</style>
