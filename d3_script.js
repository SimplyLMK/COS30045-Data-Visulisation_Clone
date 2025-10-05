// Exercise 4.2 - Manipulate and add elements using D3

// --- Step 2: Change HTML element styles ---
d3.select("h1")
  .style("color", "green")
  .style("font-size", "32px")
  .style("text-decoration", "underline");

// Try changing another element (optional)
d3.select("#info p")
  .style("color", "darkblue")
  .style("font-style", "italic");

// --- Step 3: Append new paragraph ---
d3.select("#info")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!")
  .style("color", "darkgreen")
  .style("font-weight", "bold");

// --- Step 4: Append SVG rectangle ---
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 60)
  .attr("width", 150)
  .attr("height", 60)
  .style("fill", "green")
  .style("stroke", "black")
  .style("stroke-width", "2");

// Optional: append more SVG shapes to experiment
d3.select("svg")
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 90)
  .attr("r", 30)
  .style("fill", "orange");
