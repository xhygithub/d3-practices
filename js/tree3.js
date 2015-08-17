

function tree() {

      var m , w , h , i = 0, count = 0;
      var number_display, duration_display;
      var tree, diagonal, vis;
      var  _nodes = root = [], instance = {};
      var second_node = {};
      var secondth = [];
      var colors, r_scale, duration_scale, stroke_width;



      instance.config = function (myConfigs) {

          config = {
              w:    myConfigs.tree_width || 200,
              h:    myConfigs.tree_height || 1000,
              m:    myConfigs.margins || {top: 30, left: 120, right: 30, bottom: 30},
              path:       myConfigs.path   || false,
              slice_start:      myConfigs.slice_start   ||  0,
              slice_end:        myConfigs.slice_end     ||  1,
              number_display: myConfigs.number_display || false,
              duration_display: myConfigs.duration_display || false
          };

          return instance;
      };

      instance.nodes = function (n) {
          if (!arguments.length) return _nodes;
          _nodes = n;
          root = n;
          _nodes.x0 = config.w / 2;
          _nodes.y0 = 0;

          return instance;
      };


      instance.initial = function () {

        tree = d3.layout.tree()
            .size([config.h, config.w]);

        diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x];});

        vis = d3.select('#tree-position').append('svg:svg')
            .attr('class', 'tree_svg')
            .attr('width', config.w + config.m.left + config.m.right)
            .attr('height', config.h + config.m.top + config.m.bottom )
            .append('svg:g')
            .attr('transform', 'translate(' + config.m.left + ',' + config.m.top+ ')');


        var nodes = tree.nodes(root);        
        var max_branch = nodes.length,
            max_number , 
            min_number, 
            max_time , 
            min_time ;
        var timeArray = [], numberArray = [];

        nodes.forEach(function (d) {
            if(d.depth) {
              var sum_number = 0, sum_duration = 0;
              for(var i = 0; i < d.number.length; i++){
                sum_number += d.number[i];
                sum_duration += d.duration[i];
                timeArray.push(d.number[i]);
                numberArray.push(d.duration[i]);

              }
              // timeArray.push(sum_duration);
              // numberArray.push(sum_number);
            }
        });
        // console.log(nodes);
        max_time = Math.max.apply(null, timeArray);
        min_time = Math.min.apply(null,timeArray);
        min_number = Math.min.apply(null,numberArray);
        max_number = Math.max.apply(null,numberArray);

        duration_scale = d3.scale.linear().domain([min_time,max_time]).range([2,25]);
        
        colors = d3.scale.linear().domain([0,max_branch]).range(['blue','orange']);
        r_scale = d3.scale.linear().domain([min_number,max_number]).range([2,25]);
        stroke_width = d3.scale.linear().domain([min_number,max_number]).range([4,50]);

        return instance;
      }

      instance.render = function () {

          initialRender(_nodes);
          
      };
      instance.update = function () {

          change(_nodes);
          
      };

      function change(_nodes){
        var nodes = tree.nodes(_nodes).reverse();
        vis.selectAll('circle.circle-number')
            .transition()
            .duration(500)
            .attr('r', function(d) {
              if(!d.depth)
                return 20;
              else {
                var sum_number = 0;
                for(var i = config.slice_start; i < config.slice_end; i++){
                  sum_number += d.number[i];
                }
                return r_scale(sum_number); 
              }
            })
            .style({
              'opacity': function(d) {if(!config.number_display) return 0; return 1;}            
 
            });
        vis.selectAll('circle.circle-duration')
            .transition()
            .duration(500)
            .attr('r' , function(d) { 
              if(!d.depth) return 20;
              else {
                var sum_duration = 0;
                for(var i = config.slice_start; i < config.slice_end; i++){
                  sum_duration += d.duration[i];
                }
                return r_scale(sum_duration); 
              }           
            })
            .style({
              'opacity': function(d) {if(!config.duration_display) return 0; return 0.8;}            
            });

         
        vis.selectAll('path.link')
          .transition()
          .duration(500)
          .style({'stroke-width': function(d) { 
            if(!config.path)
              return 2;
            else{
              var sum_number = 0, sum_duration = 0;
              for(var i = config.slice_start; i < config.slice_end; i++){
                sum_number += d.target.number[i];
                sum_duration += d.target.duration[i];
              }
              if(config.number_display && config.duration_display) {
                if(sum_number > sum_duration){                    
                  return stroke_width(sum_number).toString();
                }
                return stroke_width(sum_duration).toString();
              }else if(config.number_display){     
                return stroke_width(sum_number).toString();

              }
              return stroke_width(sum_duration).toString();
            }

          }});


      }

      function initialRender() {
          // i = 0;
          var nodes = tree.nodes(_nodes).reverse();
          nodes.forEach(function(d) { d.y = d.depth * 180; });

          var node = vis.selectAll('g.node')
              .data(nodes, function(d) { return d.id || (d.id = ++i); });

          var nodeEnter = node.enter().append('svg:g')
              .attr('class', 'node')
              .attr('transform', function(d) { 
                  if(d.depth == 1){ second_node[d.id] = 0;}
                  return 'translate(' + d.y + ',' + d.x + ')'; 
              })
              .on('click', function(d) { 
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove();
                  toggle(d); 
                  update(d);
              })
              .on('mouseout', function (d) {             
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove(); 

              })
              .on('mouseover', function (d) {
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove();              
                  
                  var infoBox = d3.select('#tree-position').append('div')
                      .attr('class','info_box')
                      .style({
                        'top': d3.event.pageY + 10 + 'px',
                        'left': d3.event.pageX - 30 + 'px',
                      });

                  var angular = infoBox.append('div')
                      .attr('class','angular');
                      
                  var box = infoBox.append('div')
                      .attr({
                        'class': 'rect_box'
                      });
                      
                  var information1 = box.append('div')
                      .attr('class', 'text')
                      .text('name:' + d.name);
                  if(d.depth){
                      
                    var sum_duration = 0, sum_number = 0;
                    for(var i = config.slice_start; i < config.slice_end; i++){
                      sum_duration += d.duration[i];
                      sum_number += d.number[i];
                    }
                
                  var information2 = box.append('div')
                      .attr('class', 'text')
                      .text('number:' + sum_number);

                  var information3 = box.append('div')
                      .attr('class', 'text')
                      .html('duration:' + sum_duration);                    
                  }
              });
        nodeEnter.append('svg:circle')
              .attr('class', 'circle-number')
              .attr('r', function (d) { 
                if(d.depth) {
                  var sum_number = 0;
                  for(var i = config.slice_start; i < config.slice_end; i++){
                    sum_number += d.number[i];
                  }
                  return r_scale(sum_number); 
                }
                return 20;
              })
              .style({
                'fill': function(d) {if(!d.depth) return 'black'; return 'green';}
            });

        nodeEnter.append('svg:circle')
              .attr('class', 'circle-duration')
              .attr('r', function (d) { 
                if(d.depth) {
                  var sum_duration = 0;
                  for(var i = config.slice_start; i < config.slice_end; i++){
                    sum_duration += d.duration[i];
                  }
                  return r_scale(sum_duration); 
                }
                return 20;
              })
              .style({
                'fill': function(d) {if(!d.depth) return 'black'; return 'yellow';}
                ,'opacity': 0.8
            });
        nodeEnter.append('svg:text')
              .attr('x', function(d) { return d.children || d._children ? -10 : 10; })
              .attr('dy', '.35em')
              .attr('text-anchor', function(d) { return d.children || d._children ? 'end' : 'start'; })
              .text(function(d) { return d.name; })
              .style('fill-opacity', 1);

        var link = vis.selectAll('path.link')
              .data(tree.links(nodes), function(d) { return d.target.id; });

        link.enter().insert('svg:path', 'g')
              .attr('class', 'link')
              .attr('d', diagonal)
              .style({
                  'stroke':function (d, i) {
                    if(config.path){
                      if(d.source.depth == 0){ 
                          // second_node.push(d.target.id);
                          return colors(d.target.id); 
                          
                      }
                      else {                      
                        for(var key in second_node) {
                            secondth.push(key);
                        }
                        secondth.sort();
                        for(var i = 0; i < secondth.length; i++) {
                          if(d.target.id < secondth[i]) {
                              var col = d3.interpolate(colors(secondth[i]),'blue');
                              var linear = d3.scale.linear().domain([0,10]).range([0,1]);
                              return col(linear(d.target.depth));
                              // return colors(secondth[i]);
                          }
                        }                        
                      }
                    }
                  }
                  ,'opacity': 
                  function (d) {
                      var op = d3.scale.linear().domain([0, 5]).range([0.5,0.9]);
                      return op(d.target.depth);
                  }
                  ,'stroke-width': function (d, i) { 
                      if(!config.path) return 2;
                      else{
                        var sum_number = 0, sum_duration = 0;
                        for(var i = config.slice_start; i < config.slice_end; i++){
                          sum_number += d.target.number[i];
                          sum_duration += d.target.duration[i];
                        }
                        if(config.number_display && config.duration_display) {
                          if(sum_number > sum_duration){                    
                            return stroke_width(sum_number).toString();
                          }
                          return stroke_width(sum_duration).toString();
                        }else if(config.number_display){     
                          return stroke_width(sum_number).toString();

                        }
                        return stroke_width(sum_duration).toString();
                      }
                      
                  }

              });
      }

      function update(source) {
          

          var duration = d3.event && d3.event.altKey ? 5000 : 500;

          // Compute the new tree layout.
          var nodes = tree.nodes(_nodes).reverse();

          // Normalize for fixed-depth.
          nodes.forEach(function(d) { d.y = d.depth * 180; });

          // Update the nodes…
          var node = vis.selectAll('g.node')
              .data(nodes, function(d) { return d.id || (d.id = ++i); });

          // Enter any new nodes at the parent's previous position.
          var nodeEnter = node.enter().append('svg:g')
              .attr('class', 'node')
              .attr('transform', function(d) { 
                  // if(d.depth == 1){ second_node[d.id] = 0;}
                  return 'translate(' + source.y0 + ',' + source.x0 + ')'; 
              })
              .on('click', function(d) { 
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove();
                  toggle(d); 
                  update(d);
              })
              .on('mouseout', function (d) {             
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove(); 

              })
              .on('mouseover', function (d) {
                  if(d3.selectAll('.info_box'))
                      d3.selectAll('.info_box').remove();              
                  
                  var infoBox = d3.select('#tree-position').append('div')
                      .attr('class','info_box')
                      .style({
                        'top': d3.event.pageY + 10 + 'px',
                        'left': d3.event.pageX - 30 + 'px',
                      });

                  var angular = infoBox.append('div')
                      .attr('class','angular');
                      
                  var box = infoBox.append('div')
                      .attr({
                        'class': 'rect_box'
                      });
                      
                  var information1 = box.append('div')
                      .attr('class', 'text')
                      .text('name:' + d.name);
                  if(d.depth){
                    var sum_duration = 0, sum_number = 0;
                    for(var i = config.slice_start; i < config.slice_end; i++){
                      sum_duration += d.duration[i];
                      sum_number += d.number[i];
                    }
                  var information2 = box.append('div')
                      .attr('class', 'text')
                      .text('number: ' + sum_number);

                  var information3 = box.append('div')
                      .attr('class', 'text')
                      .html('duration:' + sum_duration);
                  }
              });
            

        nodeEnter.append('svg:circle')
              .attr('class', 'circle-number')
              .attr('r', function (d) { 
                if(d.depth) {
                  var sum_number = 0;
                  for(var i = config.slice_start; i < config.slice_end; i++){
                    sum_number += d.number[i];
                  }
                  return r_scale(sum_number); 
                }
                return 20;}
              )
              .style({
                'fill': 'green',
                'opacity': function(d) {if(!config.number_display) return 0;return 1;}
           
            });

        nodeEnter.append('svg:circle')
              .attr('class', 'circle-duration')
              .attr('r', function (d){ 
                if(d.depth) {
                  var sum_duration = 0;
                  for(var i = config.slice_start; i < config.slice_end; i++){
                    sum_duration += d.duration[i];
                  }
                  return r_scale(sum_duration); 
                }
                return 20;}
              )
              .style({'fill':'yellow',
                'opacity': function(d) {if(!config.duration_display) return 0; return 1;}
           
            });
    
        nodeEnter.append('svg:text')
              .attr('x', function(d) { return d.children || d._children ? -10 : 10; })
              .attr('dy', '.35em')
              .attr('text-anchor', function(d) { return d.children || d._children ? 'end' : 'start'; })
              .text(function(d) { return d.name; })
              .style('fill-opacity', 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
              .duration(duration)
              .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

        nodeUpdate.select('text')
              .style('fill-opacity', 1);

        

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
              .duration(duration)
              .attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
              .remove();

        nodeExit.select('circle')
              .attr('r', 1e-6);

        nodeExit.select('text')
              .style('fill-opacity', 1e-6);

        // Update the links…
        var link = vis.selectAll('path.link')
              .data(tree.links(nodes), function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert('svg:path', 'g')
              .attr('class', 'link')
              .attr('d', function(d) {
                  var o = {x: source.x0, y: source.y0};
                  return diagonal({source: o, target: o});
              })
              .style({
                  'stroke':function (d, i) {
                    if(config.path){
                      if(d.source.depth == 0){ 
                          // second_node.push(d.target.id);
                          return colors(d.target.id); 
                      }
                      else {                      
                        for(var key in second_node) {
                            secondth.push(key);
                        }
                        secondth.sort();
                        for(var i = 0; i < secondth.length; i++) {
                          if(d.target.id < secondth[i]) {
                              var col = d3.interpolate(colors(secondth[i]),'blue');
                              var linear = d3.scale.linear().domain([0,10]).range([0,1]);
                              return col(linear(d.target.depth));
                              // return colors(secondth[i]);
                          }
                        }                        
                      }
                    }
                  }
                  ,'opacity': 
                  function (d) {
                      var op = d3.scale.linear().domain([0, 5]).range([0.5,0.9]);
                      return op(d.target.depth);
                  }
                  ,'stroke-width': function (d, i) { 
                      if(!config.path) return 2;
                      else{
                        var sum_number = 0, sum_duration = 0;
                        for(var i = config.slice_start; i < config.slice_end; i++){
                          sum_number += d.target.number[i];
                          sum_duration += d.target.duration[i];
                        }
                        if(config.number_display && config.duration_display) {
                          if(sum_number > sum_duration){                    
                            return stroke_width(sum_number).toString();
                          }
                          return stroke_width(sum_duration).toString();
                        }else if(config.number_display){     
                          return stroke_width(sum_number).toString();

                        }
                        return stroke_width(sum_duration).toString();
                      }
                      
                  }
              });

        // Transition links to their new position.
          link.transition()
              .duration(duration)
              .attr('d', diagonal);

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
              .duration(duration)
              .attr('d', function(d) {
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

      return instance;
  
}