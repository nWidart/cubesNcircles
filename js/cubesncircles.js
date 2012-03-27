var paper = new Raphael(document.getElementById('canvas_container'), 1200,500);
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


var centerX = 300;
var centerY = 200;




// var albumSalesGraph = 'M 20  ' + (f*parseFloat(multiplierY));
// for (var i = 1; i < albumLength; i+=1) {
// 	var d = albumSales[i];
// 	var nextLine = ' L ' + (i*multiplierX) + ' ' + (d*multiplierY);

// 	albumSalesGraph = albumSalesGraph + nextLine;
// }
// paper.path(albumSalesGraph);

for (var i = 5; i < 10; i+=1) {
	var multiplier = i*20;
	paper.circle(centerX, centerY, 10+multiplier);
}

for (var i = 0; i < 18; i+=1) {
	var el = paper.path('M ' + centerX + ' ' + centerY + ' l 0 ' + (-multiplier-10) );
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
var centerRadius = 100;
var albumLength = albumSales.length;
var step = Math.PI * 2 / albumLength;
var pathString = "";
var pathString2 = "";
var pathString3 = "";

function create_graph(array,maxValue,radius,centerRadius,centerX,centerY) {
	var albumLength = array.length;
	var step = Math.PI * 2 / albumLength;

	for( var i = 0; i < albumLength; i++ ) {
		var angle = -(step*i + Math.PI);
		var sin = Math.sin(angle);
		var cos = -Math.cos(angle);
		var value = array[i];
		if(i == 0) {
			pathString += "M" + (centerX + sin * ( centerRadius + (value/maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value/maxValue) * radius ) );
		} else {
			pathString += "L" + (centerX + sin * ( centerRadius + (value/maxValue) * radius ) ) + "," + (centerY - cos * ( centerRadius + (value/maxValue) * radius ) );
		}
	}
	pathString += "L" + centerX + " " + centerY + "z";
	return pathString;
}
var albumSalesPath = create_graph(albumSales,maxValue,radius,centerRadius,centerX,centerY);
var digitalSalesPath = create_graph(digitalSales,maxValue,radius,centerRadius,centerX,centerY);
var thirdSalePath = create_graph(thirdSale,maxValue,radius,centerRadius,centerX,centerY);


// Ajout de textes
var text = paper.text(120,80,"Spotify")
	.attr({
		"font-size":"20",
		fill: "black"
	});
text.rotate(-50);



// ajout des styles au PATHS
// third sales style
paper.path( thirdSalePath )
	.attr({
		"stroke-width": 0,
		fill: "150-#E22E18-#8E1A24", // rouge
		"fill-opacity": ".75"
	});

// Albums sales style
paper.path( albumSalesPath )
	.attr({
		"stroke-width": 0,
		"fill":"150-#4F983E-#4E9D66", // green
		"fill-opacity": ".75"
	});
// Digital sales style
paper.path( digitalSalesPath )
	.attr({
		"stroke-width": 0,
		"fill":"150-#005A91-#0085C7", // blue
		"fill-opacity": ".75"
	});

// remplir le cercle du centre (noir)
paper.circle( centerX, centerY, centerRadius )
	.attr({
		"fill" : "#000"
		// fill: "r#fff-#000"
	});

