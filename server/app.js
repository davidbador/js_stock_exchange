const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const cors = require('cors');

app.use(cors());

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
let mongo = require('mongodb');

let dbo;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db("mydb");
});

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

app.get('/search-history', function (req, res) {
    let collection = dbo.collection("search");
    collection.find({}).sort({ createdDate: -1 }).toArray(function (err, search) {
        res.json(search)
    });
});

app.delete('/search-history/:id', function (req, res) {
    let id = req.params.id;
    let collection = dbo.collection("search");
    collection.deleteOne({ _id: new mongo.ObjectId(id) }, (err) => {
        if (err) throw err;
    })
})

getStockData = async (inputValue) => {
    let ticker = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=0a3fb7f3d8ba2c1756f04632597d0309`);
    let data = await ticker.json();
    return data;
}

getStockSymbol = async (symbol) => {
    let info = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}?apikey=0a3fb7f3d8ba2c1756f04632597d0309`);
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