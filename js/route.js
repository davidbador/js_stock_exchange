
// Global Variables
let titleParent = document.getElementById('stockTitle');
let stockPriceParent = document.getElementById('stockPrice');
let stockDescriptionParent = document.getElementById('stockDescription');
let stockGraphParent = document.getElementById('stockGraph');
let loader = document.getElementById('loader');

// Class Modifiers
loader.classList.add('hide');

// Function to show Loader before results are displayed
showLoader = () => {
    loader.classList.replace('hide', 'show');
}

// Asynchronous function for receiving Stock Data
createStockInformation = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let symbol = urlParams.get('symbol');
    let title = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
    let data = await title.json();
    appendCompanyName(data.profile);
    appendCompanyStock(data.profile);
    stockDescriptionParent.innerHTML = `${data.profile.description}`;
    loader.classList.replace('show', 'hide');
}

// Function to append Company Name and Industry Name
appendCompanyName = (object) => {
    let titleChildImage = document.createElement('span');
    let titleChildName = document.createElement('span');
    titleChildImage.innerHTML = `<img src='${object.image}'/>`;
    titleChildName.innerHTML = `<a href='${object.website}'>${object.companyName} (${object.industry})</a>`;
    titleParent.appendChild(titleChildImage);
    titleParent.appendChild(titleChildName);
}

// Function to append Stock Price and Price Movement
appendCompanyStock = (object) => {
    let stockPriceTitleChild = document.createElement('span');
    stockPriceTitleChild.innerHTML = 'Stock Price: ';
    let stockPriceCurrentChild = document.createElement('span');
    stockPriceCurrentChild.innerHTML = `$${object.price}`;
    let stockPriceMovementChild = document.createElement('span');
    stockPriceMovementChild.innerHTML = `${object.changesPercentage}`;
    stockPriceParent.appendChild(stockPriceTitleChild);
    stockPriceParent.appendChild(stockPriceCurrentChild);
    stockPriceParent.appendChild(stockPriceMovementChild);
    stockPriceParent.className = 'stockPrice';
    stockPriceMovementChild.classList.add('stockPriceMovement');
    if (stockPriceMovementChild.innerText.includes('-')) {
        stockPriceMovementChild.classList.add('minus');
    } else if (stockPriceMovementChild.innerText.includes('+')) {
        stockPriceMovementChild.classList.add('plus');
    }
}

// Asynchronous Function to create Stock Price Graph
createStockPriceHistory = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let symbol = urlParams.get('symbol');
    let history = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`);
    let data = await history.json();
    let dataDates = [];
    let dataCloses = [];
    let chosenDataDates = [];
    let chosenDataCloses = [];
    data.historical.forEach(function (object) {
        dataDates.push(object.date);
        dataCloses.push(object.close);
    })
    pushData(dataDates, dataCloses, chosenDataDates, chosenDataCloses);
    var ctx = document.getElementById('myChart').getContext('2d');
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

// Function to push chosen data into Stock Price Graph
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

// Function to call the main functions
loadWindow = () => {
    showLoader();
    createStockInformation();
    createStockPriceHistory();
}

// Event Listeners
window.addEventListener('load', loadWindow);