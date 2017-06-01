var canvas;
var context;
// var phi0 = 137.5 / 180.0 * Math.PI;
// var phi0 = 180 * (1 + Math.sqrt(5)) / 180.0 * Math.PI;
var phi0;
var c = 7;
var iterations = 5000;
var radius = 2;
var timestep = 0;

window.onload = function() {
    canvas = document.getElementById("gc");
    context = canvas.getContext("2d");
    var maxRadius = Math.sqrt(iterations) * c;
    canvas.width = canvas.height = 2 * maxRadius * 1.01;
}

function generate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    phi0 = parseFloat(document.getElementById("angle").value) / 180.0 * Math.PI;
    drawPoint(0);
}

function drawPoint(n) {
    if (n > iterations) {
        console.log("done");
        return;
    }
    context.beginPath();
    var r = c * Math.sqrt(n);
    var phi = n * phi0;
    var x = canvas.width / 2 + r * Math.cos(phi);
    var y = canvas.height / 2 - r * Math.sin(phi);
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = "hsl("  + ((phi / Math.PI * 180) % 256) + ", 100%, 50%)";
    context.fill();
    if (timestep > 0)
        setTimeout(function() { drawPoint(n + 1); }, timestep);
    else
        drawPoint(n + 1);
}
