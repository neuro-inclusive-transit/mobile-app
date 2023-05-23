

<script lang="ts">
    import { ActionBar, StackLayout, TabView, TextField } from '@nativescript/core';
    import Home from './components/Home.svelte';
</script>

<frame>
    <Home />
</frame>



<style>

    .places{
       margin:auto;
       padding: auto;
       font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Regular-102';
       font-size: 16px;
       border-color: #3B5BDB;
       border: 50px solid #3B5BDB;
       background: white;
   }

   .places .fas{
       color: blue;
   }

   textField {
    background: white;
    border: 2px solid #3b5bdb;
    padding: 20;
    height: 40;
    width: 400;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    border-color: #3b5bdb;
    border-radius: 20;
    border-top-color: #3B5BDB;

   }


</style>
