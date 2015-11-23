module.exports = {
	SimplePlot: SimplePlot
}

function SimplePlot(   ) {
	
	//environment vars
	//placeholders
	this.height = '267px';
	this.width  = '500px';
	this.border = "2px solid black";
	this.minX   = '0px';
    this.minY   = '0px';
    this.maxX   = '0px';
    this.maxY   = '0px';

    
    this.path   = "";
    this.scaleX = 2;
    this.scaleY = 2;
    this.ticks  = 10;
    this.pipSize= 10;
    this.xlabel = "x";
    this.ylabel = "y";
    this.origin = [0, 0];

    this.series = []; //plotable series

}
SimplePlot.prototype.savePlot   = function( filePath ) {
    var tempPath = this.path;

	var fs = require('fs');
	if( typeof(filePath) != 'undefined' ) {
		this.path = filePath;
	} else {
		this.path = genRand() + ".html";
	}
	pltStr = this.createHtml();
	
    fs.writeFileSync(this.path, pltStr);
	

    this.path = tempPath;
	function genRand( ) {
		var alph    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var len     = alph.length;
		var pathLen = 10;
		var ret     = "";
		for(var z = 0; z < pathLen; z++) {
			ret += alph[ Math.floor( Math.random() * len ) ];
		}
		return ret;
	}
}

SimplePlot.prototype.showPlot   = function( ) {
	
	this.savePlot( 'temp.html' );
    var open = require('open');
    open('temp.html');

}

SimplePlot.prototype.createHtml = function() {

    this.setVars();

    var i, j, X, Y, xTrans, yTrans;

    var xRange = this.maxX - this.minX;
    var yRange = this.maxY - this.minY;

	var testString = "";
    //open body
	testString += "<html><body>";
		/////////
		/////////Here is where things go
		testString += "<div class=\"graph\" style=\"height:"
			+ this.height + "; width: " + this.width  + "; border: "
			+ this.border + "; position: absolute; left: 30px; top: 30px\">";
            //write xlabel
            testString += "<div class=\"xLabel\" style=\"position: absolute;"
                + " bottom: -22px; left: 10px\">" + this.xlabel + "</div>"
            //write ylabel
            testString += "<div class=\"xLabel\" style=\"position: absolute;"
                + " bottom: 10px; left: -22px; transform: rotate(-90deg)\">"
                + this.ylabel + "</div>"
            //HACKEY, YOU'RE AWESOME
            //add axis's
            testString += "<div class=\"Xaxis\" style=\"position:absolute;"
                + " bottom: " + this.origin[1] + "px; left: 0px; border: 1px solid black;"
                + " height: 0px; width:" + this.width + "\"></div>";
            testString += "<div class=\"Xaxis\" style=\"position:absolute;"
                + " left: " + this.origin[0] + "px; bottom: 0px; border: 1px solid black;"
                + " width: 0px; height:" + this.height + "\"></div>";
            for(i = 0; i < this.series.length; i++) {
                for(j = 1; j < this.series[i].length; j++) {
                    X = this.series[i][j][0];
                    Y = this.series[i][j][1];

                    //transform x and y
                    xTrans = this.origin[0] + ( parseInt(this.width)  * ( X / xRange ) ) - (this.pipSize / 2);
                    yTrans = this.origin[1] + ( parseInt(this.height) * ( Y / yRange ) ) - (this.pipSize / 2);
                    if(xTrans > this.width || xTrans < 0 || yTrans > this.height || yTrans < 0) {
                        console.log("Error in createHtml, pip rendered out of bounds");
                    }

                    testString += "<img src=\"" + this.series[i][0] + "\" height:\"" + this.pipSize 
                        + "px\" width:\"" + this.pipSize + "px\" style=\"position: absolute;"
                        + " left: " + xTrans + "; bottom: " + yTrans + ";\"></img>";
                }
            }

		testString += "</div>";
    //close body
	testString += "</body></html>";
	return testString;
}



SimplePlot.prototype.addSeries = function(Xin, Yin, color) {
    if(Xin.length != Yin.length) {
        console.log("Error in SimplePlot.addSeries, X and Y" + 
            " must be the same length.");
    } else {
        var newSeries = [];
        var i;

        if(typeof(color) !== 'undefined') {4
            switch(color) {
                case 'blue':
                    newSeries.push('images/blue.png');    break;
                case 'black':
                    newSeries.push('images/black.png');   break;
                case 'green':
                    newSeries.push('images/green.png');   break;
                case 'pink':
                    newSeries.push('images/pink.png');    break;
                case 'purple':
                    newSeries.push('images/purple.png');  break;
                case 'red':
                    newSeries.push('images/red.png');     break;
                case 'yellow':
                    newSeries.push('images/red.png');     break;
                default:
                    newSeries.push( color ); //for user defined image paths
            }
        } else {
            newSeries.push('images/red.png');
        }

        for(i = 0; i < Xin.length; i++) {
            if(typeof(Xin[i]) == 'number' && typeof(Yin[i]) == 'number')
                newSeries.push([ Xin[i], Yin[i] ]);
            else
                console.log("Error in SimplePlot.addSeries, data point " +
                    Xin[i] + " : " + Yin[i] + " could not be added because it" + 
                    " is has one or more non-numeric element.");
        }
        this.series.push(newSeries);
    }
}
SimplePlot.prototype.xLabel    = function(newLabel) {
    this.xlabel = newLabel;
}
SimplePlot.prototype.yLabel    = function(newLabel) {
    this.ylabel = newLabel;
}


SimplePlot.prototype.setVars  = function( ) {
    var minX = 0; //ok to use 0 here because
    var minY = 0; // we want the axis to be at 0
    var maxX = 0; // if we don't have data less than
    var maxY = 0;                             
    var j, k;

    for(j = 0; j < this.series.length; j++) {
        //from one to skip color in object...should be done with an object
        //  anyway, but you'll have to change this a lot when you fix it
        for(k = 1; k < this.series[j].length; k++) {

            if( this.series[j][k][0] < minX ) minX = this.series[j][k][0];
            if( this.series[j][k][0] > maxX ) maxX = this.series[j][k][0];
            if( this.series[j][k][1] < minY ) minY = this.series[j][k][1];
            if( this.series[j][k][1] > maxY ) maxY = this.series[j][k][1];
        }
    }
    var xRange = maxX - minX;
    var yRange = maxY - minY;

    //provide a small buffer for < 0 values
    //   @@@@@@TODO this may not be ideal if
    //     we want to give the user range control
    //     adjust accordingly
    //     also this assumes a non-square scale, which, you know...maybe fine
    if( minX < 0 ) this.minX = minX - .05 * xRange;
    else           this.minX = 0;
    if( minY < 0 ) this.minY = minY - .05 * yRange;
    else           this.minY = 0;
    this.maxX = maxX + .05 * xRange;
    this.maxY = maxY + .05 * yRange;


    var fullXRange = this.maxX - this.minX;
    var fullYRange = this.maxY - this.minY;



    //Leave this in number form to speed calcuations later
    var totalW = parseInt( this.width );
    var totalH = parseInt( this.height);

    this.origin[0] = totalW * ( Math.abs(this.minX) / fullXRange) - 1;
    //minY remember to use position: bottom instead of top
    this.origin[1] = totalH * ( Math.abs(this.minY) / fullYRange) - 1;

    //@TODO this doesn't have to be so generic, but low priority
    this.scaleX = round10(xRange / this.ticks, 2);
    this.scaleY = round10(yRange / this.ticks, 2);

    //http://www.jacklmoore.com/notes/rounding-in-javascript/
    function round10(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

}