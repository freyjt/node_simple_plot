exports = {
	SimplePlot: SimplePlot
}

function SimplePlot(   ) {
	
	
	//placeholders
	this.height = '100px';
	this.width  = '100px';
	this.border = "2px solid black";
	
}
SimplePlot.prototype.savePlot( filePath ) {
	var fs = require('fs');
	var path;
	if( typeof(filePath) != 'undefined' ) {
		path = filePath;
	} else {
		path = genRand + ".html";
	}
	pltStr = this.createHtml();
	
	
	function genRand( ) {
		var alph    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		var len     = alph.length;
		var pathLen = 10;
		var ret     = "";
		for(var z = 0; z < pathLen; z++) {
			ret += alph[ Math.floor(Math.random() * len) ];
		}
		return ret;
	}
}
SimplePlot.prototype.showPlot( ) {
	
	
}
SimplePlot.prototype.createHtml() {
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