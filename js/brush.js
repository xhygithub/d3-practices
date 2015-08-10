function windowSlip(config){
  var config = config;
  var period_window  = config.initialBrushSize;

  var x = d3.time.scale()
      .domain(config.domainRange)
      .range([0, config.width]);

  var brush = d3.svg.brush()
      .x(x)
      .extent(config.initialBrushSize)
      .on("brush", brushed);

  var svg = d3.select("#body").append("svg")
      .attr("class", "brush_svg")
      .attr("width", 960)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(" + 40 + "," + 50 + ")");

  svg.append("rect")//背景矩形
      .attr("class", "grid-background")
      .attr("width", config.width)
      .attr("height", config.height);

  svg.append("g")
      .attr("class", "x grid")
      .attr("transform", "translate(0," + config.height + ")")
      .call(
        d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(config.axis.ticks.unit, config.axis.ticks.value)
          //定义ticks值取值范围，以1/2天为单位,也就是12小时
          .tickSize(-config.height)
          .tickFormat("")
      )
      .selectAll(".tick")
      .classed("minor", function(d) { return d.getHours(); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + config.height + ")")
      .call(
        d3.svg.axis()
          .scale(x) //x定义时间范围，也就是x轴范围以及x值
          .orient("bottom")
          .ticks(config.brush.ticks.unit, config.brush.ticks.value)
          //定义ticks值取值范围，以天为单位 k刻度个数
          .tickPadding(0)//标签数字跟坐标轴的距离
      )
      .selectAll("text")
      .attr("x", 6)
      .style("text-anchor", null);

  var gBrush = svg.append("g")
      .attr("class", "brush")
      .call(brush);

  gBrush.selectAll("rect")
      .attr("height", config.height);

  function brushed() {
    var extent0 = brush.extent(),
        extent1;

    
    // if dragging, preserve the width of the extent
    if (d3.event.mode === "move") {
      var d0 = d3.time.day.round(extent0[0]),
          d1 = d3.time.day.offset(d0, Math.round((extent0[1] - extent0[0]) / 864e5));
      extent1 = [d0, d1];
      console.log(extent0,extent1);
    }
    // otherwise, if resizing, round both dates
    else {
      extent1 = extent0.map(d3.time.day.round);
      // console.log(extent0,extent1);

      // if empty when rounded, use floor & ceil instead
      if (extent1[0] >= extent1[1]) {
        extent1[0] = d3.time.day.floor(extent0[0]);
        extent1[1] = d3.time.day.ceil(extent0[1]);
      }
    }
    period_window = extent1;
    d3.select(this).call(brush.extent(extent1));
    config.onChange({d3Event: d3.event});
  }

  return period_window;
}
