let store = {};

(async function() {
    store.history = document.getElementById('searchHistory');
    store.searchHistory = new SearchFormHistory(store.history);  
})()