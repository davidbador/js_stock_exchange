class Marquee {
    constructor(div) {
        this.div = div;
    }
    async appendMarqueeElements() {
        let info = await fetch(`https://financialmodelingprep.com/api/v3/company/stock/list`);
        let data = await info.json();
        let marqueeWrapper = document.createElement('div');
        let marqueeMovement = document.createElement('div');
        marqueeWrapper.className = 'marqueeWrapper';
        marqueeMovement.className = 'marqueeMovement';
        this.div.appendChild(marqueeWrapper);
        marqueeWrapper.appendChild(marqueeMovement);
        data.symbolsList.forEach((option) => {
            this.appendStockFeatures(option, marqueeMovement);
        })
    }
    appendStockFeatures(stock, marqueeMovement) {
        let marqueeChild = document.createElement('div');
        let marqueeChildPrice = document.createElement('span');
        marqueeChild.className = 'marqueeChild';
        marqueeChild.innerHTML = `${stock.symbol} `;
        marqueeChildPrice.className = 'plus';
        marqueeChildPrice.innerHTML = `$${stock.price}`;
        if (stock.exchange.includes('Nasdaq')) {
            marqueeMovement.appendChild(marqueeChild);
            marqueeChild.appendChild(marqueeChildPrice);
        }
    }
    load() {
        this.appendMarqueeElements();
    }
}