class SearchResult {
    constructor(div) {
        this.div = div;
    }
    createChildren = (stock, stockInfo) => {
        let resultChild = document.createElement('div');
        resultParent.appendChild(resultChild);
        resultChild.className = 'resultChildStyle';
        resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'>${stock.name}</a>`;
        this.createImage(resultChild, stock, stockInfo);
    }
    createImage = (resultChild, stock, stockInfo) => {
        let stockImage = document.createElement('img');
        stockImage.className = 'imageSize';
        stockImage.src = `${stockInfo.image}`;
        resultChild.prepend(stockImage);
        this.createSymbol(resultChild, stock, stockInfo);
    }
    createSymbol = (resultChild, stock, stockInfo) => {
        let stockSymbol = document.createElement('span');
        stockSymbol.innerHTML = `(${stock.symbol})`;
        stockSymbol.className = 'stockSymbolStyle';
        resultChild.appendChild(stockSymbol);
        return this.createMovement(resultChild, stockInfo);
    }
    createMovement = (resultChild, stockInfo) => {
        let stockPriceMovementChild = document.createElement('span');
        stockPriceMovementChild.classList.add('stockPriceStyle');
        stockPriceMovementChild.innerHTML = `${stockInfo.changesPercentage}`;
        resultChild.appendChild(stockPriceMovementChild);
        return this.changeSign(stockPriceMovementChild);
    }
    changeSign = (stockPriceMovementChild) => {
        if (stockPriceMovementChild.innerText.includes('-')) {
            return stockPriceMovementChild.classList.add('minus');
        } else if (stockPriceMovementChild.innerText.includes('+')) {
            return stockPriceMovementChild.classList.add('plus');
        }
    }
    renderResults = (stock, stockInfo) => {
        this.createChildren(stock, stockInfo);
    }
}