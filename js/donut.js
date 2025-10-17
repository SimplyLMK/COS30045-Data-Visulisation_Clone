d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv").then(data => {
  data.forEach(d => {
    d.ScreenTechnology = d.Screen_Tech;
    d.TotalEnergyConsumption = +d["Mean(Labelled energy consumption (kWh/year))"];
  });

  const width = document.getElementById("donut").clientWidth;
  const height = 400;
  const radius = Math.min(width, height) / 2 - 20;

  const svg = d3.select("#donut")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.ScreenTechnology))
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  const pie = d3.pie().value(d => d.TotalEnergyConsumption);
  const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);

  svg.selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.ScreenTechnology))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

  svg.selectAll("text")
    .data(pie(data))
    .join("text")
    .text(d => d.data.ScreenTechnology)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px");
});
