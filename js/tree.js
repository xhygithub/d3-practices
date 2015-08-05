function tree(data) {

    var m , w , h , i = 0;
    var tree, diagonal, vis;
    var  _nodes = data, instance = {};

    var colors, r_scale, duration_scale, stroke_width;
    var second_node = {};



    instance.config = function (myConfigs) {

        config = {
            w:     myConfigs.svg_width || 200,
            h:    myConfigs.svg_height || 1000,
            m:   myConfigs.margins || {top: 30, left: 120, right: 30, bottom: 30},
            path:       myConfigs.path   || false
        };

        return instance;
    };


    instance.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return instance;
    };

    instance.height = function (h) {
        if (!arguments.length) return _height;
        _height = h;
        return instance;
    };

    instance.margins = function (m) {
        if (!arguments.length) return _margins;
        _margins = m;
        return instance;
    };

    instance.nodes = function (n) {
        if (!arguments.length) return _nodes;
        _nodes = n;
        return instance;
    };

    instance.render = function () {

        _nodes.x0 = config.h / 2;
        _nodes.y0 = 0;


        tree = d3.layout.tree()
            .size([config.h, config.w]);

        diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        vis = d3.select("#body").append("svg:svg")
            .attr("width", config.w + config.m.left + config.m.right)
            .attr("height", config.h + config.m.top + config.m.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + config.m.left + "," + config.m.top + ")");

        getAllScale(_nodes)
        update(_nodes);
        
    };

    function getAllScale(_nodes) {
        var nodes = tree.nodes(_nodes);
        var max_number = _nodes.number,
        max_branch = nodes.length,
        min_number = max_number,
        max_time = 0,
        min_time = 100;
        nodes.forEach(function (d) {
            if(!d.children){
                if(d.number < min_number){
                    min_number = d.number;
                }
            }
            if(d.duration > max_time){
                max_time = d.duration;
            }
            if(d.duration < min_time){
                min_time = d.duration;
            }
        });
        duration_scale = d3.scale.linear().domain([min_time, max_time]).range([0.8, 1]);
        colors = d3.scale.linear().domain([0,max_branch]).range(["blue","orange"]);
        r_scale = d3.scale.linear().domain([min_number,max_number]).range([5,15]);
        stroke_width = d3.scale.pow().exponent(2).domain([min_number,max_number]).range([10,30])
    }

    function update(source) {
        var secondth = [];

        var duration = d3.event && d3.event.altKey ? 5000 : 500;

        // Compute the new tree layout.
        var nodes = tree.nodes(_nodes).reverse();

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d) { 
                if(d.depth==1){second_node[d.id] = 0;}
                return "translate(" + source.y0 + "," + source.x0 + ")"; })
            // .on("click", function(d) { 

            //     if(d3.selectAll(".info_box"))
            //         d3.selectAll(".info_box").remove();
            //     toggle(d); 
            //     update(d);
            //    })
            .on("mouseover", function (d) {
// append div way1
                if(d3.selectAll(".info_box"))
                    d3.selectAll(".info_box").remove();              
                
                var infoBox = d3.select("#body").append("div")
                    .attr("class","info_box")
                    .style({
                      "top": d3.event.pageY + 10 + 'px',
                      'left': d3.event.pageX - 30 + 'px',
                    });

                var angular = infoBox.append("div")
                    .attr("class","angular");
                    

                var box = infoBox.append("div")
                    .attr({
                      "class": "rect_box"
                    });
                    

                var information1 = box.append("div")
                    .attr("class", "text")
                    .text("name:" + d.name);

                var information2 = box.append("div")
                    .attr("class", "text")
                    .text("number: " + d.number);

                var information3 = box.append("div")
                    .attr("class", "text")
                    .html("duration:" + d.duration);
/// rect way3

                // var angular = vis.append("rect")
                //     .attr("class","info_box angular")
                //     .attr("transform", "translate(" + d.y +","+d.x+") rotate(45)")
                //     // .attr("x", d.y)
                //     // .attr("y", d.x)
                //     .attr("width", 50)
                //     .attr("height", 50)
                //     .attr("rx",5);
                // var box = vis.append("div")
                //     .attr({
                //       "class": "info_box rect_box",
                //     })
                //     .attr("x", d.y-50)
                //     .attr("y", d.x + 10) 
                //     .attr("width", 100)
                //     .attr("height", 100)
                //     .attr("stroke", "black")
                //     .attr("fill", "white")
                //     .attr("rx", 5);

                // var information = box.append("text")
                //     .attr("class", "info_box text")
                //     .attr("x", d.y)
                //     .attr("y", d.x+40)
                //     // .attr("transform", "translate(" + d.y +","+d.x+")" )
                    
                //     .attr("dy", ".35em")
                //     .attr("text-anchor","middle")
                //     .text("name: " + d.name +" number: " + d.number + "  duration:" + d.duration)
                //     ;



            });
          

      nodeEnter.append("svg:circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#red"; });

      nodeEnter.append("svg:text")
            .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);


      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
            .attr("r", function (d) { if(!config.path) return 4.5; return r_scale(d.number)})
            .style({"fill" : 
                function (d) { return d._children ? "yellow" : "red"; },
                 "opacity": 
                 function (d) {return duration_scale(d.duration);}
            });

      nodeUpdate.select("text")
            .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

      nodeExit.select("circle")
            .attr("r", 1e-6);

      nodeExit.select("text")
            .style("fill-opacity", 1e-6);

      // Update the links…
      var link = vis.selectAll("path.link")
            .data(tree.links(nodes), function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .style({
                "stroke":function (d, i) {
                  if(config.path){
                    if(d.source.depth == 0){ 
                        // second_node.push(d.target.id);
                        return colors(d.target.id); 
                    }
                    else{
                            for(var key in second_node){
                                secondth.push(key);
                            }
                            secondth.sort();
                            for(var i= 0; i < secondth.length; i++) {
                                if(d.target.id < secondth[i]){
                                    var col = d3.interpolate(colors(secondth[i]),"blue");

                            var linear = d3.scale.linear().domain([0,10]).range([0,1]);
                            return col(linear(d.target.depth));
                                    // return colors(secondth[i]);
                                }
                            }                        
                    }
                  }
                }
                ,"opacity": 
                function (d) {
                    var op = d3.scale.linear().domain([0, 5]).range([0.5,0.9]);
                    return op(d.target.depth);
                }
                ,"stroke-width": function (d, i) { 
                    if(!config.path) return 2;
                    return stroke_width(d.target.number).toString();
                }
            });

      // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children.
    function toggle(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
    }
    function toggleAll(d) {
        if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
        }
    }

    // function showInfo(d) {
    //     if(d3.selectAll(".info_box"))
    //       d3.selectAll(".info_box").remove();
    //     var x = d.x, y = d.y;
    //     // var position = d3.mouse(d);;
    //     var box = d3.select("#body").append("circle")
    //           .attr("class","info_box")
    //          .attr("cx", 0)
    //                 .attr("cy", 20)
    //                 .attr("r", 2)
    //                 .attr("transform", "translate("+x+","+y+")")
    //                 .style("stroke-width", 5 );


    // }

    return instance;
}

