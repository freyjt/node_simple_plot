module.exports = {
	SimplePlot:   SimplePlot,
    Regression:   Regression,
    OneListStats: OneListStats
}



  //     .                            . . .  . . .. ..    . . .  . ....................................
  //  .MMMIMM.    MM               .  ..  ..  MMM . .. .  ..  ..MMMMMO. ...MMMM................MM .....
  // +M,.  MM  . .O8............................M ..............MM ...MM ....MM............ ...MM......
  // ?M7.    . .ZMMM ....MMMM:MM:..MMMMMM.......M ......MMMMN ..MM ...MM.....MM......MMMMO ..MMMMMMM ..
  //   NMMM...    MM .   MM.MM MM  MM   =M?     M     8M,. .OM  MMMMMMM,.   .MM.   ~M~.  MM    MM. .   
  //      MMM     MM     MM.MM.MM  MM.   MM     M .   MMMMMMMMM.MM   .. .. ..MM... MM..  .MM . MM. ... 
  // MM.  .MM.    MM .   MM.MM.MM  MM.  .MM     M ....NM.    .  MM  ... .. ..MM..  MM . .,M: . MM ..~. 
  // MMMMMMM.   ZMMMMM. .MM.MM.MM. MMMMMMM    MMMMM .. DMMMMMM  MM   .   . MMMMMD.  DMMMMM+. . +MMMMM  
  //   .  .                .    .. MM..   .        . . .  .   .    .............. ................... .
  //   .    .. . .. .   ..      .. MM.                              ... .. ... ............ .. ... ....
  //        .       .    . .. . ..                                   ..    ..  ..    ..  ..    ..  ..  
  //                                                                                    GlassGiant.com
