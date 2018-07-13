let data = {};

let table = document.getElementById('table1');

let years = table.getElementsByTagName('tr')[1].getElementsByTagName('th');
let yearsArray = [];

for(let i = 2; i < years.length; i++) {
  let content = years[i].innerHTML;
  yearsArray.push(content);
}

let rows = table.getElementsByTagName('tr');

for(let i = 2; i < rows.length; i++) {
  let cells = rows[i].getElementsByTagName('td');
  let pays = cells[0].innerHTML;
  data[pays] = [];

  for (let j = 1; j < cells.length; j++) {
    let celldata = parseFloat(cells[j].innerHTML.replace(",", "."));
    if(!Number.isNaN(celldata)) data[pays].push({data:celldata, pays:pays, year:yearsArray[j-1]});
  }

}

console.log(data);
