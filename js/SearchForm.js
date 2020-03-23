// SearchForm Class to fetch the data used to fill the Search Results
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
            let threeProfiles = [];
            for (let i = 0; i < data.length; i += 3) {
                if (i < data.length - 1) {
                    if (data.length === 1) {
                        let info = (`https://financialmodelingprep.com/api/v3/company/profile/${data[i].symbol}`);
                        threeProfiles.push(info);
                    } else if (data.length < 3) {
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
            let profileInformation = await Promise.all(
                threeProfiles.map(async (option) => {
                    let info = await fetch(option);
                    return await info.json()
                })
            );
            let combineInformation = [];
            for (let i = 0; i < profileInformation.length; i++) {
                console.log(profileInformation);
                if (profileInformation[i].companyProfiles) {
                    combineInformation.push(profileInformation[i].companyProfiles);
                } else if (profileInformation) {
                    combineInformation.push(profileInformation[i]);
                }
            }
            let fuse = [].concat.apply([], combineInformation);
            fuse.map((option) => {
                new SearchResult(resultParent).renderResults(option);
            })
            loader.classList.replace('show', 'hide');
        }
    }
}