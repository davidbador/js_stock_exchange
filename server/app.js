const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const cors = require('cors');

app.use(cors());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("mydb");
    app.get('/search', function (req, res) {
        searchWithQuery(req.query.query).then((companyProfiles) => {
            res.json(companyProfiles);
            const userInput = req.query.query;
            const object = { userInput, companyProfiles, createdDate: Date.now() };
            dbo.collection("search").insertOne(object, (err) => {
                if (err) throw err;
            })
        })
    })
});

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

let PORT = 5500;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})