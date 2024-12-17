const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let votes = { Bitcoin: 0, Ethereum: 0, XRP: 0 };

app.post("/vote", (req, res) => {
    const { crypto } = req.body;
    if (votes[crypto] !== undefined) {
        votes[crypto]++;
        res.json({ message: "Vote recorded", results: votes });
    } else {
        res.status(400).json({ message: "Invalid cryptocurrency" });
    }
});

app.get("/results", (req, res) => {
    res.json({ results: votes });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
