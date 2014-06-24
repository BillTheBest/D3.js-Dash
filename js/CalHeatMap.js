/* 
 *
 * Heatmap of ED Wait times 
 *
 */


queue()
    .defer(d3.json, "data/calHeatMap.php")
    .await(ready);

function ready(error, dataset) {
        
var calendar= new CalHeatMap();

var parser = function(data) {
    var results = {};
    for (var i in data) {
       results[+data[i].date] = data[i].value;
    }
   return results;
};

calendar.init({  
    itemSelector: "#calheatmap1",    
    data: dataset,
    afterLoadData: parser,
    start: new Date(2000, 0, 1),
    range: 7, 
    rowLimit: 1,
    domain: "day",
    subDomain: "hour",
    cellSize: 25,
    cellPadding: 5,
    verticalOrientation: true,
    tooltip: true,
    legend: [1, 10, 25, 75],
    displayLegend: true,
    legendCellSize: 20,
    legendCellPadding: 5,
    legendHorizontalPosition: "right",
    label: {
		position: "left",
		offset: {
			x: 20,
			y: 12
		},
		width: 110
	},
    });


};
