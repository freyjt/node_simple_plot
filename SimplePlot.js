exports = {
	SimplePlot: SimplePlot
}

function SimplePlot(   ) {
	
	
	
	
}
SimplePlot.prototype.savePlot( filePath ) {
	var fs = require('fs');
	var path;
	if( typeof(filePath) != 'undefined' ) {
		path = filePath;
	} else {
		path = genRand + ".html";
	}
	pltStr = 
	
	
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