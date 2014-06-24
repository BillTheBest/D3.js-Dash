d3.json("data/diagnosis.php", function(error, data) {

var diameter = 295;

var tree = d3.layout.tree()
                //.size([360,  diameter / 2.5 - 100])
                .size([360,  diameter / 2.5])
                .separation(function(a, b) { 
                        return (a.parent == b.parent ? 1 : 2) / a.depth; 
                        });

var diagonal = d3.svg.diagonal.radial()
                .projection(function(d) { 
                        return [d.y, d.x / 180 * Math.PI]; 
                        });

var canvas = d3.select("#diagnosis").append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .append("g")
                .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

// Setup the tooltips 
var tip = d3.tip()
                .attr("class", "d3-tip")
                .html(String);

var nodes = tree.nodes(mkRoot(data)),
    links = tree.links(nodes);
        
var link = canvas.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

var node = canvas.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(tip)
            .attr("transform", function(d) {
                    return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
                    });

        node.append("circle")
            .attr("r", 2)
            .on("mouseover", function(d,i) {
                tip.show(nodes[i].long);
            })
            .on("mouseout", tip.hide);

       node.append("text")
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
            .attr("class", "leaf-text")
            .text(function(d) { return d.short; })
            .on("mouseover", function(d,i) {
                tip.show(nodes[i].long);
            })
            .on("mouseout", tip.hide);;
});

function mkRoot(data) {
    var root = { children: [] };
    data.forEach(function(d) {
            if(d.source == d.target) {
                root.children.push(d);
                recur(d, data);
                }
            });
    return root;
    }

function recur(root, data) {
    root.children = [];
    data.forEach(function(d) {
            if(d.source != d.target && root.target == d.source) {
                root.children.push(d);
                recur(d, data);
                }
            });
}


