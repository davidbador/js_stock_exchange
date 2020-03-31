class SearchFormServer {
    constructor(div) {
        this.div = div
        this.onSearch(store.queryInput.value);
    }
    onSearch = async (inputValue) => {
        if (store.queryInput.value === '') {
            return null;
        } else {
            let search = await fetch(`http://localhost:5500/search?query=${inputValue}`);
            let data = await search.json();
            data.map((option) => {
                new SearchResult(store.resultParent).renderResults(option);
            })
        }
    }
}