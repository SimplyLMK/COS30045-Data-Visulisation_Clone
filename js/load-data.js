async function loadData() {
  const data = await d3.csv(DATA_PATH, d3.autoType);
  const energyCol = Object.keys(data[0]).find(k => k.toLowerCase().includes("energy"));
  const screenCol = Object.keys(data[0]).find(k => k.toLowerCase().includes("screen"));

  return data
    .filter(d => d[energyCol] < ENERGY_LIMIT)
    .map(d => ({
      energy: d[energyCol],
      screenType: d[screenCol]
    }));
}
