class ComparisonCompanies {
    constructor(div, stock) {
        this.div = div;
        this.stock = stock;
        this.compare = document.createElement('button');
        this.deleteIt = document.createElement('span');
    }
    increment = () => {
        count++;
        usedSymbols.push(this.stock.symbol);
    }
    createComparisonSelection = (stock) => {
        if (!usedSymbols.includes(stock.symbol)) {
            this.compare.classList.add('btn');
            this.compare.classList.add('btn-info');
            this.compare.id = 'comparisonCompany';
            this.compare.innerHTML = `<span id='comparisonSymbol'>${stock.symbol}</span> `;
            this.deleteIt.innerHTML = 'x';
            this.deleteIt.className = 'deleteComparison';
            comparisonHolder.appendChild(this.compare);
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
            count--;
            const index = usedSymbols.indexOf(stock.symbol);
            if (index > -1) {
                usedSymbols.splice(index, 1);
            }
            compareAmount.innerHTML = `Compare ${count} Companies`;
            if (count === 1) {
                compareAmount.innerHTML = `Compare ${count} Company`;
                compareAmount.setAttribute('href', `company.html?symbol=${usedSymbols}`);
            } else if (count === 0) {
                compareAmount.innerHTML = 'Compare';
                compareAmount.className = 'compareAmount';
                compareAmount.removeAttribute('href');
            }
        });
    }
    compareOptions = () => {
        this.createComparisonSelection(this.stock);
    }
}