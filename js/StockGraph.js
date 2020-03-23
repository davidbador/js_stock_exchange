// StockGraph class used to create the Stock Price Graph
class StockGraph {
    constructor(div) {
        this.div = div;
    }
    createStockPriceHistory = async () => {
        let urlParams = new URLSearchParams(window.location.search);
        let symbol = urlParams.get('symbol');
        let history = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`);
        let data = await history.json();
        stockInformation.appendChild(this.div);
        this.div.appendChild(stockGraphChild);
        let dataDates = [];
        let dataCloses = [];
        let chosenDataDates = [];
        let chosenDataCloses = [];
        data.historical.forEach(function (object) {
            dataDates.push(object.date);
            dataCloses.push(object.close);
        })
        this.pushData(dataDates, dataCloses, chosenDataDates, chosenDataCloses);
        var ctx = stockGraphChild.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chosenDataDates,
                datasets: [{
                    label: 'Stock Price History',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: chosenDataCloses
                }]
            },
            options: {}
        });
    }
    pushData = (dataA, dataB, newDataA, newDataB) => {
        let val = 18;
        let divider = Math.floor(dataA.length / val);
        for (let i = 0; i < dataA.length; i = i + divider) {
            newDataA.push(dataA[i]);
        }
        for (let i = 0; i < dataB.length; i = i + divider) {
            newDataB.push(dataB[i]);
        }
    }
    loadChart = () => {
        this.createStockPriceHistory()
    }
}