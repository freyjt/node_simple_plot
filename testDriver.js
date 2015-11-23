

function main( ) {
    var sPlot = require('./SimplePlot.js');
    var plot  = new sPlot.SimplePlot();

    var testSeriesQ = [[1,1], [1,-1], [-1,-1],[-1,1]]; //tests 1 in every quadrant
    // plot.savePlot();
    plot.savePlot('myfile.html');
    plot.showPlot();
}
main();