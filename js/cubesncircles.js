var paper = new Raphael(document.getElementById('canvas_container'), 1400,1000);
// var startAxisX = 20;
// var startAxisY = 480;
// var x_axis = paper.path('M ' + startAxisX + ' ' + startAxisY + ' l 1000 0');
// var y_axis = paper.path('M ' + startAxisX + ' ' + startAxisY + ' l 0 -700');
// var multiplierX = 40;
// var multiplierY = 10;

// // paper.path('M 40 470 l 0 20 ');
// // paper.path('M 80 470 l 0 20 ');

// // creation axe x
// for(var i = 0; i < 18; i+=1) {
// 	if(i>0){
// 		var multiplier = 40;
// 		paper.path('M ' + (i*multiplier) + ' 470 l 0 20 ');
// 	}
// }
// // creation axe y
// for(var n = 0; n < 48; n+=1) {
// 	if (n>0) {
// 		var multiplier = 10;
// 		paper.path('M 15 ' + (n*multiplier) + ' l 10 0');
// 	}
// }


var centerX = 600;
var centerY = 370;




// var albumSalesGraph = 'M 20  ' + (f*parseFloat(multiplierY));
// for (var i = 1; i < albumLength; i+=1) {
// 	var d = albumSales[i];
// 	var nextLine = ' L ' + (i*multiplierX) + ' ' + (d*multiplierY);

// 	albumSalesGraph = albumSalesGraph + nextLine;
// }
// paper.path(albumSalesGraph);

for (var i = 5; i < 14; i+=1) {
	var multiplier = i*20;
	paper.circle(centerX, centerY, 10+multiplier).attr({"stroke":"#eee", "stroke-opacity":".3"}).toBack();
}

for (var i = 0; i < 18; i+=1) {
	var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier-10) ).attr({stroke:"#eee", "stroke-opacity":".3"}).toBack();
	if(i>0){
		el.rotate(i*20, centerX, centerY);
	}
}


// les valeurs nombre de vente
var albumSales = new Array(39.7, 39.8, 38.5, 38.2, 38.6, 36.9, 34.6, 32.2, 32, 33.6, 33.5, 31.9, 30.6, 27.5, 24.6, 22.2, 19.9,20);
var digitalSales = new Array(0,0,0,0,0,0,0,0,0,0,0.38,1.2,2.5,4.5,7,10.7,12.9,14.8);
var thirdSale = new Array(35,37.3,38.4,41,46,47.8,52,53.2,52,55,82,82.3,82,81,80,82,87,89);
var maxValue = 90; // valeur maximum
var radius = 150; // rayon du cercle
var centerRadius = 91;
var albumLength = albumSales.length;
var step = Math.PI * 2 / albumLength;
var pathString = "";
var pathString2 = "";
var pathString3 = "";


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
var albumSalesPath = create_graph(albumSales,maxValue,radius,centerRadius,centerX,centerY,false);
var digitalSalesPath = create_graph(digitalSales,maxValue,radius,centerRadius,centerX,centerY,false);
var thirdSalePath = create_graph(thirdSale,maxValue,radius,centerRadius,centerX,centerY,true);


// Ajout de textes
var text = paper.text(800,40,"Call of Duty: Modern Warfare 2, was the number one selling video game of 2009.\nThe game sold 11.86 million copies in stores and through legitimate vendors.4.1\n million copies of the game was illegally pirated off of bit-torrent sites in 2009.")
	.attr({
		"font-size":"14",
		fill: "black",
		"text-anchor":"start"
	});




// ajout des styles au PATHS
// Digital sales style

paper.path( digitalSalesPath )
	.toBack()
	.attr({
		"stroke-width": 0,
		"fill":"150-#005A91-#0085C7", // blue
		"fill-opacity": ".75"
	});
	// Albums sales style
paper.path( albumSalesPath )
	.toBack()
	.attr({
		"stroke-width": 0,
		"fill":"90-#4F983E-#4E9D66", // green
		"fill-opacity": ".75"
	});

// third sales style
var third = 
paper.path( thirdSalePath )
	.toBack()
	.attr({
		"stroke-width": 0,
		fill: "90-#E22E18-#8E1A24", // rouge
		"fill-opacity": "0"
	})
	.animate({
		"fill-opacity":".75"
	},3000, "ease-in");



// remplir le cercle du centre (noir)
paper.circle( centerX, centerY, centerRadius )
	.attr({
		fill:"#333",
		stroke: "none"
		// fill: "r#fff-#000"
	});
