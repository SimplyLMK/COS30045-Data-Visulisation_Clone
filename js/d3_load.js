// STEP 1: Define SVG
const svgWidth = 700;
const svgHeight = 400;
const barHeight = 30;
const barPadding = 10;

// Create SVG inside the #chart container
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("background", "#fafafa")
  .style("border", "1px solid #ccc");

d3.csv("data/tv2.csv", d => ({
  brand: d["Brand_Reg"],
  count: +d["Count"]
})).then(data => {
  console.log("Loaded data:", data);


  data.sort((a, b) => d3.descending(a.count, b.count));

  createBarChart(data);
});

// STEP 3: Draw bar chart
function createBarChart(data) {
  const maxWidth = d3.max(data, d => d.count) * 20;

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 100)
    .attr("y", (d, i) => i * (barHeight + barPadding))
    .attr("width", d => d.count * 20)
    .attr("height", barHeight)
    .attr("fill", "steelblue");

  svg.selectAll("text.label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("x", 10)
    .attr("y", (d, i) => i * (barHeight + barPadding) + barHeight / 1.5)
    .text(d => d.brand);

  svg.selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", d => 100 + d.count * 20 + 10)
    .attr("y", (d, i) => i * (barHeight + barPadding) + barHeight / 1.5)
    .text(d => d.count);
}
