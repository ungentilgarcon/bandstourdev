if (Meteor.isClient) {
    Template.map.helpers({
        counter: function() {
            return Session.get('counter');
        }
    });

    Template.map.rendered = function() {
        L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';


        var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
        var attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var layer = new L.TileLayer(url, {
            minZoom: 1,
            maxZoom: 16,
            attribution: attrib
        });

        var map = L.map('map').setView([51.505, -0.09], 13);
        map.addLayer(layer);
        this.map = map;
        var svg = d3.select(map.getPanes().overlayPane).append("svg");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");

                     /*D3js*/
                    coordd3 = [];

                    var circle = g.append("circle")
                        .attr("cx", 51.505)
                        .attr("cy", -0.09)
                        .attr("r", 25);
                        console.log("g.circle",g.circle)
                   var circle = g.append("circle")
                        .attr("cx", 51.88)
                        .attr("cy", 44)
                        .attr("r", 25);
                        console.log("g.circle",g.circle)

}
}
if (Meteor.isServer) {
    Meteor.startup(function() {
       
})}