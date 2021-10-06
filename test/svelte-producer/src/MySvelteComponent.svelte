<svelte:options tag="my-svelte-component" />

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { User } from "./types";


    export let user: User = {
        name: 'test',
        birthdate: new Date()
    };

    const dispatch = createEventDispatcher();

    function sayHello() {
        dispatch('message', {
            text: 'Hello!'
        });
    }

</script>

<div>Hello {user.name} <button on:click={sayHello}></button></div>
