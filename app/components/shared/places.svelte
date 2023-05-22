<script>
    let places = [
        {icon:'🏠', name:'Zu Hause', address:'Musterstraße 23, 50733 Köln', id: 0},
        {icon:'🏫', name:'Schule', address:'Musterstraße 25, 50733 Köln', id: 1},
        {icon:'🏋🏽‍♂️', name:'Fitti', address:'Musterstraße 28, 50733 Köln', id: 2},
        {icon:'🧙🏽‍♂️', name:'Freund', address:'Musterstraße 28, 50733 Köln', id: 3}
    ];
</script>


    <gridLayout columns="400" rows="auto, auto, auto, auto, auto, auto" horizontalAlignment="center">
        {#each places as place (place.id)}
            <gridLayout class="places" columns="*, 5*, *" rows="40,40" row={place.id} marginTop="32">
                <label class="fas" text={place.icon} row="0" col="0" rowSpan="2" horizontalAlignment="center"/>
                <label text={place.name} fontWeight="bold" row="0" col="1"  verticalAlignment="bottom"/>
                <label text={place.address} row="1" col="1" verticalAlignment="top" />
                <label class="fas" text="&#xf054;" row="0" col="2" rowSpan="2" horizontalAlignment="center" />
            </gridLayout>
        {/each}
    </gridLayout>




<style>
     .places{
        margin:auto;
        padding: auto;
        font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Regular-102';
        font-size: 16px;
        border-color: #3B5BDB;
        border: 50px solid #3B5BDB;
        background: #f1f1f1;
    }

    .places .fas{
        color: blue;
    }
</style>
