// Global Variables
let marquee = document.getElementById('marquee');
let marqueeWrapper = document.createElement('div');
let marqueeMovement = document.createElement('div');
let queryInput = document.getElementById('queryInput');
let searchButton = document.getElementById('searchButton');
let resultParent = document.getElementById('searchResults');
let loader = document.getElementById('loader');
let re = /[a-zA-Z0-9]/;

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
    marqueeWrapper.className = 'marqueeWrapper';
    marqueeMovement.className = 'marqueeMovement';
    marquee.appendChild(marqueeWrapper);
    marqueeWrapper.appendChild(marqueeMovement);
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
createCompanyNames = async (inputValue) => {
    let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`);
    let data = await ticker.json();
    let threeProfiles = [];
    for (let i = 0; i < data.length; i += 3) {
        if (i < data.length - 1) {
            if (data.length === 1) {
                let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol}`);
                threeProfiles.push(info);
            } else if (data.length < 3) {
                let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol},${data[i + 1].symbol}`);
                threeProfiles.push(info);
            } else {
                let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol},${data[i + 1].symbol},${data[i + 2].symbol}`);
                threeProfiles.push(info);
            }
        } else {
            let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol}`);
            threeProfiles.push(info);
        }
    }
    let profileInformation = await Promise.all(
        threeProfiles.map(async (option) => {
            let info = await fetch(option);
            return await info.json()
        })
    );
    let combineInformation = [];
    for (let i = 0; i < profileInformation.length; i++) {
        if (profileInformation[i].companyProfiles) {
            combineInformation.push(profileInformation[i].companyProfiles);
        } else if (profileInformation) {
            combineInformation.push(profileInformation[i]);
        }
    }
    let fuse = [].concat.apply([], combineInformation);
    fuse.map((option) => {
        appendStockElement(option);
    })
    loader.classList.replace('show', 'hide');
}

// Function for appending the stock elements to the document
appendStockElement = (stock) => {
    let resultChild = document.createElement('div');
    resultParent.appendChild(resultChild);
    resultChild.className = 'resultChildStyle';
    let stockImage = document.createElement('img');
    stockImage.className = 'imageSize';
    stockImage.src = `${stock.profile.image}`;
    resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'>${stock.profile.companyName}</a>`;
    resultChild.prepend(stockImage);
    let stockSymbol = document.createElement('span');
    stockSymbol.innerHTML = `(${stock.symbol})`;
    stockSymbol.className = 'stockSymbolStyle';
    resultChild.appendChild(stockSymbol);
    let stockPriceMovementChild = document.createElement('span');
    stockPriceMovementChild.classList.add('stockPriceStyle');
    stockPriceMovementChild.innerHTML = `${stock.profile.changesPercentage}`;
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

// Function to call the Stock Search Results for autocomplete searches
inputAutocomplete = () => {
    if (re.test(queryInput.value) === true) {
        createCompanyNames(queryInput.value);
    }
}

// Debounce function to time the completion of the autocompletion function
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

// Function to refresh the window with the search results in the URL
queryRefresh = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let querySearch = urlParams.get('query');
    if (querySearch != '') {
        createCompanyNames(querySearch);
        queryInput.value = querySearch;
    }
}

// Function to add the input value in the URL in real time
addQueryString = () => {
    if (history.pushState) {
        let string = queryInput.value;
        let newURL = window.location.protocol + '?query=' + string;
        window.history.pushState({ path: newURL }, '', newURL);
    }
}

// Event Listeners
window.addEventListener('load', createCompanyMarquee);
window.addEventListener('load', queryRefresh);
queryInput.addEventListener('keyup', debounce(() => {
    inputAutocomplete()
}, 50));
queryInput.addEventListener('keyup', createCompanyNamesRefresh);
queryInput.addEventListener('keyup', addQueryString);
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);