
addEventListener("load", addInlineDataGraph);

function addInlineDataGraph() {
  const table = document.getElementsByTagName('table')[0];
  const table_parent = table.parentNode;

  let graph_div = document.createElement('div');
  graph_div.id = "datavis-div1";

  table_parent.insertBefore(graph_div, table);

  getDataFromTable(table);
}


// Requires a DOM element
function getDataFromTable(table) {
  let rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  const nbRows = rows.length;
  let dataObj = [];

  // Stores years for Y data
  let years = [];

  console.log(rows);

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

    let rowData = {};
    // rowData.dataset = [];

    // Otherwise loop through the data
    let cells = rows[i].getElementsByTagName('td');
    const cellsLength = cells.length;

    for (let j = 0; j < cellsLength; j++) {

      // If we're ion the data
      if(j === 0) {
        rowData.country = cells[0].innerHTML;
      }
      else {
        // rowData.dataset.push(cells[j].innerHTML);
        // rowData["Year"] = years[j-1];
        rowData[years[j-1]] = cells[j].innerHTML;
      }
    }
    // End cells loop

    dataObj.push(rowData);

  }
  // End row loop

  console.log(dataObj);
  console.log(years);

}
