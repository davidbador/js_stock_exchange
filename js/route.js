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

loader.classList.add('hide');

showLoader = () => {
    loader.classList.replace('hide', 'show');
}

(async function () {
    showLoader();
    const stockInfo = new StockInformation(stockInformation);
    stockInfo.loadData();
    const stockData = new StockGraph(stockGraphParent);
    stockData.loadChart();
})()