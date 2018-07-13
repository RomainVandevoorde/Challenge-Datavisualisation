
window.addEventListener("load", addInlineDataGraph);
window.addEventListener("load", addInlineDataGraph2);
window.addEventListener("load", addRemoteDataGraph);

function addInlineDataGraph() {
  const table = document.getElementsByTagName('table')[0];
  const table_parent = table.parentNode;

  let graph_div = document.createElement('div');
  graph_div.id = "datavis-div1";

  table_parent.insertBefore(graph_div, table);

  // Create the graph

  let svg = dimple.newSvg("#"+graph_div.id, "100%", 600);
  let data = getDataFromTable1(table);

  let myChart = new dimple.chart(svg, data);
  let x = myChart.addCategoryAxis("x", "Year");
  let y = myChart.addMeasureAxis("y", "Nombre");
  myChart.setBounds(60, 100, "100%,-61px", "450px");
  let legend = myChart.addLegend(0, 10, "100%", 100, "left");
  myChart.addSeries("Country", dimple.plot.line, [x, y]);

  // Sizing
  // y.useLog = true;
  // y.overrideMin = 1000;
  // y.logBase = 2;
  // y.overrideMax = 500000;

  myChart.draw();
  // myChart.legends = [];

  // Add click event to legend
  legend.shapes.selectAll("rect").on("click", function(e) {
    console.log(e);
    // myChart.legends = [];
    // d3.select(this).style("opacity", 0.2);
    toggleCountry(e, myChart, data, d3.select(this));
  });
}

function addInlineDataGraph2() {
  const table = document.getElementById("table2");
  let div = document.createElement("div");
  div.id = "datavis-div2";

  table.parentNode.insertBefore(div, table);

  let svg = dimple.newSvg("#"+div.id, "100%", 600);
  let data = getTable2Data(table);

  let myChart = new dimple.chart(svg, data);
  let x = myChart.addCategoryAxis("x", "year");
  let y = myChart.addMeasureAxis("y", "data");
  myChart.setBounds(60, 100, "100%,-61px", "450px");
  let legend = myChart.addLegend(0, 10, "100%", 100, "left");
  myChart.addSeries("country", dimple.plot.line, [x, y]);

  myChart.draw();
}

function getTable2Data(table) {
  let data = [];

  let rows = table.rows;
  let nbRows = rows.length;

  for(let i = 1; i < nbRows; i++) {

    let cells = rows[i].cells;
    let nbCells = cells.length;

    for(let j = 2; j < nbCells; j++) {
      // console.log(rows[0].cells);
      data.push({
        "year" : rows[0].cells[j].innerHTML,
        "country" : cells[1].innerHTML,
        "data" : cells[j].innerHTML});
    }

  }

  console.log(data);
  return data;

}

function toggleCountry(e, graph, data, target) {
  console.log(e);
  let country = e.aggField[0];
  let hide = false;
  let values = dimple.getUniqueValues(data, "Country");
  let newFilters = [];
  let nbValues = values.length;
  for(let value of values) {
    console.log(value);
    if(value === e.aggField[0]) {
      console.log("found ya");
      hide = true;
    } else {
      newFilters.push(value);
    }
  }

  if(hide) {
    target.style("opacity", 0.2);
  }
  else {
    target.style("opacity", 0.8);
    newFilters.push(country);
  }

  graph.data = dimple.filterData(data, "Country", newFilters);
  graph.draw(1200);
}

// ****************************
//
// Function to get data from the first table
// Requires a DOM element
//
// ****************************
function getDataFromTable1(table) {
  let rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const nbRows = rows.length;

  // Stores all the data points
  let dataObj = [];
  // Stores years for Y data
  let years = [];

  // Loop through the rows of the array
  for (let i = 0; i < nbRows; i++) {

    // Use the first row to get the year legend
    if(i === 0) {
      let cells = rows[0].getElementsByTagName('th');
      let nbCells = cells.length;

      // Start at 2 because the first 2 cells are empty
      for (let j = 2; j < nbCells; j++) {
        years.push(cells[j].innerHTML);
      }
      continue;
    }

    // Loop through the data for each country
    let cells = rows[i].getElementsByTagName('td');
    let cellsLength = cells.length;
    // Each row corresponds to a country
    let rowCountry = cells[0].innerHTML;

    for (let j = 1; j < cellsLength; j++) {
        let dataPoint = {"Country":rowCountry};
        dataPoint["Year"] = years[j-1];
        dataPoint["Nombre"] = parseFloat(cells[j].innerHTML.replace(",", "."))*1000;
        // If the data is not NaN, push to the data array
        if(!Number.isNaN(dataPoint["Nombre"])) dataObj.push(dataPoint);
    }
    // End cells loop
  }
  // End row loop

  console.log(dataObj);
  return dataObj;

}


function addRemoteDataGraph() {
  const container = document.getElementById("content");

  let div = document.createElement("div");
  div.id = "datavis-div3";

  container.insertBefore(div, container.firstChild);
}
