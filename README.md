# node_simple_plot
A simple scatter plot library for nodejs
<p>dependencies</p>
<ul>
    <li>module: <a href="https://github.com/jjrdn/node-open">node-open</a> </li>
</ul>

<p>Objects:</p>
<ul>
    <li>SimplePlot</li>
    <ul>
        <li>The plotter, generates static html files representing data given</li>
        <li>Methods of consequence</li>
        <ul>
            <li>void savePlot( "filepath" )<br/>
                saves the html file at the given path, or locally as 'RANDOM.html'</li>
            <li>void showPlot( )<br/>
                saves the html locally as 'temp.html' and opens it in default browser.</li>
            <li>void setTitle( "titleIn" )<br/>
                setter for the plot title</li>
            <li>void addSeries( [Xin], [Yin], "color" )<br/>
                adds a series to the plot, Xin and Yin are lists of the same length<br/>
                color can be red, orange, yellow, blue, green, purple, black or a <br/>
                path to an image to use. Default is black</li>
            <li>void xLabel( "labelIn" )<br/>
                setter for x-label</li>
            <li>void yLabel( "labelIn" )<br/>
                setter for y-label</li>
            <li>void setPipSize( sizeIn )<br/>
                sets size of dots to use in px</li>
            <li>void addRegression( indexIn )<br/>
                A little confusing. Tell the object to plot a regression line for<br/>
                an added series. Zero-indexed in the sequence they are added.</li>
            <li>void removeRegression( indexIn )<br/>
                Removes a previously added regression from future plots</li>
        </ul>
    </ul>
    <li>Regression</li>
    <ul>
        <li>Generates linear on a two-dimensional data series.</li>
        <li>Methods of consequence</li>
        <ul>
            <li>function Regression([arrX], [arrY])<br/>
                constructor, input, two lists of equal length</li>
            <li>void setSeries([arrX], [arrY])<br/>
                reconstructor, change the series of the list</li>
            <li>object getValues( )<br/>
                returns object of type { m: slope, b: y-intercept, r2: r-squared value}</li>
        </ul>
    </ul>
    <li>OneListStats</li>
    <ul>
        <li>Bit of an orphan in this project. Works on 1-dimensional series</li>
        <li>Methods of consequence</li>
        <ul>
            <li>function OneListStats([listIn])<br/>
                constructor, generates return values</li>
            <li>void setList([listIn])<br/>
                reconstructor, change list</li>
            <li>number getPercentile( percentile )<br/>
                returns value from list representing given percentile</li> 
            <li>object getValues( )<br/>
                returns object of the form:<br/>
                { n: size of list, <br/>
                sum: sum of list, <br/>
                avg: arithmetic mean of list, <br/>
                stdDev: standard deviation of list }</li>
            <li>object getSummary( )<br/>
                return 5-number summary of the form:<br/>
                {
                '1':  first value,<br/>
                '25': 25th percentile,<br/>
                '50': median,<br/>
                '75': 75th percentile,<br/>
                '99': last value in list<br/>
                }</li>
        </ul>
    </ul>
</ul>

