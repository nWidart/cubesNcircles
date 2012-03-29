// creation of the canvas
var paper = new Raphael(document.getElementById('canvas_container'), 1024, 768);
var circles;
var centerX = 460;
 var centerY = 384;

// global variables.
var recordSales = new Array(39.8, 39.7, 39.8, 38.5, 38.2, 38.6, 36.9, 33.7, 32.2, 32, 33.6, 33.5, 31.9, 30.6, 27.5, 24.6, 22.2, 19.1),
    livemusicSales = new Array(11.7, 13.4, 12.8, 12.5, 13, 12.5, 12.8, 13.5, 13.5, 13.7, 14.8, 15.2, 16.5, 18.1, 19.4, 20.8, 22.2, 23.5),
    digitalSales = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.38, 1.2, 2.5, 4.5, 7, 10.7, 12.9, 14.8),
    musicSales = new Array(46, 46, 46, 46, 46, 48, 52, 54, 62, 76, 82, 82.3, 82.6, 81, 82, 82, 87, 89),
    gameSales = new Array(14, 12, 15, 18, 19, 20, 14.7, 20, 27, 23, 25.4, 29, 31.6, 41.7, 54, 60.4, 61.2, 62.5),
    movieTickets = new Array(5.1,5.29,5.59,6.77,7.3,7.48,8.13,9.7,13.5,16.4,17.8,21,25.5,26.3,27.7,29.4,31.8,32.5),
    dvdVod = new Array(22.75,25.11,35.61,36.23,38.7,43.52,43.87,53.4,52.2,59.6,64.2,61.3,55.5,55.3,52.3,52.6,55.2,54.7),
    gamesConsole = new Array(8.7,9,9.5,11,16,17.3,18.5,20,21.88,23.3,26.33,27.67,31.63,37.47,41.46,44.23,46.72,48.88);
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
        popup.css("display", "block");//pour faire apparaître la popup
        var popupNumber = $(this).parent().attr("title");
        var cx = circle.attr("cx");
        /*vous pouvez récupérer les coordonnées du centre du cercle comme ça, ça vous évite d'utiliser un tableau pour tout stocker*/
        var cy = circle.attr("cy");
        var p;
        /*option 1:  votre droite */
        // p = "M " + cx + " " + cy+ "L 875 65";

        /*option 2 la courbe*/
        // p = "M " + cx + " " + cy+ "Q 100 100  875 65";

        /*option 3 plusieurs droites*/
        if (cy < centerY)
            p = "M " + cx + " " + cy + " L" + cx + " " + "100 " + "L 875 65";
        else if (cx < centerX) /*en bas à gauche, ligne en trois partie partant vers la gauche */
            p = "M " + cx + " " + cy + " L" + 100 + " " + cy + "L 100 100  L 875 65";
        else
            p = "M " + cx + " " + cy + " L" + 800 + " " + cy + "L 800 100  L 875 65";
        var popupPath = paper.path(p);

        popupPath.attr({stroke:"#777", "stroke-opacity":".7", "stroke-width":"2"});
        /* ai rajouté stroke-width pour modifier la largeur du trait*/
        circle.pathToPopup = popupPath;
        /*je rajoute une variable au circle pour me rappeler du chemin dessiné , voir get_out_handler*/
        popup.html("<div>" + value + "</div>");
    };
}

function get_out_handler(circle) {
    return function (event) {
        circle.pathToPopup.remove();
        // popupPath.remove(); Ne va pas
    }
}

function hover_effect(circle) {
    circle.attr({"fill-opacity":".9"});
}


// Function to create the graphic ( circles and lines)
function create_graph(array, maxValue, radius, centerRadius, centerX, centerY, addCircle) {

    var albumLength = array.length;
    var step = Math.PI * 2 / albumLength;
    pathString = "";
    var legendesTextesArray = new Array(
        '<img src="http://fashx.com/wp-content/uploads/2012/01/spotify-logo.jpg" width="50" height="50"/><a href="www.google.com">Apple</a>',
        '<div id="1994"><h4>1994</h4><h5>In numbers:</h5><ul><li>Physical album sales : $39.8 billion.</li><li>Concert ticket sales : $11.7 billion</li></ul><h5>Main events:</h5><img src="http://fashx.com/wp-content/uploads/2012/01/spotify-logo.jpg" width="50" height="50"/><p>Napster arrives, 2 billion files are shared and 80 million people use it.</p></div>',
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
            c.attr({stroke:"#fff", "stroke-opacity":".4", fill:"90-#fff-#ccc", "fill-opacity":".7", "title":i});

            $(c.node).mouseenter(get_hover_handler(legText, c));
            $(c.node).mouseenter(hover_effect(c));
            $(c.node).mouseleave(get_out_handler(c));
            circles.push(c);
        }
    }
    pathString += "L" + centerX + " " + centerY + "z";
    return pathString;
}


