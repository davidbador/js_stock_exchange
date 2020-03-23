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
        this.div.appendChild(titleParent);
        this.div.appendChild(stockPriceParent);
        this.appendCompanyName(data.profile);
        this.appendCompanyStock(data.profile);
        this.div.appendChild(stockDescriptionParent);
        stockDescriptionParent.innerHTML = `${data.profile.description}`;
        loader.classList.replace('show', 'hide');
    }
    appendCompanyName = (object) => {
        let titleChildImage = document.createElement('span');
        let titleChildName = document.createElement('span');
        titleChildImage.innerHTML = `<img src='${object.image}'/>`;
        titleChildName.innerHTML = `<a href='${object.website}'>${object.companyName} (${object.industry})</a>`;
        titleParent.appendChild(titleChildImage);
        titleParent.appendChild(titleChildName);
    }
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
    loadData = () => {
        this.createStockInformation();
    }
}