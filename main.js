
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

  console.log(rows);

  for (let i = 0; i < nbRows; i++) {

    // Skip if it's the first row (titles)
    if(i === 0) {
      continue;
    }

    console.log(rows[i]);
    console.log(i);

    let rowData = {};
    rowData.dataset = [];

    // Otherwise loop through the data
    let cells = rows[i].getElementsByTagName('td');
    const cellsLength = cells.length;

    for (let j = 0; j < cellsLength; j++) {
      if(j === 0) {
        rowData.country = cells[0].innerHTML;
      }
      else {
        rowData.dataset.push(cells[j].innerHTML);
      }
    }
    // End cells loop

    dataObj.push(rowData);

  }
  // End row loop

  console.log(dataObj);

}
