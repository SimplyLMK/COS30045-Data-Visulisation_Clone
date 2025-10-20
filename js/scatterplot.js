// drawScatterplot: energy (y) vs star rating (x), colour by screenType, tooltip shows screenSize

async function drawScatterplot(selectedType = "All") {
  const data = await loadData(); // reuses the loader
  const filtered = selectedType === "All" ? data : data.filter(d => d.screenType === selectedType);

  // Prepare DOM
  d3.select("#scatterplot").selectAll("*").remove();
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", SCATTER_WIDTH)
    .attr("height", SCATTER_HEIGHT);

  const innerWidth = SCATTER_WIDTH - MARGIN.left - MARGIN.right;
  const innerHeight = SCATTER_HEIGHT - MARGIN.top - MARGIN.bottom;

  // create inner group and expose it to shared var so tooltip code can attach to it
  innerChartS = svg.append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  // scales
  const stars = filtered.map(d => +d.star).filter(Boolean);
  const energies = filtered.map(d => +d.energy).filter(Boolean);

  xScaleS = d3.scaleLinear()
    .domain([d3.min(stars) - 0.25, d3.max(stars) + 0.25])
    .range([0, innerWidth]);

  yScaleS = d3.scaleLinear()
    .domain([0, d3.max(energies)])
    .range([innerHeight, 0]);

  // set colour domain from data categories
  // keep colour scheme consistent across filters by using full dataset's categories
  const screenTypes = Array.from(new Set((await loadData()).map(d => d.screenType)));
  COLOR_SCALE.domain(screenTypes);

  // axes
  innerChartS.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScaleS).ticks(6))
    .append("text")
    .attr("x", innerWidth / 2)
    .attr("y", 36)
    .attr("fill", "black")
    .text("Star rating");

  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS))
    .append("text")
    .attr("x", -40)
    .attr("y", -10)
    .attr("fill", "black")
    .text("Energy consumption (kWh/year)");

  // points
  const points = innerChartS.selectAll("circle")
    .data(filtered)
    .join("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energy))
    .attr("r", 4)
    .attr("fill", d => COLOR_SCALE(d.screenType))
    .attr("opacity", 0.6);

  // legend (simple)
  const legend = svg.append("g")
    .attr("transform", `translate(${SCATTER_WIDTH - MARGIN.right - 120}, ${MARGIN.top})`);

  screenTypes.forEach((t, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 18})`);
    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", COLOR_SCALE(t));
    g.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .attr("fill", "#222")
      .attr("font-size", 12)
      .text(t);
  });

  // tooltip group appended to innerChartS
  const tooltip = innerChartS.append("g")
    .attr("class", "scatter-tooltip")
    .style("opacity", 0);

  tooltip.append("rect")
    .attr("width", TOOLTIP_W)
    .attr("height", TOOLTIP_H)
    .attr("rx", 6)
    .attr("fill", "#333")
    .attr("opacity", 0.85);

  const tooltipText = tooltip.append("text")
    .attr("x", 8)
    .attr("y", TOOLTIP_H / 2 + 4)
    .attr("fill", "#fff")
    .attr("font-size", 12);

  // event handlers
  points.on("mouseenter", function(event, d) {
    // bring point to front
    d3.select(this).raise().attr("stroke", "#000").attr("stroke-width", 0.6);

    // set text and position
    const cx = +d3.select(this).attr("cx");
    const cy = +d3.select(this).attr("cy");
    tooltipText.text(`Size: ${d.screenSize}"`);
    // prefer to place tooltip above point unless near top edge
    const tx = cx + 8;
    const ty = cy - TOOLTIP_H - 6;
    tooltip.attr("transform", `translate(${Math.max(0, tx)}, ${Math.max(0, ty)})`);
    tooltip.transition().duration(120).style("opacity", 1);
  }).on("mouseleave", function() {
    d3.select(this).attr("stroke", null);
    tooltip.transition().duration(120).style("opacity", 0);
  });
}

// Expose the function so interactions.js can call it
window.drawScatterplot = drawScatterplot;