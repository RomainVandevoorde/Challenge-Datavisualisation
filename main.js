
addEventListener("load", addInlineDataGraph);

function addInlineDataGraph() {
  const table = document.getElementsByTagName('table')[0];
  const table_parent = table.parentNode;

  let graph_div = document.createElement('div');
  graph_div.id = "datavis-div1";

  table_parent.insertBefore(graph_div, table);

  let svg = dimple.newSvg("#"+graph_div.id, 590, 800);
  let data = getDataFromTable(table);
  console.log(data);
  let myChart = new dimple.chart(svg, data);
  myChart.setBounds(60, 30, 505, 705);
  let x = myChart.addCategoryAxis("x", "Year");
  let y = myChart.addMeasureAxis("y", "Nombre");
  // y.overrideMax = 50000;
  myChart.addLegend(60, 10, 500, 20, "right");
  myChart.addSeries("Country", dimple.plot.line, [x, y]);
  myChart.draw();
}


// Requires a DOM element
function getDataFromTable(table) {
  let rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const nbRows = rows.length;
  let dataObj = [];

  // Stores years for Y data
  let years = [];

  for (let i = 0; i < nbRows; i++) {

    // Skip if it's the first row (titles)
    if(i === 0) {
      let cells = rows[0].getElementsByTagName('th');
      let nbCells = cells.length;

      for (let j = 0; j < nbCells; j++) {
        // Skip first two matches (they're empty)
        if (j < 2) continue;
        // Push the data for the rest
        years.push(cells[j].innerHTML);
      }
      continue;
    }

    // Otherwise loop through the data
    let cells = rows[i].getElementsByTagName('td');
    let cellsLength = cells.length;

    let rowCountry = cells[0].innerHTML;

    for (let j = 1; j < cellsLength; j++) {
        let dataPoint = {"Country":rowCountry};
        dataPoint["Year"] = years[j-1];
        let nb = parseFloat(cells[j].innerHTML.replace(",", "."))*1000;
        dataPoint["Nombre"] = Number.isNaN(nb) ? 0 : nb;

        dataObj.push(dataPoint);
    }
    // End cells loop

  }
  // End row loop

  console.log(dataObj);
  return dataObj;

}
