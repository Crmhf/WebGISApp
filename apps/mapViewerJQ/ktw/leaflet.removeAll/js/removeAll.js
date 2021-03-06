L.Control.RemoveAll = L.Control.extend(
    {
        options:
        {
            position: 'topleft',
        },
        onAdd: function (map) {
            var controlDiv = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
            L.DomEvent
                .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
                .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
                .addListener(controlDiv, 'click', function () {
                    drawnItems.clearLayers();
                });

            var controlUI = L.DomUtil.create('a', 'leaflet-draw-edit-remove', controlDiv);
            controlUI.title = 'Remove All Polygons';
            controlUI.href = '#';
            return controlDiv;
        }
    });
var removeAllControl = new L.Control.RemoveAll();
map.addControl(removeAllControl);