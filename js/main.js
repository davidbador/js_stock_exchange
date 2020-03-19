// Global Variables
let marqueeMovement = document.getElementById('marqueeMovement');
let searchBar = document.getElementById('searchBar');
let queryInput = document.getElementById('queryInput');
let searchButton = document.getElementById('searchButton');
let resultParent = document.getElementById('searchResults');
let loader = document.getElementById('loader');

// Class Modifiers
loader.classList.add('hide');

// Function to show Loader before results are displayed
showLoader = () => {
    loader.classList.replace('hide', 'show');
}

(async function () {
    const marquee = new Marquee(marqueeMovement);
    marquee.load();
})()

// Function to call the Loader and Stock Search Results
inputSearch = () => {
    showLoader();
    const form = new SearchForm(searchBar);
    form.onSearch(queryInput.value);
}

// Function to refresh Search Results with the New Input
createCompanyNamesRefresh = () => {
    let child = resultParent.lastElementChild;
    while (child) {
        resultParent.removeChild(child);
        child = resultParent.lastElementChild;
    }
}

// Event Listeners
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);