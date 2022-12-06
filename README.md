Aufgabe 1
=================
Wir wollen eine neue API erstellen, mit der unsere Kursinformationen abgerufen und verwaltet werden können. Zuerst müssen wir aber ein wenig planen.
Folgende Ressourcen-Typen benötigen wir:
- Kurse
- Teilnehmer
- Module/Inhalte
Für alle drei Ressourcen-Typen sollen CRUD-Operationen über die API verfügbar sein. Außerdem soll jede einzelne Ressource erreichbar sein. Plane die entsprechenden Endpoints und überlege dir auch, welche Statuscodes in welchen Situationen zurückgesendet werden können.

CRUD: Create, Read, Update , Delete.

```const Kurse = { create: () => {}, read: () => {}, update: () => {}, delete: () => {}}``` 
## Kurse 
POST   /kurse    201
GET    /kurse    200
PUT    /kurse    204
DELETE /kurse    204

## Teilnehmer mehrzahl (erste moglichkeit)
POST   /teilnehmer    201
GET    /teilnehmer    200
PUT    /teilnehmer    204
DELETE /teilnehmer    204

## Teilnehmer mehrzahl (zweite moglichkeit)
POST   /kurse:id/teilnehmer    201
GET    /kurse:id/teilnehmer    200
PUT    /kurse:id/teilnehmer    204
DELETE /kurse:id/teilnehmer    204
## Teilnehmer einzig
POST   /teilnehmer/:id    201
GET    /teilnehmer/:id    200
PUT    /teilnehmer/:id    204
DELETE /teilnehmer/:id    204

## Module 
POST   /modules        201
GET    /modules        200
GET    /modules/:id    200
PUT    /modules        204
PUT    /modules/:id    204
DELETE /modules        204
DELETE /modules/:id    204

Aufgabe 2
=================
Plane eine API für einen Online-Shop. Wir betrachten die API nur aus Kundensicht, wir benötigen also keine Verwaltung des Angebots.
Folgende Ressourcen-Typen sollen dabei zur Verfügung stehen:
- Produkte
- Produkt-Details
- Benutzerkonten
- Bestellungen
Folgende Anforderungen müssen berücksichtigt werden. Gib für jede Anforderung eine Beispielanfrage (Methode, Pfad, mögliche Statuscodes) an:
1. Produkte werden Kategorien zugeordnet und sollen nach der Kategorie gefiltert werden können.
2. Benutzer können sich ein eigenes Benutzerkonto anlegen.
3. Benutzer können ihr eigenes Benutzerkonto bearbeiten und löschen.
4. Bestellungen sollen nur für das eigene Benutzerkonto ausgelesen werden.

## Produkte 

GET    /produkte               200
GET    /produkte?kategorie=    200 (erste moglichkeit)
GET    /produkte/:kategorie    200 (zweite moglichkeit)


## Produkt-Details 

GET    /produkt/:id       200

## Benutzerkonten 
POST   /benutzerkonto        201
GET    /benutzerkonto/:id    200 .json()
PUT    /benutzerkonto/:id    204
DELETE /benutzerkonto/:id    204 .end()


## Bestellungen 
POST   /benutzerkonto/:id/bestellungen                201
GET    /benutzerkonto/:id/bestellungen                200
GET    /benutzerkonto/:id/bestellungen/:bestellung    200
PUT    /benutzerkonto/:id/bestellungen/:bestellung    204
DELETE /benutzerkonto/:id/bestellungen                204
DELETE /benutzerkonto/:id/bestellungen/:bestellung    204
## Kursverwaltung
Unsere Kursverwaltung wird erweitert! Wir wollen einige Änderungen vornehmen, die mit Middlewares gut umzusetzen sind.
1. Richte eine Middleware ein, die sämtliche Anfragen im Terminal loggt.
2. Fange "Not Found"-Fehler ab und beantworte die Fehler selbst mit dem Statuscode 404.
Bei POST, PUT und PATCH können wir einen Body in der Anfrage verwenden. Damit wir die Daten im Backend verarbeiten können, müssen wir sie aber zuerst umwandeln(ähnlich dem response.json() bei fetch()).
Hierzu verwenden wir die Middleware express.json(), die wir folgendermaßen einbinden: app.use(express.json()).
Anschließend sind die übermittelten Daten in req.body enthalten.
1. Richte diese "Body Parser" Middleware in deinem Server ein.
2. Teste sie, indem du an POST /participants ein paar Informationen übermittelst und in der Antwort oder im Terminal ausgibst.
3. Lege dir ein leeres Array "participants" an in server.js und speichere die übermittelten Daten darin. Überlege dir, wie du eine passende ID erzeugen kannst.
Hier ist ein Beispiel-Array mit Teilnehmerdaten:
[
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
]
1. Überprüfe beim POST /participants, ob das Alter "age" größer oder gleich 18 ist. Falls nicht, gib einen Fehler zurück und speichere den Datensatz nicht.
2. Überprüfe außerdem, ob Vor- und Nachname und die E-Mail-Adresse übermittelt wurden. Falls nicht, gib einen Fehler zurück und speichere den Datensatz nicht.
// Task 1
// =================
// ## Courses
// GET         /courses            200
// GET         /courses/:id        200
// POST        /courses            201
// PUT         /courses/:id        204
// DELETE      /courses/:id        204
app.get("/courses", (req, res) => {
    res.status(200).json();
});
app.get("/courses/:id", (req, res) => {
    res.status(200).json();
});
app.post("/courses", (req, res) => {
    res.status(201).json();
});
app.put("/courses/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/courses/:id", (req, res) => {
    res.status(204).end();
});

// ## Participants
// GET         /participants       200
// GET         /participants/:id   200
// POST        /participants       201
// PUT         /participants/:id   204
// DELETE      /participants/:id   204
app.get("/participants", (req, res) => {
    res.status(200).json();
});
app.get("/participants/:id", (req, res) => {
    res.status(200).json();
});
app.post("/participants", (req, res) => {
    res.status(201).json();
});
app.put("/participants/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/participants/:id", (req, res) => {
    res.status(204).end();
});

// ## Modules
// GET         /modules            200
// GET         /modules/:id        200
// POST        /modules            201
// PUT         /modules/:id        204
// DELETE      /modules/:id        204
app.get("/modules", (req, res) => {
    res.status(200).json();
});
app.get("/modules/:id", (req, res) => {
    res.status(200).json();
});
app.post("/modules", (req, res) => {
    res.status(201).json();
});
app.put("/modules/:id", (req, res) => {
    res.status(204).end();
});
app.delete("/modules/:id", (req, res) => {
    res.status(204).end();
});