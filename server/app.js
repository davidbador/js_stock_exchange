const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const cors = require('cors');

app.use(cors());

getStockData = async (inputValue) => {
    let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`);
    let data = await ticker.json();
    return data;
}

getStockSymbol = async (symbol) => {
    let info = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
    let data = await info.json();
    return data;
}

searchWithQuery = async (inputValue) => {
    let companies = await getStockData(inputValue);
    let getCompanyProfiles = companies.map((company) => {
        return getStockSymbol(company.symbol);
    });
    let companyProfiles = await Promise.all(getCompanyProfiles)
    return companyProfiles;
}

app.get('/search', function (req, res) {
    searchWithQuery(req.query.query).then((companyProfiles) => {
        res.json(companyProfiles);
    })
})

let PORT = 5500;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})