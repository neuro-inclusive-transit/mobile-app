<script>

    export let icon = '🏠';
    export let name = 'default Ort'
    export let address = 'Main Street 66, 12345 Cloud City';

</script>


    <gridLayout columns="400" rows="auto" horizontalAlignment="center">

            <gridLayout class="places" columns="*, 5*, *" rows="40,40" marginTop="32">
                <label class="fas" text={icon} row="0" col="0" rowSpan="2" horizontalAlignment="center"/>
                <label text={name} fontWeight="bold" row="0" col="1"  verticalAlignment="bottom"/>
                <label text={address} row="1" col="1" verticalAlignment="top" />
                <label class="fas" text="&#xf054;" row="0" col="2" rowSpan="2" horizontalAlignment="center" />
            </gridLayout>

    </gridLayout>




<style>
     .places{
        margin:auto;
        padding: auto;
        font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Regular-102';
        font-size: 16px;
        border-color: #3B5BDB;
        border-width: 2;
        background: white;
    }

    .places .fas{
        color: blue;
    }
</style>
