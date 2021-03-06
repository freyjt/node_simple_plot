

function main( ) {
    var sPlot = require('./SimplePlot.js');
    var plot  = new sPlot.SimplePlot();
    

    var testSeriesQ = [[1,1], [1,-1], [-1,-1],[-1,1]]; //tests 1 in every quadrant
    // plot.savePlot();
    var testX  = [1,  1, -1,-1];
    var testY  = [1, -1, -1, 1];
    var testX2 = [2,  3, 4, 2.5,   1, 2, 9];
    var testY2 = [1, -1, 2,   3, 1.2, 2, 2];
    var testX3 = [-1, -4, 5, 3, 2, -5, 0, 5, 8];
    var testY3 = [-.5, -2, 2.5, 1.5, 1, -2.5, 0, 2.5, 4];
    var testX4 = [-1,0,2,3,4];
    var testY4 = [5,4,3,2,1];
    plot.addSeries(testX, testY);
    plot.addSeries(testX2, testY2, 'images/Favicon.ico');
    plot.addSeries(testX3, testY3, 'blue');
    plot.addSeries(testX4, testY4, 'purple');
    var reg   = new sPlot.Regression(testX2, testY2);
    console.log(reg.getValues());
    plot.xLabel("Green");
    plot.yLabel("A lonaffdareredfawageae string to test g to work well.");
    plot.savePlot('myfile.html');



    plot.addRegression(2);
    plot.addRegression(0);
    // plot.addRegression(1);
    // plot.addRegression(3);
    plot.setTitle( "MyPlot" );
    plot.setTitle("");
    plot.showPlot();
    

    var lft = testX2;
    var oneList = new sPlot.OneListStats( );
    oneList.getValues();
    oneList.setList( testX2 );
    console.log( oneList.getValues( ) );
    oneList.setList( [1,2,3,4,5,6] );
    console.log( oneList.getSummary( ) );
    // newPlot = eval(uneval(plot));
    // newPlot.addRegression('all');
    // newPlot.showPlot();


    var oneThousand = [];
    for(i = 0; i < 100000; i++) {
        oneThousand.push( Math.random() * 1000 ); 
        //when do you think new Math.random() will show up in node?
    }
    oneList.setList( oneThousand );
    console.log( oneList.getSummary() );

    //testing if getSummary works with short list
    oneList.setList( [1,0,2] );
    console.log( oneList.getSummary());
}
main();