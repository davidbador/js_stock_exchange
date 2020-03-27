// SearchForm Class to fetch the data used to fill the Search Results
class SearchForm {
    constructor(div) {
        this.div = div;
        this.onSearch(store.queryInput.value);
    }
    onSearch = async (inputValue) => {
        if (store.queryInput.value === '') {
            return null;
        } else {
            let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`);
            let data = await ticker.json();
            let threeProfiles = [];
            if (data.length === 0) {
                store.noResult = document.createElement('div');
                store.noResult.innerText = `No search results found for "${store.queryInput.value}"`;
                store.resultParent.appendChild(store.noResult);
            } else {
                for (let i = 0; i < data.length; i += 3) {
                    if (i < data.length - 1) {
                        if (data.length === 2) {
                            let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol},${data[i + 1].symbol}`);
                            threeProfiles.push(info);
                        } else {
                            let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol},${data[i + 1].symbol},${data[i + 2].symbol}`);
                            threeProfiles.push(info);
                        }
                    } else {
                        let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol}`);
                        threeProfiles.push(info);
                    }
                }
            }
            let profileInformation = await Promise.all(
                threeProfiles.map(async (option) => {
                    let info = await fetch(option);
                    let data = await info.json();
                    return data;
                })
            );
            let combineInformation = [];
            for (let i = 0; i < profileInformation.length; i++) {
                if (profileInformation[i].companyProfiles) {
                    combineInformation.push(profileInformation[i].companyProfiles);
                } else if (profileInformation[i]) {
                    combineInformation.push(profileInformation[i]);
                }
            }
            let fuse = [].concat.apply([], combineInformation);
            fuse.map((option) => {
                new SearchResult(store.resultParent).renderResults(option);
            })
            loader.classList.replace('show', 'hide');
        }
    }
}