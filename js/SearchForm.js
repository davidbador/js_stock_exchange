class SearchForm {
    constructor(div) {
        this.div = div;
    }
    onSearch = async (inputValue) => {
        if (queryInput.value === '') {
            return null;
        } else {
            let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`);
            let data = await ticker.json();
            data.forEach(async (option) => {
                let info = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${option.symbol}`);
                let newData = await info.json();
                new SearchResult(resultParent).renderResults(option, newData.profile);
            });
            loader.classList.replace('show', 'hide');
        }
    }
}