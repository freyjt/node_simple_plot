

function main( ) {
    var sPlot = require('./SimplePlot.js');
    var plot  = new sPlot.SimplePlot();

    // plot.savePlot();
    plot.savePlot('myfile.html');
    plot.showPlot();
}
main();