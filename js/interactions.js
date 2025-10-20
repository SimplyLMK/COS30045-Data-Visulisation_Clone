document.addEventListener("DOMContentLoaded", async () => {
  // build filter buttons from FILTERS_SCREEN and wire up interactions
  populateFilters(FILTERS_SCREEN);

  // draw initial histogram for the active filter
  const active = FILTERS_SCREEN.find(f => f.isActive)?.id || "All";
  drawHistogram(active);

  // draw scatterplot (shows all data, adds tooltip interactions)
  if (typeof drawScatterplot === "function") {
    drawScatterplot(active);
  }
});

function populateFilters(filters) {
  const container = d3.select("#filter-buttons");
  container.selectAll("*").remove();

  container.selectAll("button")
    .data(filters, d => d.id)
    .join("button")
    .attr("class", d => `filter-btn${d.isActive ? " active" : ""}`)
    .attr("data-type", d => d.id)
    .text(d => d.label)
    .on("click", function (event, d) {
      // update in-memory filter state
      filters.forEach(f => f.isActive = f.id === d.id);

      // update button classes
      container.selectAll("button").classed("active", f => f.isActive);

      // redraw histogram for selected filter
      drawHistogram(d.id);

      // also update scatterplot to match the selected filter
      if (typeof drawScatterplot === "function") {
        drawScatterplot(d.id);
      }
    });
}
