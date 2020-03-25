let container = document.getElementById('container');

createComparisonCards = async () => {
    let urlParams = new URLSearchParams(window.location.search);
    let symbols = urlParams.get('symbols');
    let comparisonSymbols = symbols.split(',');
    comparisonSymbols.forEach(async (option) => {
        let section = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${option}`);
        let data = await section.json();
        let stockSection = document.createElement('div');
        stockSection.classList.add('card');
        stockSection.classList.add('shadow');
        stockSection.classList.add('p-3');
        stockSection.classList.add('mb-5');
        stockSection.classList.add('bg-white');
        stockSection.classList.add('rounded');
        createComparisonCardsHeaders(data, stockSection);
        createComparisonCardsPrice(data, stockSection);
    })
}

createComparisonCardsHeaders = (stock, stockSection) => {
    let stockSectionTitleParent = document.createElement('div');
    let stockSectionTitleImage = document.createElement('span');
    let stockSectionTitle = document.createElement('span');
    let stockSectionTitleIndustry = document.createElement('span');
    stockSectionTitleImage.innerHTML = `<img src='${stock.profile.image}'/>`;
    stockSectionTitle.innerHTML = `<a href='${stock.profile.website}'>${stock.profile.companyName}</a>`;
    stockSectionTitleIndustry.innerHTML = `(${stock.profile.industry})`;
    stockSectionTitleParent.appendChild(stockSectionTitleImage);
    stockSectionTitleParent.appendChild(stockSectionTitle);
    stockSectionTitleParent.appendChild(stockSectionTitleIndustry);
    stockSection.appendChild(stockSectionTitleParent);
    container.appendChild(stockSection);
}

createComparisonCardsPrice = (stock, stockSection) => {
    let stockSectionPriceParent = document.createElement('div');
    let stockSectionPrice = document.createElement('span');
    let stockSectionPriceMovement = document.createElement('span');
    stockSectionPrice.innerHTML = `Stock Price: $${stock.profile.price}`;
    stockSectionPriceMovement.innerHTML = `${stock.profile.changesPercentage}`;
    stockSectionPriceParent.appendChild(stockSectionPrice);
    stockSectionPriceParent.appendChild(stockSectionPriceMovement);
    stockSection.appendChild(stockSectionPriceParent);
}

window.addEventListener('load', createComparisonCards);