//calling the function *create_graph

function reinit_all(industry) {
    paper.remove(); //on efface le graphe précédent
    paper = new Raphael(document.getElementById('canvas_container'), 1024, 768); /* et on recommence*/
    // creation of the grid circles
    if (industry == "music")
    {
    circles = [];
    for (var i = 5; i < 16; i += 1) {
        var multiplier = i * 20;
        paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
    }
    // creation of the center lines
    for (var i = 0; i < 18; i += 1) {
        var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
        if (i > 0) {
            el.rotate(i * 20, centerX, centerY);
        }
    }
        /*ici, les données chargées devraient dépendre du paramètre industry : music, media, ....*/
        var recordSalesPath = create_graph(recordSales, maxValue, radius, centerRadius, centerX, centerY, false),
            digitalSalesPath = create_graph(digitalSales, maxValue, radius, centerRadius, centerX, centerY, false),
            livemusicSalesPath = create_graph(livemusicSales, maxValue, radius, centerRadius, centerX, centerY, false),
            musicIndustrySalesPath = create_graph(musicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, false),
            globalMusicIndustrySalesPath = create_graph(globalMusicIndustrySales, maxValue, radius, centerRadius, centerX, centerY, true);
        // Drawing and styling the paths
        // Record sales style
        var second = paper.path(recordSalesPath)
            .toBack()
            .attr({
                "stroke-width":0,
                "fill":"#007E9A", // bleu
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 1000, "ease-in");

        // music industry sales style
        var third = paper.path(musicIndustrySalesPath)
            .toBack()
            .attr({
                "stroke-width":0,
                "fill":"#F5A400", // red
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 2000, "ease-in");
        // global music industry sales style
        var forth = paper.path(globalMusicIndustrySalesPath)
            .toBack()
            .attr({
                "stroke-width":0,
                "fill":"#A9121D", // red
                "fill-opacity":"0"
            }).animate({
                "fill-opacity":"1"
            }, 3000, "ease-in");
        // remplir le cercle du centre (noir)
        paper.circle(centerX, centerY, centerRadius)
            .attr({
                fill:"#333",
                stroke:"none"
            });


    $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
    });

    } else if (industry == "media") {
        circles = [];
        for (var i = 5; i < 16; i += 1) {
            var multiplier = i * 20;
            paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
        }
        // creation of the center lines
        for (var i = 0; i < 18; i += 1) {
            var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
            if (i > 0) {
                el.rotate(i * 20, centerX, centerY);
            }
        }
        var movieTicketsPath = create_graph(movieTickets, maxValue, radius, centerRadius, centerX, centerY, false),
            dvdVodPath = create_graph(dvdVod, maxValue, radius, centerRadius, centerX, centerY, true);
        var mtp = paper.path(dvdVodPath)// dernière
            .attr({
                "stroke-width":0,
                "fill":"#913402",
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 1000, "ease-in");
        var dvp = paper.path(movieTicketsPath)
            .attr({
                "stroke-width":0,
                "fill":"#685D47", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 2000, "ease-in");
    $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
    });

    } else if (industry == "games") {
        circles = [];
        for (var i = 5; i < 16; i += 1) {
            var multiplier = i * 20;
            paper.circle(centerX, centerY, 10 + multiplier).attr({"stroke":"#eee", "stroke-opacity":".1"}).toBack();
        }
        // creation of the center lines
        for (var i = 0; i < 18; i += 1) {
            var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier - 10)).attr({stroke:"#eee", "stroke-opacity":".1"}).toBack();
            if (i > 0) {
                el.rotate(i * 20, centerX, centerY);
            }
        }
        var gameSalesPath = create_graph(gameSales, maxValue, radius, centerRadius, centerX, centerY, true);
        var gameConsolePath = create_graph(gamesConsole, maxValue, radius, centerRadius, centerX, centerY, false);

        var gsp = paper.path(gameSalesPath)
            .attr({
                "stroke-width":0,
                "fill":"#f2b807", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 1000, "ease-in");
        var gcp = paper.path(gameConsolePath)
            .attr({
                "stroke-width":0,
                "fill":"#6A2EA6", // green
                "fill-opacity":"0"
            })
            .animate({
                "fill-opacity":"1"
            }, 2000, "ease-in");
        $.each(circles, function (i, c) {
        c.toFront();
        c.animate({'fill':'#666'}, 1000);
        });
    }
}

$('#navigation a').on('click', function (event) {
    var la_classe =  $(event.currentTarget).attr("class");
    console.log(la_classe); /*ça va écrire music, media ou games dans la console parce que j'ai rajouté les classes sur votre navigation*/
    reinit_all(la_classe);
});
// Games sales style
// Movie sales style

