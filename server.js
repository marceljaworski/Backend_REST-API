const express = require("express");
const app = express();
const PORT = 3001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

const participants = [];
let lastId = 0;
//"Body Parser" Middleware 
app.use(express.json());

// 1. Richte eine Middleware ein, die sämtliche Anfragen im Terminal loggt.
app.use((req, res, next) => {
    console.log(req.method, req.url);
    // const serverOk = Math.random() >= 0.5;

    // if (!serverOk) return next(new Error("Der Server ist nicht OK"));

    next();
});

app.get("/participants", ( req, res ) => {
    res.status(200).json(participants)
});
app.get("/participants/:id", (req, res) => {
    let participant = participants.find(el => el.id == +req.params.id)
    if(!participant) return res.status(400).json("participant not found")
    res.status(200).json(participant);
});

app.post("/participants", ( req, res ) => {
    console.log(req.body)
    if(+req.body.age < 18) return res.status(400).json("too young")
    if(!req.body.firstName) return res.status(400).json("please write a name")
    if(!req.body.lastName) return res.status(400).json("please write a lastName")
    if(!req.body.email) return res.status(400).json("please write a email")
    lastId++;
    participants.push({
        id: lastId,
        ...req.body,
    })
    res.status(201).json()
});


//2. Fange "Not Found"-Fehler ab und beantworte die Fehler selbst mit dem Statuscode 404.
app.use((req, res) => {
    console.log("404 Not Found");
    res.status(404).end();
});

app.use((error, req, res, next) => {
    console.log("Fehler:", error);
    res.status(500).end();
  
});