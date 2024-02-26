/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// init global variables & switches
let myMapVis,
    myBarVisOne,
    categoryNames,
    myDendroVis;

let mode = 'beg';
// grab selected category of foods for mapVis
let selectedFood = d3.select("#categorySelector").property("value");
let selectedCountry = '';


// load data
let promises = [
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"), // 0
    d3.csv("Map_category.csv"), // 1
    d3.csv("DendrogramData.csv"), // 2
];

Promise.all(promises)
    .then(function (data) {
        categoryNames = [... new Set(data[1].map(row => row.Category))];

        initMainPage(data)
    })
    .catch(function (err) {
        console.log(err)
    });

// // dictionary to help naming
// let categoryNames = {
//     "all": "All Categories of Fermented Foods",
//     "fruits and vegetables": "Fermented Fruits and Vegetables",
//     "roots and legumes": "Fermented Roots and Legumes",
//     "cereal": "Fermented Cereals",
//     "cheese": "Fermented Cheese",
//     "meat": "Fermented Meats",
//     "dairy product": "Fermented Dairy Products",
//     "legumes": "Fermented Legumes",
//     "roots": "Fermented Roots",
//     "beverage": "Fermented Beverages",
//     "vegetables": "Fermented Vegetables",
//     "fish": "Fermented Fish",
//     "fruit": "Fermented Fruit"
// };

// when category of food changes, update for mapVis, dendroVis, and mapBarVis
function categoryChange() {
    selectedFood =  document.getElementById('categorySelector').value;
    myMapVis.wrangleData();
    myBarVisOne.wrangleData();
    myDendroVis.wrangleData();
}

// initMainPage
function initMainPage(dataArray) {
    // console.log('check out the data', dataArray);
    selectedCountryLink = '';

    // init map
    myMapVis = new MapVis('mapDiv', dataArray[0], dataArray[1]);
    // init top 10 graph
    myBarVisOne = new mapBarVis('barplotDiv',  dataArray[0], dataArray[1]);
    // init dendrogram
    myDendroVis = new dendroVis('dendroDiv', dataArray[2]);
}



