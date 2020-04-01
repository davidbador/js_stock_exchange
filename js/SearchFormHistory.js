class SearchFormHistory {
    constructor (div) {
        this.div = div;
        this.onLoad();
    }
    onLoad = async () => {
        let search = await fetch('http://localhost:5500/search-history');
        let data = await search.json();
        data.map(option => {
            let dataChild = document.createElement('div');
            let dataInput = document.createElement('a');
            dataInput.className = 'dataQuery';
            let dataDate = document.createElement('span');
            dataInput.innerHTML = option.userInput;
            dataInput.setAttribute('href', `index.html?query=${option.userInput}`);
            let time = new Date(option.createdDate);
            dataDate.innerHTML = time.toString();
            dataChild.appendChild(dataInput);
            dataChild.appendChild(dataDate);
            this.div.appendChild(dataChild);
        })

    }
}