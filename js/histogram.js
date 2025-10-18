async function drawHistogram(selectedType = "All") {
  const data = await loadData();

  const filtered =
    selectedType === "All"
      ? data
      : data.filter(d => d.screenType === selectedType);

  d3.select("#chart").selectAll("*").remove();

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", SVG_WIDTH)
    .attr("height", SVG_HEIGHT);

  const width = SVG_WIDTH - MARGIN.left - MARGIN.right;
  const height = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

  const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(filtered, d => d.energy)])
    .range([0, width]);

  const bins = d3.bin()
    .domain(x.domain())
    .thresholds(20)
    (filtered.map(d => d.energy));

  const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height, 0]);

  // bars
  g.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => x(d.x0))
    .attr("y", d => y(d.length))
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => height - y(d.length))
    .attr("fill", "#555");

  // x-axis
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .text("Labeled Energy Consumption (kWh/year)");

  // y-axis
  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("x", -40)
    .attr("y", -10)
    .attr("fill", "black")
    .text("Frequency");
}
