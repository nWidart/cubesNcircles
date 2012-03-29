// creation of the canvas
var paper = new Raphael(document.getElementById('canvas_container'), 1024, 668);

// creation of the grid circles
var centerX = 460;
var centerY = 384;
var circles = [];
for (var i = 5; i < 16; i += 1) {
    var multiplier = i * 20;
    paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".4"}).toBack();
}
// creation of the center lines
for (var i = 0; i < 18; i += 1) {
    var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".4"}).toBack();
    if (i > 0) {
        el.rotate(i * 20, centerX, centerY);
    }
}

// global variables.
var recordSales = new Array(39.8, 39.7, 39.8, 38.5, 38.2, 38.6, 36.9, 33.7, 32.2, 32, 33.6, 33.5, 31.9, 30.6, 27.5, 24.6, 22.2, 19.1),
    livemusicSales = new Array(11.7, 13.4, 12.8, 12.5, 13, 12.5, 12.8, 13.5, 13.5, 13.7, 14.8, 15.2, 16.5, 18.1, 19.4, 20.8, 22.2, 23.5),
    digitalSales = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.38, 1.2, 2.5, 4.5, 7, 10.7, 12.9, 14.8),
    musicSales = new Array(46, 46, 46, 46, 46, 48, 52, 54, 62, 76, 82, 82.3, 82.6, 81, 82, 82, 87, 89),
    gameSales = new Array(14, 12, 15, 18, 19, 20, 14.7, 20, 27, 23, 25.4, 29, 31.6, 41.7, 54, 60.4, 61.2, 62.5),
    maxValue = 90, // valeur maximum
    radius = 190, // rayon du cercle
    centerRadius = 130,
    albumSalesLength = recordSales.length,
    liveMusicSalesLength = livemusicSales.length,
    digitalSalesLength = digitalSales.length,
    pathString = "",
    pathString2 = "",
    pathString3 = "",
    musicIndustrySales = new Array(),
    globalMusicIndustrySales = new Array(),
    popupX = new Array (),
    popupY = new Array (),
    popupPath = '';

if (albumSalesLength == liveMusicSalesLength) {
    for (var i = 0; i < albumSalesLength; i++) {
        var sum = recordSales[i] + livemusicSales[i];
        musicIndustrySales.push(sum);
    }
}
var musicIndustrySalesLength = musicIndustrySales.length;
if (digitalSalesLength == musicIndustrySalesLength) {
    for (var i = 0; i < digitalSalesLength; i++) {
        var sum = digitalSales[i] + musicIndustrySales[i];
        globalMusicIndustrySales.push(sum);
    }
}

//popups hover
function get_hover_handler(value, circle) {
    return function (event) {
        var popup = $("#popup");
        popup.css("display", "block");
        //var popupNumber = $(this).parent().attr("title");
        //var popupPath = paper.path("M " + popupX[popupNumber] + " " + popupY[popupNumber] + "L 0 0");
        //popupPath.attr({stroke:"#777", "stroke-opacity":".7", fill:"#ccc", "fill-opacity":".7"});
        popup.html("<div>" + value + "</div>");
    };
}

function get_out_handler() {
    return function (event) {
        var popup = $("#popup");
        popup.css("display", "none");
    }
}
// ARRAY X POSITION - Y POSITION
var popupX = new Array ();
var popupY = new Array ();


// Function to create the graphic ( circles and lines)
function create_graph(array, maxValue, radius, centerRadius, centerX, centerY, addCircle) {

    var albumLength = array.length;
    var step = Math.PI * 2 / albumLength;
    pathString = "";
    var legendesTextesArray = new Array(
        '<img src="http://fashx.com/wp-content/uploads/2012/01/spotify-logo.jpg" width="50" height="50"/><a href="www.google.com">Apple</a>',
        'Banane',
        'spotify',
        'patate',
        'steam',
        'tomate',
        'Apple2',
        'Apple3',
        'Apple4',
        'Apple',
        'Apple',
        'Apple',
        'Apple',
        'Apple',
        'Apple',
        'Apple',
        'Apple',
        'Apple');
    for (var i = 0; i < albumLength; i++) {
        var angle = -(step * i + Math.PI);
        var sin = Math.sin(angle);
        var cos = -Math.cos(angle);
        var value = array[i];
        var legText = legendesTextesArray[i];
        var move;
        if (i === 0)
            move = "M ";
        else
            move = "L ";
        pathString += move + (centerX + sin * ( centerRadius + (value / maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value / maxValue) * radius ) );
        if (addCircle) {
            var c = paper.circle(centerX + sin * ( centerRadius + (value / maxValue) * radius ), centerY - cos * ( centerRadius + (value / maxValue) * radius ), 8);
            c.attr({stroke:"#777", "stroke-opacity":".7", fill:"#ccc", "fill-opacity":".7", "title": i});
            popupX[i] = centerX + sin * ( centerRadius + (value / maxValue) * radius );
            popupY[i] = centerY - cos * ( centerRadius + (value / maxValue) * radius );
            $(c.node).mouseenter(get_hover_handler(legText, c));
            // $(c.node).mouseleave(get_out_handler());
            circles.push(c);
        }
    }


    pathString += "L" + centerX + " " + centerY + "z";
    return pathString;
}

//calling the function *create_graph

var recordSalesPath = create_graph(recordSales, maxValue, radius, centerRadius, centerX, centerY, false),
    digitalSalesPath = create_graph(digitalSales, maxValue, radius, centerRadius, centerX, centerY, false),
    livemusicSalesPath = create_graph(livemusicSales, maxValue, radius, centerRadius, centerX, centerY, false),
    musicIndustrySalesPath = create_graph(musicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, false),
    globalMusicIndustrySalesPath = create_graph(globalMusicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, true);
$('circle').attr('class', 'mini-circle');
// Adding text -- not finished yet



// Drawing and styling the paths
// Record sales style
var second = paper.path(recordSalesPath)
    .toBack()
    .attr({
        "stroke-width":0,
        "fill":"90-#4F983E-#4E9D66", // green
        "fill-opacity":".75"
    })
    .animate({
        "fill-opacity":".75"
    }, 2000, "ease-in");

// music industry sales style
var second = paper.path(musicIndustrySalesPath)
    .toBack()
    .attr({
        "stroke-width":0,
        "fill":"150-#E22E18-#8E1A24", // red
        "fill-opacity":".0"
    });
// global music industry sales style
var second = paper.path(globalMusicIndustrySalesPath)
    .toBack()
    .attr({
        "stroke-width":0,
        "fill":"150-#005A91-#0085C7", // red
        "fill-opacity":".75"
    });
// remplir le cercle du centre (noir)
paper.circle(centerX, centerY, centerRadius)
    .attr({
        fill:"#333",
        stroke:"none"
    });

$.each(circles, function (i, c) {
    c.toFront();
    c.animate({'fill':'red'}, 1000);
});
// Games sales style
// Movie sales style