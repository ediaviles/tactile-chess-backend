import express from "express";
import cors from "cors";
import lichess from "lichess-api";
import http from "http";

const app = express();
app.use(cors());

app.get("/getData", (req, res) => {
    res.send("hello");
})

app.listen(5000, async ()=> {
    /*lichess.user('thibault', function (err, user) {
        console.log(user);
    })*/
    let req = await http.get("https://lichess.org/api/board/game/stream/wBmRkXAH", function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
    })
    req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
});