d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv").then(data => {
  data.forEach(d => {
    d.ScreenTechnology = d.Screen_Tech;
    d.MeanEnergyConsumption = +d["Mean(Labelled energy consumption (kWh/year))"];
  });

  const margin = { top: 20, right: 30, bottom: 50, left: 70 };
  const width = document.getElementById("bar").clientWidth - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.ScreenTechnology))
    .range([0, width])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.MeanEnergyConsumption)])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.ScreenTechnology))
    .attr("y", d => y(d.MeanEnergyConsumption))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.MeanEnergyConsumption))
    .attr("fill", "#2a9d8f");
});
