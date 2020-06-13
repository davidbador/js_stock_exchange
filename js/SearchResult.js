// SearchResult Class used to append Stock Data to Page
class SearchResult {
    constructor(div) {
        this.div = div;
        this.button = document.createElement('button');
    }
    createChildren = (stock) => {
        let resultChild = document.createElement('div');
        let resultChildLink = document.createElement('a');
        let resultChildName = document.createElement('span');
        this.div.appendChild(resultChild);
        resultChild.classList.add('resultChildStyle');
        resultChildLink.setAttribute('href', `company.html?symbol=${stock.symbol}`);
        resultChildName.innerHTML = `${stock.profile.companyName}`;
        resultChildLink.appendChild(resultChildName);
        resultChild.appendChild(resultChildLink);
        this.button.addEventListener('click', () => {
            new ComparisonCompanies(store.comparisonHolder, stock);
        });
        this.highlight(queryInput.value, resultChildName);
        this.createImage(resultChild, stock);
        this.createButton(resultChild);
    }
    createImage = (resultChild, stock) => {
        let stockImage = document.createElement('img');
        stockImage.className = 'imageSize';
        stockImage.src = `${stock.profile.image}`;
        resultChild.prepend(stockImage);
        this.createSymbol(resultChild, stock);
    }
    createSymbol = (resultChild, stock) => {
        let stockSymbol = document.createElement('span');
        stockSymbol.innerHTML = `(${stock.symbol})`;
        stockSymbol.classList.add('stockSymbolStyle');
        resultChild.appendChild(stockSymbol);
        this.highlight(queryInput.value, stockSymbol);
        this.createMovement(resultChild, stock);
    }
    createMovement = (resultChild, stock) => {
        let stockPriceMovementChild = document.createElement('span');
        stockPriceMovementChild.classList.add('stockPriceStyle');
        stockPriceMovementChild.innerHTML = `${stock.profile.changesPercentage}`;
        resultChild.appendChild(stockPriceMovementChild);
        this.changeSign(stockPriceMovementChild);
    }
    changeSign = (stockPriceMovementChild) => {
        if (stockPriceMovementChild.innerText.includes('-')) {
            stockPriceMovementChild.classList.add('minus');
        } else if (stockPriceMovementChild.innerText.includes('+')) {
            stockPriceMovementChild.classList.add('plus');
        }
    }
    createButton = (resultChild) => {
        this.button.classList.add('btn');
        this.button.classList.add('btn-info');
        this.button.id = 'resultButton';
        this.button.innerHTML = 'Compare';
        resultChild.appendChild(this.button);
        this.button.addEventListener('click', function () {
            if (store.count === 1) {
                store.compareAmount.innerHTML = `Compare ${store.count} Company`;
                store.compareAmount.className = 'compareAmountLink';
                store.compareAmount.setAttribute('href', `company.html?symbol=${store.usedSymbols}`);
            } else if (store.count > 1) {
                store.compareAmount.setAttribute('href', `compare.html?symbols=${store.usedSymbols}`);
                store.compareAmount.innerHTML = `Compare ${store.count} Companies`;
            }
        });
    }
    highlight = (queryInput, resultChild) => {
        queryInput = queryInput.toLowerCase();
        let nameString = resultChild.innerText.toLowerCase();
        let index = nameString.indexOf(queryInput);
        if (index >= 0) {
            let innerHTML = resultChild.innerText.substr(0, index) + "<span class='yellow'>" + resultChild.innerText.substr(index, queryInput.length) + "</span>" + resultChild.innerText.substr(index + queryInput.length);
            resultChild.innerHTML = innerHTML;
        }
    }
    renderResults = (stock) => {
        this.createChildren(stock);
    }
}