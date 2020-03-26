// StockInformation Class used to append data to the Stock Information Page
class StockInformation {
    constructor(div) {
        this.div = div;
    }
    createStockInformation = async () => {
        let urlParams = new URLSearchParams(window.location.search);
        let symbol = urlParams.get('symbol');
        let title = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
        let data = await title.json();
        this.div.appendChild(store.titleParent);
        this.div.appendChild(store.stockPriceParent);
        this.appendCompanyName(data.profile);
        this.appendCompanyStock(data.profile);
        this.div.appendChild(store.stockDescriptionParent);
        store.stockDescriptionParent.innerHTML = `${data.profile.description}`;
        store.loader.classList.replace('show', 'hide');
    }
    appendCompanyName = (object) => {
        let titleChildImage = document.createElement('span');
        let titleChildName = document.createElement('span');
        titleChildImage.innerHTML = `<img src='${object.image}'/>`;
        titleChildName.innerHTML = `<a href='${object.website}'>${object.companyName} (${object.industry})</a>`;
        store.titleParent.appendChild(titleChildImage);
        store.titleParent.appendChild(titleChildName);
    }
    appendCompanyStock = (object) => {
        let stockPriceTitleChild = document.createElement('span');
        stockPriceTitleChild.innerHTML = 'Stock Price: ';
        let stockPriceCurrentChild = document.createElement('span');
        stockPriceCurrentChild.innerHTML = `$${object.price}`;
        let stockPriceMovementChild = document.createElement('span');
        stockPriceMovementChild.innerHTML = `${object.changesPercentage}`;
        store.stockPriceParent.appendChild(stockPriceTitleChild);
        store.stockPriceParent.appendChild(stockPriceCurrentChild);
        store.stockPriceParent.appendChild(stockPriceMovementChild);
        store.stockPriceParent.className = 'stockPrice';
        stockPriceMovementChild.classList.add('stockPriceMovement');
        if (stockPriceMovementChild.innerText.includes('-')) {
            stockPriceMovementChild.classList.add('minus');
        } else if (stockPriceMovementChild.innerText.includes('+')) {
            stockPriceMovementChild.classList.add('plus');
        }
    }
    loadData = () => {
        this.createStockInformation();
    }
}