function SimplePlot(   ) {
	
	//environment vars
	//placeholders
	this.height = '467px';
	this.width  = '600px';
	this.border = "2px solid black";
	this.minX   = '0px';
    this.minY   = '0px';
    this.maxX   = '0px';
    this.maxY   = '0px';

    this.regLoc = [];
    this.path   = "";
    this.scaleX = 5;
    this.scaleY = 5;
    this.ticks  = 10;
    this.pipSize= 10;
    this.xlabel = "x";
    this.ylabel = "y";
    this.origin = [0, 0];
    this.title  = "";
    this.series = []; //plotable series's x = ..[pos][i][0] y = ..[pos][i][0]

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
    var title = (this.title.length > 0) ? this.title : this.path;
    //open body
	testString += "<html><head><title>" + title + "</title>"
            + "<link rel=\"icon\" href=\"images/favicon.ico\" type=\"image/x-icon\"></head><body>";
		/////////
		/////////Here is where things go
		testString += "<div class=\"graph\" style=\"height:"
			+ this.height + "; width: " + this.width  + "; border: "
			+ this.border + "; position: absolute; left: 70px; top: 70px\">";
            //write plot label
            testString += "<div class=\"chartLabel\" style=\"position: absolute; size: 15px; "
                + " top: -30px; left: 25px;\"><strong>" + title + "</strong></div>";
            //write xlabel
            testString += "<div class=\"xLabel\" style=\"position: absolute;"
                + " bottom: -42px; left: 10px\">" + this.xlabel + "</div>"
            //write ylabel
            //rotation appears to do wierd things
            // this...seems?..to fix it?
            var leftish   = 0 - this.ylabel.length * 3 - 62
            var bottomish = this.ylabel.length * 3 + 10
            testString += "<div class=\"yLabel\" style=\"transform: rotate(-90deg); position: absolute;"
                + " bottom: " + bottomish + "px; left: " + leftish + "px; \">"
                + this.ylabel + "</div>"
            //HACKEY, YOU'RE AWESOME
            //add axis's
            testString += "<div class=\"Xaxis\" style=\"position:absolute;"
                + " bottom: " + this.origin[1] + "px; left: 0px; background-color: black;"
                + " height: 1px; width:" + this.width + "\"></div>";
            testString += "<div class=\"Yaxis\" style=\"position:absolute;"
                + " left: " + this.origin[0] + "px; bottom: 0px; background-color: black;"
                + " width: 1px; height:" + this.height + "\"></div>";

            //add tickmarks
            var scaledTick   = xRange / parseInt(this.width);
            var betweenTicks = parseInt(this.width) / this.ticks;
            var marker       = this.origin[0] + betweenTicks;
            while(marker > 0) {
                if( marker > parseInt(this.width)) {
                    betweenTicks = 0 - betweenTicks;
                    marker       = this.origin[0] + betweenTicks;
                }
                if(marker > 0 && marker < parseInt(this.width) ) {
                    testString += "<div class=\"tick\" style=\"position: absolute;" 
                        + " bottom: 0px; left: " + (marker) + "px; height: 10px; width: 1px; " 
                        + "background-color: black\"></div>";
                    testString += "<div class=\"tick-label\" style=\"position: absolute;"
                        + " bottom: -24px; left: " + (marker - 10) + "px;\">" + ( round10(scaledTick *(marker-this.origin[0]), 2) ).toString()
                        + "</div>";
                }
                marker += betweenTicks;
          
            }
            scaledTick   = yRange / parseInt(this.height);
            betweenTicks = parseInt(this.height) / this.ticks;
            marker       = this.origin[1] + betweenTicks;
            while(marker > 0) {
                if( marker > parseInt(this.height) ) {
                    betweenTicks = 0 - betweenTicks;
                    marker       = this.origin[1] + betweenTicks;
                }
                if( marker > 0 && marker < parseInt(this.height) ) {
                    testString += "<div class=\"tick\" style=\"position: absolute;" 
                        + " bottom: " + (marker) + "px; left: 0px; height: 1px; width: 10px; " 
                        + "background-color: black\"></div>";
                    testString += "<div class=\"tick-label\" style=\"position: absolute;"
                        + " bottom: "  + (marker - 6) + "px; left: -40px;\">" + (round10(scaledTick * ( marker - this.origin[1] ), 2) ).toString()
                        + "</div>";
                }
                marker += betweenTicks;
            }

            
            //draw dots
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

                    testString += "<img src=\"" + this.series[i][0] + "\" style=\"position: absolute;"
                        + " left: " + xTrans + "; bottom: " + yTrans + "; height:" + this.pipSize + ";width: " + this.pipSize +  "\"></img>";
                }
            }
            testString += this.writeRegression( );
		testString += "</div>";
    //close body
	testString += "</body></html>";
	return testString;

    //http://www.jacklmoore.com/notes/rounding-in-javascript/
    function round10(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
}
SimplePlot.prototype.setTitle  = function( titleIn ) {
    this.title = titleIn;
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
// @TODO typecheck these
SimplePlot.prototype.xLabel     = function( newLabel) {
    this.xlabel = newLabel;
}
SimplePlot.prototype.yLabel     = function( newLabel) {
    this.ylabel = newLabel;
}
SimplePlot.prototype.setPipSize = function( newSize ) {
    this.pipSize = newSize;
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
    //     @Past me: what did you mean by that?
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
    this.scaleX = round10(fullXRange / this.ticks, 2);
    this.scaleY = round10(fullYRange / this.ticks, 2);

    //http://www.jacklmoore.com/notes/rounding-in-javascript/
    function round10(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

}


// @return string representation of images
SimplePlot.prototype.writeRegression = function( ) {
    
    var retString = "";

    for(var ss = 0; ss < this.regLoc.length; ss++) {
        if( typeof(this.series[ss]) === 'undefined') {
            console.log("Error, cannot plot indicated series; not added.");
        } else {
            //have to split series'
            var xSeries = [];
            var ySeries = [];
            //remember to start at one because you were too lazy
            // to make a series object so 0 is the series color reference
            for(var i = 1; i < this.series[ss].length; i++) {
                xSeries.push( this.series[ss][i][0] );
                ySeries.push( this.series[ss][i][1] );
            }

            var reg  = new Regression(xSeries, ySeries); // .. should be able to do this. else have to call from exports
                reg  = reg.getValues();

            // rise is now in units of px
            //  the origin are also in units of px
            var xRange = this.maxX - this.minX;
            var yRange = this.maxY - this.minY;

            var sloper =  (parseFloat(this.width) * yRange)/(parseFloat(this.height) * xRange);
                
            var rise = Math.abs(reg.m * parseInt(this.width) / sloper);//abs then work out slope on image
            rise = (rise == 0) ? 5 : rise;

            //first, find the y - intercept relative to the bottom in pixels
            var yInt  = reg.b; //load the intercept in units
                yInt *= parseFloat(this.height) / yRange; //mult by px/u
                yInt += this.origin[1];
            //now we need to subtract out the difference between the
            // origin location and the start of the height of the line
            //  at zero px
            var differ = 0;
            //take from the left if slope is positive, right if negative
            if( reg.m >= 0) {
                differ  = rise * (this.origin[0] / parseInt(this.width) );
            } else { differ = rise * ((parseInt(this.width) - this.origin[0]) / parseInt(this.width) );}

            var fromBot = yInt - differ;

            //@TODO make more images and figure out how to call them;
            var ref = "";
            if     ( reg.m > 0 ) { ref = './images/regpos'; }
            else if( reg.m < 0 ) { ref = "./images/regneg"; }
            else                 { ref = "./images/regflat";}
            var fs     = require('fs');
            var imgEnd = this.series[ss][0].substr(7);

            try {
                stats = fs.lstatSync(ref + imgEnd);
                if(stats.isFile()) {
                    ref = ref + imgEnd;
                }
            } catch (e) {
                ref = ref + '.png';
            }


            retString += "<img src=\"" + ref + "\" style=\"position: absolute; left: 0px; bottom: " +
                        fromBot + "px; height: " + rise + "px; width: " + parseFloat(this.width) + "px;\"></img>";
            
            // print label 
            var labBot = ((-17 * (1+ss)) - 42);
            retString += "<img src=\"" + this.series[ss][0] + "\" style=\"position: absolute; left: 0px;" +
                        "bottom: " + labBot + "px; height: 13px; width: 13px; \"><img>" 
            retString += "<div class=\"regLabel\" style=\"position: absolute; left: 17px; bottom: " +
                        labBot + "px\">y = " + reg.m + " * x + " + reg.b + "</div>";

        }
    }
    return retString;

}
// @Input seriesSelector - 0 indexed referencing in order of addSeries
//          can be omitted for zero or @TODO 'all' for combined series'
SimplePlot.prototype.addRegression = function(intIn) {
    if( typeof(intIn) === 'number'){
        this.regLoc.push( Math.floor(intIn) );
    } else if(intIn ==='all'){
        this.regLoc = [];
        for(var i = 0; i < this.series.length; i++) {
            this.regLoc.push(i);
        }
    } else {
        console.log("Error, cannot add series for SimplePlot.addRegression, not a number or does not exist.")
    }
}
SimplePlot.prototype.removeRegression = function(intIn) {
    var index = this.useRegression.indexOf( intIn );
    if( index > -1 ){this.useRegression.splice( index, 1); }
}







// ... .. ......... . .      .                                              .                          
// ..MMMMMMM~ ..... .      .                                                :MM.                       
//  .MM....MM....,?:.      ~?.          =+.    ~I,      ,+I,      :I~.         .      ~I:.       :I.   
//  .MM...=MM .MMM ~MM.  MM8 ~MM  MMMMMMMM   MM:.MMZ  ZM8. =M   MM= .8M    MMMM.   .MM~ OMN   M:M.=MM. 
//   MMMMMM: .?M,,,,,MM.=M,.  ,M    MM.     MM,,,,+M  DMM+....  MMM:.        MM.   MM.    M=  M7   MM. 
//  .MM.+MZ ..7M:,,,,,,.7M.   ,M    MM      MM,,,,,, . .+MMMMM    $MMMMO     MM.   MM     MO. M.   MM. 
// ..MM..~MM...MM.  .M.  MM, .MM    MM.     +M7 ..~.  :?  ..MM. M.  ..MD     MM  . $MO...MM.  M.   MM. 
//  .MM...,MM . :MMMM:    ,OM?.M  MMMMM=      ZMMMO    7MMMM$   ,ZMMMM=.   MMMMM=.  .OMMM=    M.   MM. 
// ...... ....... ..  .  8....MM                                                                       
//   ..            .......MMMMD ............. . .......... . ...... ...................................
// .  ..             .. .. .. .  ... .  .  ..   ...    ...   ..  .  ... ..  ... .   .  . .. ...   ...  
//                                                                                      GlassGiant.com
// an object for performing regressions

function Regression(arrX, arrY) {
    if(arrX.length != arrY.length) {
        console.log("Error in Regression.constructor, X and Y" + 
            " must be the same length.");
    } else {
        this.Xs  = arrX;
        this.Ys  = arrY;
    }
    this.leastSquares();
    this.rSquared();
}
//returns object { b: xxx, m: xxx }
Regression.prototype.leastSquares = function( ) {
    var i;
    var sX =  0;
    var sY =  0;
    var sumProd = 0;
    var xSquare = 0;
    this.sY = 0;
    for( i = 0; i < this.Xs.length; i++ ) {

        sX      +=  this.Xs[i];
        this.sY +=  this.Ys[i]; //eat some memory to save time in r2
        sumProd += (this.Xs[i] * this.Ys[i]);
        xSquare += Math.pow(this.Xs[i], 2);

    }

    var num = (this.Xs.length * sumProd) - (sX * this.sY);
    var den = (this.Xs.length * xSquare) - Math.pow(sX, 2);

    //set these so we can use them in the regression.
    this.m   = num / den;
    this.b   = (this.sY / this.Ys.length) - ( this.m * (sX / this.Xs.length) );
}
Regression.prototype.rSquared = function( ) {
    var length = this.Xs.length;
    var smEr2 = 0;
    var smDi2 = 0;
    var predY = 0;
    var meanY = this.sY / length;
    var i;
    for(i = 0; i < length; i++) {
        predY  = this.b + ( this.m * this.Xs[i] );

        smEr2 += Math.pow(this.Ys[i] - predY, 2);
        smDi2 += Math.pow(this.Ys[i] - meanY, 2);
    }

    //@TODO irl, discover why this doesn't need to be squared at
    //   the end.
    this.r2 = 1 - (smEr2 / smDi2);
}
// returns object of the form {m: this.m, b: this.b, r2: this.r2}
Regression.prototype.getValues = function( ) {
    return {
        m:  this.m,
        b:  this.b,
        r2: this.r2
    }
}
Regression.prototype.setSeries = function( xIn, yIn) {
    if(xIn.length != yIn.length) {
        console.log("Error in Regression.constructor, X and Y" + 
            " must be the same length.");
    } else {
        this.Xs  = xIn;
        this.Ys  = yIn;
    }
    this.leastSquares();
    this.rSquared();
}



//  ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ... ...
// ..7MMMZ ..................M.........MM ............MM......NMMMN....M...............M...............
// .MM ..MM .................M........... ............MM.....NM . M....M...............M...............
//  M.   ,M  M~MMM+. MMMMMM  M.       MMM    $MMMMM  MMMMMM  ,MM~ .  MMMMMM.  MMMMM+ MMMMMM.  MMMMM+.  
//  M   ..M .M  .MM DMMMMMM. M. ..  .. MM   .MMMO.. ..MM..  ..  7MM  . M..  ...MMMMM.. M..  ..MMM+. .. 
// .M8 . ZM  M.. MM NM.     .M.. ... ..MM .. ...~8M7..MM..   NM  .MM ..M.. . $M...MM...M...  ....=MM ..
// ..MMMMM...M...MM .8MMMMM..MMMMMM...MMMM=..MMMMMM... MMMM..MMMMMM... NMMM:.:NMMMMM.. MMMMZ .MMMMMM.. 
// ...   ........  ... . ....      ...    ....   . .... .. ..      .....    ..  . .  ..... .....  .....
                                                                                     // GlassGiant.com
///an object for getting some stats about a list
function OneListStats( listIn ) {
    this.List    = null;
    this.sum     = null;
    this.avarage = null; 
    this.stdDev  = null;
    if( typeof(listIn) !== "undefined")
        this.setList(listIn);

} //END constructor.

//changes the list stored in this object
OneListStats.prototype.setList = function(listIn) {
    try {
        if( !Array.isArray(listIn) ) {
            listIn = null;
            throw "Error";
        }
        for(var i = 0; i < listIn.length; i++) {
            if(typeof(listIn[i]) !== 'number') {
                listIn = null;
                throw "Error";
            }
        }
    } catch(err) {
        console.log(err + "\n OneListStats.setList Requires an array argument. List set to null.");
    }
    this.List = listIn;
} //END setList

//Internal method. calculates the average and standard deviation
// of the list stored in the object in one go to save overhead.
OneListStats.prototype.avgStd = function( ) {

    if( this.List !== null ) {
        console.log("*" + this.List);
        var sum  = 0;
        var sum2 = 0;
        var n    = this.List.length;
        for(var i = 0; i < this.List.length; i++) {
            sum  += this.List[i];
            sum2 += Math.pow(this.List[i], 2)
        }
        this.sum     = sum;
        this.average = this.sum / n;
        if( n > 1) {
            var inner    = (n * sum2) - Math.pow(sum, 2);
                inner   /= (n - 1) * n;
            this.stdDev = Math.sqrt( inner );
        } else { this.stdDev = 0; }

    } else {
        console.log( "Error calling OnelistStats.avgStd, OneListStats.List has not been set.");
    }
} //END avgStd

//Returns a value based on the list that represents
// the percentile given by P
// *uses traditional calculation, so return will 
// either always be a number in the list, or the average
// of two numbers in the list.
OneListStats.prototype.getPercentile = function( P ) {
    

    var returner = null;
    if(typeof(this.List) !== 'undefined') {
        function sorter(a, b) { return a - b; }
        this.List.sort(sorter());

        try {
            if(P < 1) {
                P = 1;
                throw "Error: Out of bounds.";
            } else if( P > 99){
                P = 99;
                throw "Error: Out of bounds.";
            }
        } catch (err) {
            console.log( err + " in OneListStats.getPercentile. P set to " + P);
        }

        //@TODO this is not perfect, no? what of a very large list, couldn't
        //  this be less than the last? also, I don't know if p==1 is correct
        //  either way
        if     (P ==  1) { returner = this.List[0]; }
        else if(P == 99) { returner = this.List[this.List.length - 1]; }
        else {
            var k = (this.List.length * P / 100) - 1; //because 0 indexed
            if(Math.floor(k) == k) { //int check
                k = Math.floor(k);
                returner = (this.List[k] + this.List[k + 1]) / 2;
            } else {
                k = Math.ceil(k);
                returner = this.List[k];
            }
        }

    } else {
        console.log("Error in OneListStats.getPercentile. List is unset.");
        returner = null;
    }
    return returner;
}// END getPercentile

// Returns a summary of tradionally useful statistics
//  on the list that is stored in the object
OneListStats.prototype.getValues = function() {
    this.avgStd( ); // make sure values are set
                    // calling here will prevent them from being called
                    // when we don't need them
    if(this.List !== null)
        return {
            n:      this.List.length,
            sum:    this.sum,
            avg:    this.average,
            stdDev: this.stdDev
        }
    else {
        console.log("Error, cannot get stats on an unset list.");
        return null;
    }
} //END getValues()

//Returns an object representation of the five
// number summary for the list stored in the object
OneListStats.prototype.getSummary = function() {
    return {
        '1':     this.getPercentile(1),
        '25':    this.getPercentile(25),
        '50':    this.getPercentile(50),
        '75':    this.getPercentile(75),
        '99':    this.getPercentile(99)
    };
} //END getSummary