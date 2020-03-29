// Comparison Companies Class to run functionality for the main page's comparison area
class ComparisonCompanies {
    constructor(div, stock) {
        this.div = div;
        this.stock = stock;
        this.compare = document.createElement('button');
        this.deleteIt = document.createElement('span');
        this.compareOptions();
    }
    increment = () => {
        store.count++;
        store.usedSymbols.push(this.stock.symbol);
    }
    createComparisonSelection = (stock) => {
        if (!store.usedSymbols.includes(stock.symbol) && store.usedSymbols.length < 3) {
            this.compare.classList.add('btn');
            this.compare.classList.add('btn-info');
            this.compare.id = 'comparisonCompany';
            this.compare.innerHTML = `<span id='comparisonSymbol'>${stock.symbol}</span> `;
            this.deleteIt.innerHTML = 'x';
            this.deleteIt.className = 'deleteComparison';
            store.comparisonHolder.appendChild(this.compare);
            this.compare.appendChild(this.deleteIt);
            this.increment();
        }
        let deleteChild = document.getElementsByClassName('deleteComparison');

        for (let i = 0; i < deleteChild.length; i++) {
            let deleteButton = deleteChild[i];
            deleteButton.addEventListener('click', function () {
                this.parentNode.remove();
            });
        }
        this.deleteIt.addEventListener('click', function () {
            store.count--;
            const index = store.usedSymbols.indexOf(stock.symbol);

            if (index > -1) {
                store.usedSymbols.splice(index, 1);
            }
            store.compareAmount.innerHTML = `Compare ${store.count} Companies`;

            switch (store.count) {
                case 0:
                    store.compareAmount.innerHTML = 'Compare';
                    store.compareAmount.className = 'compareAmount';
                    store.compareAmount.removeAttribute('href');
                case 1:
                    store.compareAmount.innerHTML = `Compare ${store.count} Company`;
                    store.compareAmount.setAttribute('href', `company.html?symbol=${store.usedSymbols}`);
            }
        });
    }
    compareOptions = () => {
        this.createComparisonSelection(this.stock);
    }
}