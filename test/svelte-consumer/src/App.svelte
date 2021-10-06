<script lang="ts">
    import { MyReactComponentSpec } from '@hmil/test-react-producer';
    import { loadComponent } from '@hmil/ucl-svelte';
    import { MySvelteComponentSpec } from '@hmil/test-svelte-producer';


    const date = new Date();
    const NAMES = [ 'John', 'Akshay', 'Michel' ];
    let currentName = 0;

    $: user = {
        birthdate: date,
        name: NAMES[currentName]
    }

    function bumpName() {
        currentName = (currentName + 1) % NAMES.length;
    }

    const MyReactComponent = loadComponent(MyReactComponentSpec);
    const MySvelteComponent = loadComponent(MySvelteComponentSpec);
</script>

<main>
    <h1>Hello {user.name}!</h1>
    <button on:click={bumpName}></button>
    <MyReactComponent user={user} on:setUser={(evt) => {
        NAMES.push(evt.detail.name);
        currentName = NAMES.length - 1;
    }}/>
    <MySvelteComponent user={user} />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>