// ====== Exercise 4.6 – Scalable Bar Chart with CSV Data ======

const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  // Intentionally small viewBox to test scaling
  .attr("viewBox", "0 0 600 500");



d3.csv("data/tv2.csv", d => ({
  brand: d["Brand_Reg"],
  count: +d["Count"]
})).then(data => {
  console.log("Loaded data:", data);
  createBarChart(data);
});


const createBarChart = data => {
  const svgWidth = 500;
  const svgHeight = 400;

  // --- Step 1: Linear scale for counts (x-axis) ---
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count)]) // min=0, max=data max
    .range([0, svgWidth - 100]); // leave room for labels

  // --- Step 2: Band scale for brands (y-axis) ---
  const yScale = d3
    .scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, svgHeight])
    .padding(0.2); // adds spacing between bars

  // --- Step 3: Draw bars ---
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", 100) // offset to leave space for brand labels
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue");

  // --- Step 4: Add brand labels (y-axis labels) ---
  svg
    .selectAll("text.brand")
    .data(data)
    .join("text")
    .attr("class", "brand")
    .attr("x", 95)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 1.5)
    .attr("text-anchor", "end")
    .attr("font-size", "12px")
    .text(d => d.brand);

  // --- Step 5: Add count labels (inside bars) ---
  svg
    .selectAll("text.value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr("x", d => 100 + xScale(d.count) + 5)
    .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 1.5)
    .attr("font-size", "12px")
    .attr("fill", "black")
    .text(d => d.count);
};
