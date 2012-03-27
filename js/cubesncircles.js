var paper = new Raphael(document.getElementById('canvas_container'), 924,668);
var centerX = 512;
var centerY = 384;

for (var i = 5; i < 14; i+=1) {
	var multiplier = i*20;
	paper.circle(centerX, centerY, 10+multiplier).attr({"stroke":"#eee", "stroke-opacity":".4"}).toBack();
}

for (var i = 0; i < 18; i+=1) {
	var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier-10) ).attr({stroke:"#eee", "stroke-opacity":".4"}).toBack();
	if(i>0){
		el.rotate(i*20, centerX, centerY);
	}
}

// les valeurs nombre de vente
var recordSales = new Array(39.8, 39.7, 39.8, 38.5, 38.2, 38.6, 36.9, 33.7, 32.2, 32, 33.6, 33.5, 31.9, 30.6, 27.5, 24.6, 22.2, 19.1);
var digitalSales = new Array(0,0,0,0,0,0,0,0,0,0,0.38,1.2,2.5,4.5,7,10.7,12.9,14.8);
var livemusicSales = new Array(11.7, 13.4, 12.8, 12.5, 13, 12.5, 12.8, 13.5, 13.5, 13.7, 14.8, 15.2, 16.5, 18.1, 19.4, 20.8, 22.2, 23.5);
var musicSales = new Array(46, 46, 46, 46, 46, 48, 52, 54, 62, 76, 82, 82.3, 82.6, 81, 82, 82, 87, 89);
var gameSales = new Array(14, 12, 15, 18, 19, 20, 14.7, 20, 27, 23, 25.4, 29, 31.6, 41.7, 54, 60.4, 61.2, 62.5);
var maxValue = 90; // valeur maximum
var radius = 150; // rayon du cercle
var centerRadius = 91;
var albumLength = recordSales.length;
var step = Math.PI * 2 / albumLength;
var pathString = "";
var pathString2 = "";
var pathString3 = "";

// Function to create the graphic ( circles and lines)
function create_graph(array,maxValue,radius,centerRadius,centerX,centerY,addCircle) {
	var albumLength = array.length;
	var step = Math.PI * 2 / albumLength;
	pathString = "";

	for( var i = 0; i < albumLength; i++ ) {
		var angle = -(step*i + Math.PI);
		var sin = Math.sin(angle);
		var cos = -Math.cos(angle);
		var value = array[i];
		if(i == 0) {
			pathString += "M" + (centerX + sin * ( centerRadius + (value/maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value/maxValue) * radius ) );
			if (addCircle) paper.circle( centerX + sin * ( centerRadius + (value/maxValue) * radius ) , centerY - cos * ( centerRadius + (value/maxValue) * radius ), 5 ).attr({stroke:"#777", "stroke-opacity":".7"});
		} else {
			pathString += "L" + (centerX + sin * ( centerRadius + (value/maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value/maxValue) * radius ) );
			if(i != 1 && i != 3 && i != 6) {
				if (addCircle) paper.circle( centerX + sin * ( centerRadius + (value/maxValue) * radius ) , centerY - cos * ( centerRadius + (value/maxValue) * radius ), 5 ).attr({stroke:"#777", "stroke-opacity":".7"});
			}
		}
		
	}
	pathString += "L" + centerX + " " + centerY + "z";
	return pathString;
}

//calling the function *create_graph
var recordSalesPath = create_graph(recordSales,maxValue,radius,centerRadius,centerX,centerY,false);
var digitalSalesPath = create_graph(digitalSales,maxValue,radius,centerRadius,centerX,centerY,false);
var livemusicSalesPath = create_graph(livemusicSales,maxValue,radius,centerRadius,centerX,centerY,true);

// Adding text -- not finished yet
var text = paper.text(800,40,"Call of Duty: Modern Warfare 2, was the number one selling video game of 2009.\nThe game sold 11.86 million copies in stores and through legitimate vendors.4.1\n million copies of the game was illegally pirated off of bit-torrent sites in 2009.")
	.attr({
		"font-size":"14",
		fill: "black",
		"text-anchor":"start"
	});

// Drawing and styling the paths
// Digital sales style
 var first = paper.path( digitalSalesPath )
	.toBack()
	.attr({
		"stroke-width": 0,
		"fill":"150-#005A91-#0085C7", // blue
		"fill-opacity": ".75"
	})
	.animate({
		"fill-opacity":".75"
	},1000, "ease-in");

// Live music sales style
var third = paper.path( livemusicSalesPath )
	.toBack()
	.attr({
		"stroke-width": 0,
		fill: "150-#E22E18-#8E1A24", // rouge
		"fill-opacity": "0",
	})
	.animate({
		"fill-opacity":".55"
	},2000, "ease-in");

// Record sales style
var second = paper.path( recordSalesPath )
	.toBack()
	.attr({
		"stroke-width": 0,
		"fill":"90-#4F983E-#4E9D66", // green
		"fill-opacity": ".75"
	})
	.animate({
		"fill-opacity":".75"
	},2000, "ease-in");



// remplir le cercle du centre (noir)
paper.circle( centerX, centerY, centerRadius )
	.attr({
		fill:"#333",
		stroke: "none"
	});

// Games sales style


//Movie sales style






