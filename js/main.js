// Global Variables
let marqueeMovement = document.getElementById('marqueeMovement');
let queryInput = document.getElementById('queryInput');
let searchButton = document.getElementById('searchButton');
let resultParent = document.getElementById('searchResults');
let loader = document.getElementById('loader');

// Class Modifiers
loader.classList.add('hide');

// Function to show Loader before results are displayed
showLoader = () => {
    loader.classList.replace('hide', 'show');
}

//Asynchronous function for receiving Stock Data for Marquee
createCompanyMarquee = async () => {
    let info = await fetch(`https://financialmodelingprep.com/api/v3/company/stock/list`);
    let data = await info.json();
    data.symbolsList.forEach((option) => {
        appendStockFeatures(option);
    })
}

// Function for appending stock elements to the marquee
appendStockFeatures = (stock) => {
    let marqueeChild = document.createElement('div');
    let marqueeChildPrice = document.createElement('span');
    marqueeChild.className = 'marqueeChild';
    marqueeChild.innerHTML = `${stock.symbol} `;
    marqueeChildPrice.className = 'plus';
    marqueeChildPrice.innerHTML = `$${stock.price}`;
    if (stock.exchange === 'Nasdaq Global Select' || stock.exchange === 'NASDAQ Capital Market' || stock.exchange === 'NASDAQ Global Market' || stock.exchange === 'Nasdaq' || stock.exchange === 'NasdaqCM' || stock.exchange === 'NasdaqGM' || stock.exchange === 'NasdaqGS') {
        marqueeMovement.appendChild(marqueeChild);
        marqueeChild.appendChild(marqueeChildPrice);
    }
}

// Asynchronous function for receiving Stock Data
createCompanyNames = async (x) => {
    let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${x}&limit=10&exchange=NASDAQ`);
    let data = await ticker.json();
    data.forEach(async (option) => {
        let info = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${option.symbol}`);
        let newData = await info.json();
        appendStockElement(option, newData.profile);
    });
    loader.classList.replace('show', 'hide');
}

// Function for appending the stock elements to the document
appendStockElement = (stock, stockInfo) => {
    let resultChild = document.createElement('div');
    resultParent.appendChild(resultChild);
    resultChild.className = 'resultChildStyle';
    let stockImage = document.createElement('img');
    stockImage.className = 'imageSize';
    stockImage.src = `${stockInfo.image}`;
    resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'>${stock.name}</a>`;
    resultChild.prepend(stockImage);
    let stockSymbol = document.createElement('span');
    stockSymbol.innerHTML = `(${stock.symbol})`;
    stockSymbol.className = 'stockSymbolStyle';
    resultChild.appendChild(stockSymbol);
    let stockPriceMovementChild = document.createElement('span');
    stockPriceMovementChild.classList.add('stockPriceStyle');
    stockPriceMovementChild.innerHTML = `${stockInfo.changesPercentage}`;
    resultChild.appendChild(stockPriceMovementChild);
    if (stockPriceMovementChild.innerText.includes('-')) {
        stockPriceMovementChild.classList.add('minus');
    } else if (stockPriceMovementChild.innerText.includes('+')) {
        stockPriceMovementChild.classList.add('plus');
    }
}

// Function to call the Loader and Stock Search Results
inputSearch = () => {
    showLoader();
    createCompanyNames(queryInput.value);
}

inputAutocomplete = () => {
    if (re.test(queryInput.value) === true) {
        createCompanyNames(queryInput.value);
    }
}

debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

// Function to refresh Search Results with the New Input
createCompanyNamesRefresh = () => {
    let child = resultParent.lastElementChild;
    while (child) {
        resultParent.removeChild(child);
        child = resultParent.lastElementChild;
    }
}

// Event Listeners
window.addEventListener('load', createCompanyMarquee);
queryInput.addEventListener('keyup', debounce(() => {
    inputAutocomplete()
}, 50));
queryInput.addEventListener('keyup', createCompanyNamesRefresh);
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);