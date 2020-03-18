class Marquee {
    constructor(div) {
        this.div = div
    }
    async load() {
        let info = await fetch(`https://financialmodelingprep.com/api/v3/company/stock/list`);
        let data = await info.json();
        data.symbolsList.forEach((option) => {
            appendStockFeatures(option);
        })
        function appendStockFeatures(stock) {
            let marqueeChild = document.createElement('div');
            let marqueeChildPrice = document.createElement('span');
            marqueeChild.className = 'marqueeChild';
            marqueeChild.innerHTML = `${stock.symbol} `;
            marqueeChildPrice.className = 'plus';
            marqueeChildPrice.innerHTML = `$${stock.price}`;
            if (stock.exchange === 'Nasdaq Global Select') {
                marqueeMovement.appendChild(marqueeChild);
                marqueeChild.appendChild(marqueeChildPrice);
            }
        }
    }
}

Marquee.load