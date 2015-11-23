

function main( ) {
    var sPlot = require('./SimplePlot.js');
    var plot  = new sPlot.SimplePlot();

    var testSeriesQ = [[1,1], [1,-1], [-1,-1],[-1,1]]; //tests 1 in every quadrant
    // plot.savePlot();
    var testX  = [1,  1, -1,-1];
    var testY  = [1, -1, -1, 1];
    plot.addSeries(testX, testY);
    plot.savePlot('myfile.html');
    plot.showPlot();
}
main();