import express from "express";
import cors from "cors";
import lichess from "lichess-api";
import https from "https";
import "dotenv";
import fetch from "node-fetch";
import http from "http";


const app = express();
app.use(cors());

app.get("/getData", (req, res) => {
    res.send("hello");
})

app.post("/seekGame", (req, res) => {
    // Initially open a listening port
    console.log("hit the endpoint")
    const optionsStream = {
        headers: headers,
        host: 'lichess.org',
        path: '/api/stream/event',
        method: 'GET'
    }
    const streamReq = https.request(optionsStream, (streamRes) => {
        console.log(streamRes)
    })
    // Create the seek and wait for match to start
} )

const headers = {
    Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
};
const options = {
    host: 'lichess.org',
    path: '/api/board/game/HKORenq4/move/b2b3',
    headers: {
        Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
    },
    method: 'POST'
}

let gameId = "inputGameId";
let movesList = [
    "a2a3",
    "b2b3",
    "c2c3"
];

/*const req = https.request(options, (res) => {
    console.log(res.statusCode)
    console.log(res)
});
req.on('error', (e) => {
    console.log(e.message)
})
req.end()*/
app.listen(5000, async ()=> {
    console.log('app is running')
})

/*fetch('https://lichess.org/api/stream/game/yxQMAb4R', { headers })
    .then((res) => {
        res.on('data', function(state) {
            console.log(state);
        })
    })
    .then(console.log);*/
