<script>
    import { xlink_attr } from "svelte/internal";

    export let type = 'primary';
    export let flat = false;

</script>

<button class={type} class:flat={flat}>
    <slot></slot>
</button>

<style>
    button{
        border: 0;
        cursor: pointer;
        border-radius: 100%;
        padding: 20px;
        font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Bold-102';
        font-weight: bold;
        font-size: 20;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
        height: 40px;

    }

    .primary{
        background-color:#3B5BDB;
        color: white;

    }

    .secondary{
        background-color: white;
        color: #3B5BDB;
        border: 2px solid #3B5BDB;

    }

    .flat{
        box-shadow: none;
    }

</style>
