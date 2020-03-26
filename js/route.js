// Global Variables
let store = {};

// Function to show Loader before results are displayed
store.showLoader = () => {
    store.loader = document.getElementById('loader');
    store.loader.classList.replace('hide', 'show');
}

// Asynchronous function for receiving Stock Data and Stock Price Graph
(async function () {
    store.showLoader();
    store.stockInformation = document.getElementById('stockInformation');
    store.titleParent = document.createElement('div');
    store.stockPriceParent = document.createElement('div');
    store.stockPriceParent.id = 'stockPrice';
    store.stockDescriptionParent = document.createElement('div');
    store.stockDescriptionParent.id = 'stockDescription'
    store.stockGraphParent = document.createElement('div');
    store.stockGraphChild = document.createElement('canvas');
    store.stockGraphChild.id = 'myChart';
    store.stockInfo = new StockInformation(store.stockInformation);
    store.stockData = new StockGraph(store.stockGraphParent);
})()