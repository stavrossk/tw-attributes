$(function() {
    var socket = io.connect(window.location.hostname);
    var r = Raphael('paper', 800, 800);
    socket.on('data', function(data) {
        var total = data.total;
        var attributes = [];
        for (var key in data.symbols) {
            var val = data.symbols[key] / total;
            if (isNaN(val)) {
                val = 0;
            }
            attributes.push(data.symbols[key]);
        }
        $('#last-update').text(new Date().toTimeString());
        var largest = Math.max.apply(Math, attributes); // 306
        
        r.clear();
        r.radar(400, 400, 300, attributes, {
            labels: ["strength", "accuracy", "intellect", "innovation", "stamina"],
            drawPathCircles: false,
            drawValues: true,
            drawLabels: true,
            max:largest,
            labelFontSize: 14,
            valueFontSize: 18,
            pathFill: '#444',
            pathStrokeWidth: 0,
            armFill: '#389090', //color of arm fill
            armStrokeWidth: 5, //width of arm stroke
            armStroke: '#389090', //color of arm stroke
            meshStroke: '#389090', //color of mesh stroke
            meshStrokeWidth: 5, //width of mesh stroke
            drawMesh: true //to draw mesh or not
        }); 

        attributes = [];
    });


})