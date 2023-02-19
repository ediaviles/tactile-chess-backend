import express from "express";
import cors from "cors";
import lichess from "lichess-api";
import https from "https";
import "dotenv";
import fetch from "node-fetch";
import http from "http";
import "querystring";


const app = express();
app.use(cors());

const readStream = processLine => response => {
    const matcher = /\r?\n/;
    const decoder = new TextDecoder();
    let buf = '';
    return new Promise((resolve, fail) => {
        response.body.on('data', v => {
            const chunk = decoder.decode(v, {stream: true});
            buf += chunk; // this chunk object is a string of our JSON object event
            const parts = buf.split(matcher);
            buf = parts.pop();
            for (const i of parts.filter(p => p)) {
                //processLine(JSON.parse(i));
                let jsonTemp = JSON.parse(i);
                if (jsonTemp != null && jsonTemp.type == "gameStart") {
                    console.log("Game has started with id: " + jsonTemp.game.gameId);
                    const gameStream = fetch(`https://lichess.org/api/board/game/stream/${jsonTemp.game.gameId}`, {headers:headers})
                    gameStream
                        .then(readStream(onMessage));
                }
                if (jsonTemp != null && jsonTemp.type == "gameState") {
                    console.log("Last move made: " + jsonTemp.moves.split(" ").slice(-1))
                }
            }
        });
        response.body.on('end', () => {
            if (buf.length > 0) processLine(JSON.parse(buf));
            resolve();
        })
        response.body.on('error', fail);
    })
}
const onMessage = obj => console.log(obj);

const headers = {
    Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
};


app.post("/seekGame", (req, res) => {
    // Initially open a listening port
    console.log("hit the endpoint")
    const optionsStream = {
        headers: headers,
        host: 'lichess.org',
        path: '/api/stream/event'
    }
    const stream = fetch('https://lichess.org/api/stream/event', {headers: headers});
    stream
        .then(readStream(onMessage));
    console.log('outside');
    //fetch('https://lichess.org/api/board/seek', {method: 'POST', headers: headers});
} )

app.post("/makeMove/:gameId/:move", (req, res) => {
    let gameId = req.params.gameId;
    let move = req.params.move;
    console.log("got called");
    try {
        fetch(`https://lichess.org/api/board/game/${gameId}/move/${move}`, {method: 'POST', headers: headers}).then((e) => console.log(e.status));
        res.json({msg: 'success'})
    } catch (e) {
        console.log(e.status)
    }
})

app.listen(5000, async ()=> {
    console.log('app is running')
})
