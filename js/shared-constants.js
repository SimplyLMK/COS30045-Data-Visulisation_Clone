const DATA_PATH = "data/Ex6_TVdata.csv";
const ENERGY_LIMIT = 1800;
const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;
const MARGIN = { top: 30, right: 30, bottom: 50, left: 60 };

// Filters configuration used to build buttons dynamically
const FILTERS_SCREEN = [
  { id: "All",  label: "All",  isActive: true  },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// Reusable bin generator: values = array of numbers, domain = [min, max]
function binGenerator(values, domain, thresholds = 20) {
  return d3.bin().domain(domain).thresholds(thresholds)(values);
}

// --- Scatterplot-specific shared variables ---
let innerChartS = null;     // will hold the inner group (g) for scatterplot
let xScaleS = null;         // star rating -> x
let yScaleS = null;         // energy -> y

const SCATTER_WIDTH = 700;   // width for scatterplot SVG (you can reuse SVG_WIDTH if you prefer)
const SCATTER_HEIGHT = 320;

const TOOLTIP_W = 110;
const TOOLTIP_H = 28;

// colour scale (domain set later based on data)
const COLOR_SCALE = d3.scaleOrdinal(d3.schemeSet2);


