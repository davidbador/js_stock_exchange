// Global Variables
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

// Asynchronous function for receiving Stock Data
createCompanyNames = async (x) => {
    let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${x}&limit=10&exchange=NASDAQ`);
    let data = await ticker.json()
    data.forEach(function (object) {
        appendStockElement(object)
    });
    loader.classList.replace('show', 'hide');
}

appendStockElement = (stock) => { 
    let resultChild = document.createElement('div');
    resultParent.appendChild(resultChild);
    resultChild.className = 'resultChildStyle'
    resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'>${stock.name} (${stock.symbol})</a>`;
}

// Function to call the Loader and Stock Search Results
inputSearch = () => {
    showLoader()
    createCompanyNames(queryInput.value);
}

// Function to refresh Search Results with the New Input
createCompanyNamesRefresh = () => {
    let child = resultParent.lastElementChild;
    while (child) {
        resultParent.removeChild(child);
        child = resultParent.lastElementChild;
    }
}

// Event Listeners
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);
