const express = require("express");
const app = express();
const PORT = 3007;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

const participantsData = [
    {
        id: 1,
        firstName: "Shannah",
        lastName: "Curton",
        email: "scurton0@weather.com",
        age: 46,
    }, {
        id: 2,
        firstName: "Arvie",
        lastName: "Stading",
        email: "astading1@drupal.org",
        age: 39,
    }, {
        id: 3,
        firstName: "Cassandry",
        lastName: "Parcells",
        email: "cparcells2@foxnews.com",
        age: 23,
    }
];
let lastId = 0;
app.use(express.json());

let participants = [];
// 1. Richte eine Middleware ein, die sämtliche Anfragen im Terminal loggt.
app.use((req, res, next) => {
    console.log(req.method, req.url);
    const serverOk = Math.random() >= 0.5;

    if (!serverOk) return next(new Error("Der Server ist nicht OK"));
    // vergleichbar mit: throw new Error("Der Server ist nicht OK")

    next();
});

app.get("/participants/data",( req, res ) => {
    res.status(200).json(participantsData);
})
app.post("/participants", ( req, res ) => {
    console.log(req.body)
    if(+req.body.age < 18) return res.status(400).json("too young");
    lastId++;
    participants.push({
        ...req.body,
        id: lastId,
    })
    res.status(201).json()
})
app.put("/participants/:id", ( req, res ) => {
    console.log(req.params.id)
    
    participants.map((el) => {
        +req.params.id == el.id ? {id: el.id , ...req.body} : el;
         })
    // participants.push({...req.body})
    res.status(201).send("data posted")
})
app.get("/participants", ( req, res ) => {
    res.json(participants)
})
app.use((req, res) => {
    console.log("404 Fehler");
    res.status(404).end();
});

app.use((error, req, res, next) => {
    console.log("Fehler:", error);
    res.status(500).end();
  
});