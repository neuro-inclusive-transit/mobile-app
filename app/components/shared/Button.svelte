<script>
    import { xlink_attr } from "svelte/internal";

    export let type = 'primary';
    export let flat = false;
    export let icon;
    export let inhalt = 'Neuer Knopf';

</script>


    <button class={type} class:flat={flat}>
        <formattedString>
            <span class="fas" text={icon} />
            <span text='  '/>
            <span text={inhalt}/>
        </formattedString>
    </button>


<style>
    button{
        border-radius: 100%;
        margin-top: 32;
        padding: 40px;
        font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Bold-102';
        font-weight: bold;
        font-size: 20;
        box-shadow: 4px 4px 4px rgba(0,0,0,0.7);
        height: 40;
        width: 400;


    }


    .primary{
        background-color:#3B5BDB;
        color: white;


    }

    .primary .fas{
        color: white;
    }

    .secondary{
        background-color: white;
        color: #3B5BDB;
        border-width: 2;
        border-color: #3B5BDB;

    }

    .secondary .fas{
        color: #3B5BDB;

    }
    .flat{
        box-shadow: none;
    }

    .line {
        background: #F2F4F8;
        text-decoration: underline;
        color: #3B5BDB;
        box-shadow: none;
    }

</style>
