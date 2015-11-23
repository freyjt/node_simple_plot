module.exports = {
	SimplePlot: SimplePlot
}

function SimplePlot(   ) {
	
	//environment vars
	//placeholders
	this.height = '100px';
	this.width  = '100px';
	this.border = "2px solid black";
	this.minX   = '0px';
    this.minY   = '0px';
    this.maxX   = '0px';
    this.maxY   = '0px';

    
    this.path   = "";
    this.scaleX = 2;
    this.scaleY = 2;
    this.ticks  = 10;
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




	var testString = "";
	testString += "<html><body>";
		/////////
		/////////Here is where things go
		testString += "<div class=\"graph\" style=\"height:"
			+ this.height + "; width: " + this.width  + "; border: "
			+ this.border + "\">";

		testString += "</div>";
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
    var minX, minY, maxX, maxY = 0; //ok to use 0 here because
                                    // we want the axis to be at 0
                                    // if we don't have data less than
    var j, k;

    for(j = 0; j < this.series.length; j++) {
        for(k = 0; k < this.series[j].length; j++) {
            if( this.series[j][0] < minX ) minX = this.series[j][0];
            if( this.series[j][0] > maxX ) maxX = this.series[j][0];
            if( this.series[j][1] < minY ) minY = this.series[j][1];
            if( this.series[j][1] > maxY ) maxY = this.series[j][1];
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
    var fullYRange = this.maxY = this.minY;

    var totalW = parseInt( this.width );
    var totalH = parseInt( this.height);
    this.origin[0] = totalW * ( Math.abs(minX) / fullXRange);
    //minY remember to use position: bottom instead of top
    this.origin[1] = totalH * ( Math.abs(minY) / fullYRange);

    //@TODO this doesn't have to be so generic, but low priority
    this.scaleX = Math.round10(xRange / this.ticks, -2);
    this.scaleY = Math.round10(yRange / this.ticks, -2);
}