import express from "express";
import cors from "cors";
import lichess from "lichess-api";

const app = express();
app.use(cors());

app.get("/getData", (req, res) => {
    res.send("hello");
})

app.listen(5000, ()=> {
    lichess.user('thibault', function (err, user) {
        console.log(user);
    })
});