let store = {};

(async function () {
    store.container = document.getElementById('container');
    store.stockInfo = new StockComparisonInformation(store.container);
})()