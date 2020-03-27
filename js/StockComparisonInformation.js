class StockComparisonInformation {
    constructor(div) {
        this.div = div;
        this.loadData();
    }
    createComparisonCards = async () => {
        let urlParams = new URLSearchParams(window.location.search);
        let symbols = urlParams.get('symbols');
        let comparisonSymbols = symbols.split(',');
        comparisonSymbols.forEach(async (option) => {
            let section = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${option}`);
            let data = await section.json();
            let stockSection = document.createElement('span');
            stockSection.classList.add('card');
            stockSection.classList.add('shadow');
            stockSection.classList.add('p-3');
            stockSection.classList.add('mb-5');
            stockSection.classList.add('bg-white');
            stockSection.classList.add('rounded');
            this.createComparisonCardsHeaders(data, stockSection);
            this.createComparisonCardsPrice(data, stockSection);
            this.createComparisonCardsDescription(data, stockSection);
            this.createComparisonCardsGraph(option, stockSection);
        })
    }
    createComparisonCardsHeaders = (stock, stockSection) => {
        let stockSectionTitleParent = document.createElement('div');
        stockSectionTitleParent.className = 'stockSectionTitleParent';
        let stockSectionTitleImage = document.createElement('span');
        let stockSectionTitle = document.createElement('span');
        let stockSectionTitleIndustry = document.createElement('span');
        stockSectionTitleImage.innerHTML = `<img src='${stock.profile.image}'/>`;
        stockSectionTitle.innerHTML = `<a href='${stock.profile.website}'>${stock.profile.companyName}</a>`;
        stockSectionTitleIndustry.innerHTML = ` (${stock.profile.industry})`;
        stockSectionTitleIndustry.className = 'stockSectionTitleIndustry';
        stockSectionTitleParent.appendChild(stockSectionTitleImage);
        stockSectionTitleParent.appendChild(stockSectionTitle);
        stockSectionTitleParent.appendChild(stockSectionTitleIndustry);
        stockSection.appendChild(stockSectionTitleParent);
        this.div.appendChild(stockSection);
    }
    createComparisonCardsPrice = (stock, stockSection) => {
        let stockSectionPriceParent = document.createElement('div');
        stockSectionPriceParent.className = 'stockSectionPriceParent';
        let stockSectionPrice = document.createElement('span');
        stockSectionPrice.className = 'stockSectionPrice';
        let stockSectionPriceMovement = document.createElement('span');
        stockSectionPriceMovement.className = 'stockSectionPriceMovement';
        stockSectionPrice.innerHTML = `Stock Price: $${stock.profile.price}`;
        stockSectionPriceMovement.innerHTML = ` ${stock.profile.changesPercentage}`;
        if (stockSectionPriceMovement.innerText.includes('+')) {
            stockSectionPriceMovement.classList.add('plus');
        } else if (stockSectionPriceMovement.innerText.includes('-')) {
            stockSectionPriceMovement.classList.add('minus');
        }
        stockSectionPriceParent.appendChild(stockSectionPrice);
        stockSectionPriceParent.appendChild(stockSectionPriceMovement);
        stockSection.appendChild(stockSectionPriceParent);
    }
    createComparisonCardsDescription = (stock, stockSection) => {
        let stockSectionDescription = document.createElement('div');
        stockSectionDescription.className = 'stockSectionDescription';
        stockSectionDescription.innerHTML = `${stock.profile.description}`;
        stockSection.appendChild(stockSectionDescription);
    }
    createComparisonCardsGraph = async (option, stockSection) => {
        let stockSectionGraphParent = document.createElement('div');
        let stockSectionGraphChild = document.createElement('canvas');
        let history = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${option}?serietype=line`);
        let data = await history.json();
        let dataDates = [];
        let dataCloses = [];
        let chosenDataDates = [];
        let chosenDataCloses = [];
        data.historical.forEach(function (object) {
            dataDates.push(object.date);
            dataCloses.push(object.close);
        })
        this.pushData(dataDates, dataCloses, chosenDataDates, chosenDataCloses);
        var ctx = stockSectionGraphChild.getContext('2d');
        new Chart(ctx, {
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
        stockSectionGraphParent.appendChild(stockSectionGraphChild);
        stockSection.appendChild(stockSectionGraphParent);
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
        newDataA.push(dataA[dataA.length - 1]);
        newDataB.push(dataB[dataB.length - 1]);
    }
    loadData = () => {
        this.createComparisonCards();
    }
}