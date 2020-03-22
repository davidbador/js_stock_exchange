class SearchResult {
    constructor(div) {
        this.div = div;
    }
    createChildren = (stock, stockInfo) => {
        let resultChild = document.createElement('div');
        let resultChildName = document.createElement('span');
        resultParent.appendChild(resultChild);
        resultChild.classList.add('resultChildStyle');
        resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'></a>`;
        resultChildName.innerHTML = `${stock.name}`;
        resultChild.appendChild(resultChildName);
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
        stockSymbol.classList.add('stockSymbolStyle');
        resultChild.appendChild(stockSymbol);
        this.createMovement(resultChild, stockInfo);
    }
    createMovement = (resultChild, stockInfo) => {
        let stockPriceMovementChild = document.createElement('span');
        stockPriceMovementChild.classList.add('stockPriceStyle');
        stockPriceMovementChild.innerHTML = `${stockInfo.changesPercentage}`;
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
    renderResults = (stock, stockInfo) => {
        this.createChildren(stock, stockInfo);
    }
}