class SearchFormHistory {
    constructor(div) {
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
            this.createButton(dataChild, option._id);
            this.div.appendChild(dataChild);
        })
    }
    createButton = (dataChild, idNumber) => {
        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-danger');
        deleteButton.id = idNumber;
        deleteButton.innerHTML = 'DELETE';
        dataChild.appendChild(deleteButton);
        deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:5500/search-history/${deleteButton.id}`, { method: 'DELETE' })
                .then(function (response) {
                    if (response.ok) {
                        return
                    }
                })
            this.deleteHistory();
            this.onLoad();
        })
    }
    deleteHistory = () => {
        let child = this.div.lastElementChild;
        while (child) {
            this.div.removeChild(child);
            child = this.div.lastElementChild;
        }
    }
}