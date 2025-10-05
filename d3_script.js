// Exercise 4.3 - D3 Setup

// Step 2: Create SVG inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")  // viewBox for responsive scaling
  .style("border", "1px solid black"); // optional for visibility

// Step 3: Add a test rectangle
svg
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "blue");
