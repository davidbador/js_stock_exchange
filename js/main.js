// Global Namespace Variable
let store = {};

// Asynchronous function to load the Marquee on the window being loaded
store.runMarquee = () => {
    store.marqueeParent = document.getElementById('marquee');
    store.marquee = new Marquee(store.marqueeParent);
}

// Function to show Loader before results are displayed
store.showLoader = () => {
    store.loader = document.getElementById('loader');
    store.loader.classList.replace('hide', 'show');
}

// Function to call the Loader and Stock Search Results
store.inputSearch = () => {
    store.showLoader();
    store.searchBar = document.getElementById('searchBar');
    store.resultParent = document.getElementById('searchResults');
    store.queryInput = document.getElementById('queryInput');
    store.form = new SearchFormServer(store.searchBar);
}

// Function to call the Stock Search Results for autocomplete searches
store.inputAutocomplete = () => {
    store.queryInput = document.getElementById('queryInput');
    store.resultParent = document.getElementById('searchResults');
    store.re = /[a-zA-Z0-9]/;
    if (store.re.test(store.queryInput.value) === true) {
        store.searchBar = document.getElementById('searchBar');
        store.form = new SearchFormServer(store.searchBar);
    }
}

// Debounce function to time the completion of the autocompletion function
store.debounce = (func, wait, immediate) => {
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
store.createCompanyNamesRefresh = () => {
    store.resultParent = document.getElementById('searchResults');
    store.child = store.resultParent.lastElementChild;
    while (store.child) {
        store.resultParent.removeChild(store.child);
        store.child = store.resultParent.lastElementChild;
    }
}

// Function to refresh the window with the search results in the URL
store.queryRefresh = () => {
    store.urlParams = new URLSearchParams(window.location.search);
    store.querySearch = store.urlParams.get('query');
    if (store.querySearch != '') {
        store.resultParent = document.getElementById('searchResults');
        store.queryInput = document.getElementById('queryInput');
        store.queryInput.value = store.querySearch;
        store.searchBar = document.getElementById('searchBar');
        store.form = new SearchFormServer(store.searchBar);
    }
}

// Function to add the input value in the URL in real time
store.addQueryString = () => {
    if (history.pushState) {
        store.string = store.queryInput.value;
        store.newURL = window.location.protocol + '?query=' + store.string;
        window.history.pushState({ path: store.newURL }, '', store.newURL);
    }
}

// Event Listeners compiled into one function
store.eventFunctions = () => {
    store.count = 0;
    store.usedSymbols = [];
    store.comparisonHolder = document.getElementById('comparisonHolder');
    store.compareAmount = document.getElementById('compareAmount');
    window.addEventListener('load', store.runMarquee);
    window.addEventListener('load', store.queryRefresh);
    store.queryInput = document.getElementById('queryInput');
    store.searchButton = document.getElementById('searchButton');
    store.queryInput.addEventListener('keyup', store.debounce(() => {
        store.inputAutocomplete();
    }, 400));
    store.queryInput.addEventListener('keyup', store.createCompanyNamesRefresh);
    store.queryInput.addEventListener('keyup', store.addQueryString);
    store.searchButton.addEventListener('click', store.inputSearch);
    store.searchButton.addEventListener('click', store.createCompanyNamesRefresh);
}

// Function called to start running the program
store.eventFunctions();