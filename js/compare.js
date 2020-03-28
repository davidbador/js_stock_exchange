// Global Namespace Variable
let store = {};

// Asynchronous Function being called to input information into the Comparison Section
(async function () {
    store.container = document.getElementById('container');
    store.stockInfo = new StockComparisonInformation(store.container);
})()