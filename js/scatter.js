d3.csv("data/Ex5_TV_energy.csv").then(data => {
  data.forEach(d => {
    d.StarRating = +d.star2;
    d.EnergyConsumption = +d.energy_consumpt;
  });

  const margin = { top: 30, right: 30, bottom: 50, left: 70 };
  const width = document.getElementById("scatter").clientWidth - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.StarRating))
    .nice()
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.EnergyConsumption)])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.StarRating))
    .attr("cy", d => y(d.EnergyConsumption))
    .attr("r", 4)
    .attr("fill", "#1f77b4")
    .attr("opacity", 0.7);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");
});
