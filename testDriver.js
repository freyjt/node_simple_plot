

function main( ) {
    var sPlot = require('./SimplePlot.js');
    var plot  = new sPlot.SimplePlot();
    

    var testSeriesQ = [[1,1], [1,-1], [-1,-1],[-1,1]]; //tests 1 in every quadrant
    // plot.savePlot();
    var testX  = [1,  1, -1,-1];
    var testY  = [1, -1, -1, 1];
    var testX2 = [2,  3, 4, 2.5,   1, 2, 9];
    var testY2 = [1, -1, 2,   3, 1.2, 2, 2];
     // plot.addSeries(testX, testY);
    plot.addSeries(testX2, testY2, 'images/Favicon.ico');
    var reg   = new sPlot.Regression(testX2, testY2);
    console.log(reg.getValues());
    plot.xLabel("Green");
    plot.yLabel("A lonaffdareredfawageae string to test g to work well.");
    plot.savePlot('myfile.html');
    plot.showPlot();
    
    var lft = testX2;
    var oneList = new sPlot.OneListStats( );
    oneList.getValues();
    oneList.setList( testX2 );
    console.log( oneList.getValues( ) );
    console.log( oneList.getSummary( ) );
}
main();