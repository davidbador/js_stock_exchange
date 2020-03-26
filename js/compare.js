(async function () {
    let container = document.getElementById('container');
    const stockInfo = new StockComparisonInformation(container);
    stockInfo.loadData();
})()