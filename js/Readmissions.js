/* 
 *
 * 7 DAY ALL CAUSE READMISSIONS 
 *
 */


// Pre-Load the json data using the queue library
queue()
        .defer(d3.json, "data/readmissionLinks.php")
        .defer(d3.json, "data/readmissionNodes.php")
        .defer(d3.json, "data/readmissionDx.php")
        .await(readmissions); 

// Define the main worker or execution function 
function readmissions(error, links, nodes, dx) {

// Cast links values from strings to int
    links.forEach( function(e) {
            e.source = +e.source;
            e.target = +e.target;
    });


// Set SVG Container dimensions in px 
    var h=220, w=295;

// Setup the rollover Tooltip Object 
    var tip = d3.tip()
                    .attr("class", "d3-tip")
                    .html(String);

    var desc1 = d3.select("#readmitDx")
                    .data([dx])
                    .attr("class", "label")
                    .append("text")
                    .text("Readmitting Diagnosis : ");

    var desc2 = d3.select("#disDx")
                    .data([dx])
                    .attr("class", "label")
                    .append("text")
                    .text("Discharging Diagnosis : ");

// Attach an SVG container to a div
    var svg = d3.select("#readmissions")
                    .append("svg")
                    .attr("height",h)
                    .attr("width",w);

// Draw the node labels 
   var texts = svg.selectAll("text")
                    .data(nodes)
                    .enter()
                    .append("text")
                    .attr("class", "nodevals")
                    .text(function(d) { return d.Name; });

// Build the directional arrows for the link edges 
        svg.append("svg:defs")
                    .selectAll("marker")
                    .data(["end"]) 
                    .enter().append("svg:marker")
                    .attr("id", String)
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 10)
                    .attr("refY", -0.5)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("svg:path")
                    .attr("d", "M0,-5L10,0L0,5");

// Establish the dynamic force behavor of the nodes 
    var force = d3.layout.force()
                    .nodes(nodes)
                    .links(links)
                    .size([w,h])
                    .linkDistance([50])
                    .charge([-70])
                    .gravity(0.1)
                    .start();

// Draw the nodes                 
    var nodes = svg.selectAll("circle")
                    .data(nodes)
                    .enter()
                    .append("circle")
                    .attr("class", "node")
                    .attr("r", 15)
                    .call(tip)
                    .call(force.drag)
                    .on("mouseover", function(d){ 

                        tip.show("Readmission at " +d.Hospital); 

                        desc1.append("text")
                            .text(function(d) { 
                                // For illustration only we'll select a random Dx
                                var r = Math.floor(Math.random() * 50);
                                return d[r].Dx; 
                            });

                        desc2.append("text")
                            .text(function(d) { 
                                // For illustration only we'll select a random Dx
                                var r = Math.floor(Math.random() * 50);
                                return d[r].Dx; 
                            });

                        })

                    .on("mouseout", function(d) { 

                        tip.hide();
                        desc1.select("text").remove();
                        desc1.select("text").append("text").text("Readmitting Diagnosis : ");

                        desc2.select("text").remove();
                        desc2.select("text").append("text").text("Discharging Diagnosis : ");

                        });
                                            
// Draw the edges/links between the nodes 
    var edges = svg.selectAll("line")
                    .data(links)
                    .enter()
                    .append("line")
                    .style("stroke", "#fff")
                    .style("stroke-width", 1)
                    .attr("marker-end", "url(#end)");


// Run the Force effect 
    force.on("tick", function() {

               edges.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
 
               nodes.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                                        
               texts.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                    });

     }); // END TIC FUNCTION 





}; // END READMISSION FUNCTION 


