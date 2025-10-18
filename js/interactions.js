document.addEventListener("DOMContentLoaded", () => {
  drawHistogram("All");

  d3.selectAll(".filter-btn").on("click", function () {
    d3.selectAll(".filter-btn").classed("active", false);
    d3.select(this).classed("active", true);
    const type = d3.select(this).attr("data-type");
    drawHistogram(type);
  });
});
