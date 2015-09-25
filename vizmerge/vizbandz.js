if (Meteor.isClient) {

    Template.map.rendered = function() {
        L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
        var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
        
        /*var attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var layer = new L.TileLayer(url, {
            minZoom: 1,
            maxZoom: 16,
            attribution: attrib
        });

        var map = L.map('map').setView([37.8, -96.9], zoom  = 4);
        map.addLayer(layer);
        */
        var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
    .addLayer(new L.TileLayer(url));
        this.map = map;
        var svg = d3.select(map.getPanes().overlayPane).append("svg");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");
        d3.json("us-states.json", function(collection) {
            var transform = d3.geo.transform({
                    point: projectPoint
                }),
                path = d3.geo.path().projection(transform);

            console.log(collection)
            var feature = g.selectAll("path")
                .data(collection.features)
                .enter().append("path");

            map.on("viewreset", reset);
            //A rajouter pour garder la taille du SVG
            map.on("zoom", reset);

            reset();

            // Reposition the SVG to cover the features.
            function reset() {
                var bounds = path.bounds(collection),
                    topLeft = bounds[0],
                    bottomRight = bounds[1];

                svg.attr("width", bottomRight[0] - topLeft[0])
                    .attr("height", bottomRight[1] - topLeft[1])
                    .style("left", topLeft[0] + "px")
                    .style("top", topLeft[1] + "px");
console.log(svg);
console.log(g);
                g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                feature.attr("d", path);
            }

            // Use Leaflet to implement a D3 geometric transformation.
            function projectPoint(x, y) {
                var point = map.latLngToLayerPoint(new L.LatLng(y, x));
                this.stream.point(point.x, point.y);
            }
        });
    }
}
if (Meteor.isServer) {
    Meteor.startup(function() {})
}
