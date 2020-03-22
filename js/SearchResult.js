class SearchResult {
    constructor(div) {
        this.div = div;
    }
    createChildren = (stock) => {
        let resultChild = document.createElement('div');
        let resultChildName = document.createElement('span');
        resultParent.appendChild(resultChild);
        resultChild.classList.add('resultChildStyle');
        resultChild.innerHTML = `<a href='company.html?symbol=${stock.symbol}'></a>`;
        resultChildName.innerHTML = `${stock.profile.companyName}`;
        resultChild.appendChild(resultChildName);
        this.createImage(resultChild, stock);
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
    renderResults = (stock) => {
        this.createChildren(stock);
    }
}