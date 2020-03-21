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

// Asynchronous function to load the Marquee on the window being loaded
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

// Function to call the Stock Search Results for autocomplete searches
inputAutocomplete = () => {
    if (re.test(queryInput.value) === true) {
        const form = new SearchForm(searchBar);
        form.onSearch(queryInput.value);
    }
}

// Debounce function to time the completion of the autocompletion function
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

// Function to refresh the window with the search results in the URL
queryRefresh = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let querySearch = urlParams.get('query');
    if (querySearch != '') {
        createCompanyNames(querySearch);
        queryInput.value = querySearch;
    }
}

// Function to add the input value in the URL in real time
addQueryString = () => {
    if (history.pushState) {
        let string = queryInput.value;
        let newURL = window.location.protocol + '?query=' + string;
        window.history.pushState({ path: newURL }, '', newURL);
    }
}

// Event Listeners
window.addEventListener('load', queryRefresh);
queryInput.addEventListener('keyup', debounce(() => {
    inputAutocomplete()
}, 50));
queryInput.addEventListener('keyup', createCompanyNamesRefresh);
queryInput.addEventListener('keyup', addQueryString);
searchButton.addEventListener('click', inputSearch);
searchButton.addEventListener('click', createCompanyNamesRefresh);