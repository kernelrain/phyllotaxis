var canvas;
var context;
// var phi0 = 137.5 / 180.0 * Math.PI;
// var phi0 = 180 * (1 + Math.sqrt(5)) / 180.0 * Math.PI;
var phi0;
var c;
var iterations;
var radius = 2;
var timestep = 0;

window.onload = function() {
    canvas = document.getElementById("gc");
    context = canvas.getContext("2d");
}

function generate() {
    iterations = parseInt(document.getElementById("N").value);
    c = parseFloat(document.getElementById("c").value);
    phi0 = eval(document.getElementById("angle").value.replace("pi", Math.PI)) / 180.0 * Math.PI;

    var maxRadius = Math.sqrt(iterations) * c;
    canvas.width = canvas.height = 2 * maxRadius * 1.01;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    console.log(iterations);
    console.log(phi0);
    console.log(c);

    drawPoints();
}

function drawPoints() {
    for (var n = 0; n < iterations; n++) {
        context.beginPath();
        var r = c * Math.sqrt(n);
        var phi = n * phi0;
        var x = canvas.width / 2 + r * Math.cos(phi);
        var y = canvas.height / 2 - r * Math.sin(phi);
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = "hsl("  + ((phi / Math.PI * 180) % 256) + ", 100%, 50%)";
        context.fill();
    }
}
