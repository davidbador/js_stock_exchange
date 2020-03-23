// Global Variables
const stockInformation = document.getElementById('stockInformation');
const titleParent = document.createElement('div');
const stockPriceParent = document.createElement('div');
stockPriceParent.id = 'stockPrice';
const stockDescriptionParent = document.createElement('div');
stockDescriptionParent.id = 'stockDescription'
const stockGraphParent = document.createElement('div');
const stockGraphChild = document.createElement('canvas');
stockGraphChild.id = 'myChart';
const loader = document.getElementById('loader');

// Class Modifiers
loader.classList.add('hide');

// Function to show Loader before results are displayed
showLoader = () => {
    loader.classList.replace('hide', 'show');
}

// Asynchronous function for receiving Stock Data and Stock Price Graph
(async function () {
    showLoader();
    const stockInfo = new StockInformation(stockInformation);
    stockInfo.loadData();
    const stockData = new StockGraph(stockGraphParent);
    stockData.loadChart();
})()