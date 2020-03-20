// Global Variables
let marqueeParent = document.getElementById('marquee');
let searchBar = document.getElementById('searchBar');
let queryInput = document.getElementById('queryInput');
let searchButton = document.getElementById('searchButton');
let resultParent = document.getElementById('searchResults');
let loader = document.getElementById('loader');
let re = /[a-zA-Z0-9]/;

// Class Modifiers
loader.classList.add('hide');

// Function to show Loader before results are displayed
showLoader = () => {
    loader.classList.replace('hide', 'show');
}

(async function () {
    const marquee = new Marquee(marqueeParent);
    marquee.load();
})()

// Function to call the Loader and Stock Search Results
inputSearch = () => {
    showLoader();
    const form = new SearchForm(searchBar);
    form.onSearch(queryInput.value);
}

inputAutocomplete = () => {
    if (re.test(queryInput.value) === true) {
        const form = new SearchForm(searchBar);
        form.onSearch(queryInput.value);
    }
}

debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

// Function to refresh Search Results with the New Input
createCompanyNamesRefresh = () => {
    let child = resultParent.lastElementChild;
    while (child) {
        resultParent.removeChild(child);
        child = resultParent.lastElementChild;
    }
}

// Event Listeners
queryInput.addEventListener('keyup', debounce(() => {
    inputAutocomplete()
}, 50));
queryInput.addEventListener('keyup', createCompanyNamesRefresh);
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);