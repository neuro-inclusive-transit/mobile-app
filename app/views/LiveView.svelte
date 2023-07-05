<svelte:head>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
  </svelte:head>
<page>
  <actionBar title="Live-Ansicht1" />
  <body>
    <div id="map"></div>
    <script>
        var platform = new H.service.Platform({
            'apikey': '{21a_nQT3_Nu_NiApgSMX3C7qjUbL_pWLOU4_6s_GaHM}'
        });

        // Defautl map laden
        var defaultLayers = platform.createDefaultLayers();

        // Darstellung der Map
        var map = new H.Map(
            document.getElementById("map"),
            defaultLayers.vector.normal.map, {
                zoom: 14,
                center: { lat: 52.5, lng: 13.4 }
            });
        // im ganzen Container displayn
            window.addEventListener('resize', () => map.getViewPort().resize());
        // Behavior fuer die interactions (mobile touch sind auch dabei)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        // Ui components
        var ui = H.ui.UI.createDefault(map, defaultLayers);
    </script>
</body>
</page>