var data;
d3.json("../../data/simple-flare.json", function(json) {
  data = json;
});

data = {
 "name": "flare",
 "number":800,
 "duration": 0.1,
 "children": [
  {
   "name": "analytics",
   "number": 300,
   "duration": 0.1,
   "children": [
    {
     "name": "cluster",
     "number": 50,
     "duration": 0.1,
     "children": [
      {"name": "AgglomerativeCluster", "number": 80,"duration": 0.1,"size": 3938},
      {"name": "CommunityStructure", "number": 100,"duration": 0.1,"size": 3812},
      {"name": "MergeEdge", "number": 200,"duration": 0.1, "size": 743}
     ]
    },
    {
     "name": "graph",
     "number": 100,
     "duration": 0.1,
     "children": [
      {"name": "BetweennessCentrality", "number": 200,"duration": 0.1,"size": 3534},
      {"name": "LinkDistance", "number": 200, "duration": 0.1,"size": 5731}
     ]
    },
    {
     "name": "optimization",
     "number": 150,
     "duration": 0.1,
     "children": [
      {"name": "AspectRatioBanker", "number": 200, "duration": 0.1,"size": 7074}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "number": 500,
   "duration": 0.1,
   "children": [
    {"name": "Easing", "number": 200, "duration": 0.1,"size": 17010},
    {"name": "FunctionSequence", "number": 200, "duration": 8.1,"size": 5842},
    {
     "name": "interpolate",
     "number": 200,
     "duration": 0.1,
     "children": [
      {"name": "ArrayInterpolator", "number": 200, "duration": 0.1,"size": 1983},
      {"name": "ColorInterpolator", "number": 300, "duration": 0.1,"size": 2047},
      {"name": "DateInterpolator", "number": 70, "duration": 0.1,"size": 1375},
      {"name": "Interpolator", "number": 20, "duration": 0.1,"size": 8746},
      {"name": "MatrixInterpolator", "number": 200, "duration": 0.1,"size": 2202},
      {"name": "NumberInterpolator", "number": 200, "duration": 0.1,"size": 1382},
      {"name": "ObjectInterpolator", "number": 200, "duration": 0.1,"size": 1629},
      {"name": "PointInterpolator", "number": 200, "duration": 0.5,"size": 1675},
      {"name": "RectangleInterpolator", "number": 2, "duration": 0.1, "size": 2042}
     ]
    },
    {"name": "ISchedulable", "number": 80, "duration": 0.1, "size": 1041},
    {"name": "ISchedulable", "number": 80, "duration": 10.1, "children":[{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},{"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176}]},
    {"name": "Parallel", "number": 20,"duration": 0.1,"size": 5176},
    {"name": "Pause", "number": 100,"duration": 0.1,"size": 449},
    {"name": "Scheduler", "number": 200,"duration": 0.1,"size": 5593},
    {"name": "Sequence", "number": 20,"duration": 0.1,"size": 5534},
    {"name": "Transition", "number": 200,"duration": 0.1,"size": 9201},
    {"name": "Transitioner", "number": 2,"duration": 0.1,"size": 19975},
    {"name": "TransitionEvent", "number": 10,"duration": 0.1,"size": 1116},
    {"name": "Tween", "number": 2,"duration": 1,"size": 6006}
   ]
  }
 ]
}

tree().nodes(data)
    .config({
        svg_width: 1600,
        svg_height: 800,
        margins: {top: 30, left: 120, right: 30, bottom: 30},
        path : true
    })
    .render();