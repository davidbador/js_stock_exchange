let titleParent = document.getElementById('stockTitle');
let stockPriceParent = document.getElementById('stockPrice');
let stockDescriptionParent = document.getElementById('stockDescription');
let stockGraphParent = document.getElementById('stockGraph');
let loader = document.getElementById('loader');

loader.classList.add('hide');

function showLoader() {
    loader.classList.replace('hide', 'show');
}

async function getStockInformation() {
    let urlParams = new URLSearchParams(window.location.search);
    let symbol = urlParams.get('symbol');
    let title = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
    let data = await title.json();
    let titleChildImage = document.createElement('span');
    let titleChildName = document.createElement('span');
    titleChildImage.innerHTML = `<img src='${data.profile.image}'/>`;
    titleChildName.innerHTML = `<a href='${data.profile.website}'>${data.profile.companyName} (${data.profile.industry})</a>`;
    titleParent.appendChild(titleChildImage);
    titleParent.appendChild(titleChildName);
    let stockPriceTitleChild = document.createElement('span');
    stockPriceTitleChild.innerHTML = 'Stock Price: ';
    let stockPriceCurrentChild = document.createElement('span');
    stockPriceCurrentChild.innerHTML = `$${data.profile.price}`;
    let stockPriceMovementChild = document.createElement('span');
    stockPriceMovementChild.innerHTML = `${data.profile.changesPercentage}`;
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
    stockDescriptionParent.innerHTML = `${data.profile.description}`;
    loader.classList.replace('show', 'hide');
}

async function getStockPriceHistory() {
    let urlParams = new URLSearchParams(window.location.search);
    let symbol = urlParams.get('symbol');
    let history = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`);
    let data = await history.json();
    let dataDates = [];
    let dataCloses = [];
    data.historical.forEach(function (object) {
        dataDates.push(object.date);
        dataCloses.push(object.close);
    })
    let val = 18;
    let divider = Math.floor(dataDates.length / val);
    let chosenDataDates = [];
    let chosenDataCloses = [];
    for (let i = 0; i < dataDates.length; i = i + divider) {
        chosenDataDates.push(dataDates[i]);
    }
    for (let i = 0; i < dataCloses.length; i = i + divider) {
        chosenDataCloses.push(dataCloses[i]);
    }
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

function loadWindow() {
    showLoader();
    getStockInformation();
    getStockPriceHistory();
}

window.addEventListener('load', loadWindow);