const { json, bodyParser } = require('body-parser');
const express = require('express');
const http = require('http');
const { start } = require('repl');
const app = express();
var exec = require('child_process').exec;

const applescript = require('applescript');

const ghost = require('ghost-cursor')
const nut = require('@nut-tree/nut-js');
const proxyChain = require('proxy-chain')
const { readFileSync, promises: fsPromises, fs } = require('fs');
let SmartInterval = require("smartinterval");
const { DEFAULT_ECDH_CURVE } = require('tls');
app.use(express.json());

const server = http.createServer(app);
let VpnReady = true
const delay = ms => new Promise(res => setTimeout(res, ms));
const delay10 = async () => {
    await delay(10000);

};
const delay100ms = async () => {
    await delay(1000);

};
function randomNumber(min, max) {
    // Generate a random number between min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}


var ShapeHeaderA = []
var ShapeHeaderA0 = []
var ShapeHeaderB = []
var ShapeHeaderC = []
var ShapeHeaderD = []
var ShapeHeaderF = []
var ShapeHeaderZ = [];
let XOffset
let YOffset
let ClientRectX
let ClientRectY
let Width
let Height
let buttonClientRectX
let buttonClientRectY
let buttonHeight
let buttonWidth
var interval = 10; // how much time should the delay between two iterations be (in milliseconds)?
var promise = Promise.resolve();
const proxies = readFileSync('proxies.txt', 'utf-8').split('\n')
// async function checkConnection(res) {
//     while (VpnReady == false) {
//         console.log("Client tried to get headers during IP switch, ignoring"), await delay(1000)

//     } {

//         res.json({ shapeheadera: ShapeHeaderA[0], shapeheadera0: ShapeHeaderA0[0], shapeheaderb: ShapeHeaderB[0], shapeheaderc: ShapeHeaderC[0], shapeheaderd: ShapeHeaderD[0], shapeheaderf: ShapeHeaderF[0], shapeheaderz: ShapeHeaderZ[0] });
//         ShapeHeaderA.shift()
//         ShapeHeaderA0.shift()
//         ShapeHeaderB.shift()
//         ShapeHeaderC.shift()
//         ShapeHeaderD.shift()
//         ShapeHeaderF.shift()
//         ShapeHeaderZ.shift()




//     }
// }

app.set('view engine', 'ejs');
app.set(express.urlencoded({ extended: false }));
app.set(express.json());
app.get('/', async (req, res) => {




    res.json({ shapeheadera: ShapeHeaderA[0], shapeheadera0: ShapeHeaderA0[0], shapeheaderb: ShapeHeaderB[0], shapeheaderc: ShapeHeaderC[0], shapeheaderd: ShapeHeaderD[0], shapeheaderf: ShapeHeaderF[0], shapeheaderz: ShapeHeaderZ[0] });
    ShapeHeaderA.shift()
    ShapeHeaderA0.shift()
    ShapeHeaderB.shift()
    ShapeHeaderC.shift()
    ShapeHeaderD.shift()
    ShapeHeaderF.shift()
    ShapeHeaderZ.shift()








});

app.get('/connection', (req, res) => {
    console.log(VpnReady)
    if (VpnReady == true) {
        // res.json({
        //     enabled: true
        // }
        // );
        res.send(200, { message: 'ok' });
    } else if (VpnReady == false) {
        // res.json({ enabled: false })
        res.send(400, { message: 'failed' });
    }
});
const nutt = nut.mouse
app.post('/headers', (req, res) => {
    // try {
    //     nut.mouse.click()
    // } catch (error) {
    //     // code that will handle the error
    // } finally {
    //     // code that will always be executed after the try and catch blocks
    // if (ShapeHeaderB.length() < 1) {
    //     res.send(500, { message: 'no headers' })
    // } else {
    ShapeHeaderA.push(req.body.headerA)
    ShapeHeaderB.push(req.body.headerB)
    ShapeHeaderC.push(req.body.headerC)
    ShapeHeaderD.push(req.body.headerD)
    ShapeHeaderF.push(req.body.headerF)
    ShapeHeaderZ.push(req.body.headerZ)
    res.send(200, { message: 'ok' });
    console.log(ShapeHeaderB)
}

)
app.post('/offset', (req, res) => {

    console.log(req.body)
    let offset = JSON.parse(req.body.results2)
    YOffset = offset.offsetY
    console.log("YOFF ", YOffset)
    XOffset = offset.offsetX
    res.send(200, { message: 'ok' });
    return { XOffset, YOffset }
})

app.post('/clientRect', (req, res) => {

    console.log(req.body)
    let clientRectCoord = JSON.parse(req.body.results)["0"]
    ClientRectX = clientRectCoord.x,
        console.log(ClientRectX)
    ClientRectY = clientRectCoord.y
    Width = clientRectCoord.width
    Height = clientRectCoord.height
    res.send(200, { message: 'ok' });
    return { ClientRectX, ClientRectY, Height, Width }
})

app.post('/buttonLocation', (reqButton, res) => {
    console.log("BUTTON FUCKING HERE LOOK NIGGA LOOK")
    console.log("ButtonRect \n", reqButton.body)
    let buttonClientRectCoord = JSON.parse(reqButton.body.results3)["0"]
    buttonClientRectX = buttonClientRectCoord.x,
        console.log(buttonClientRectX)
    buttonClientRectY = buttonClientRectCoord.y
    Width = buttonClientRectCoord.width
    Height = buttonClientRectCoord.height
    res.send(200, { message: 'ok' });
    return { buttonClientRectX, buttonClientRectY, buttonHeight, buttonWidth }
})
server.listen(3000, () => {
    console.log('listening on *:3000');

});

function checkFieldLocation(XOffset, YOffset, ClientRectX, ClientRectY) {
    let retVal = {
        x: XOffset + ClientRectX,
        y: YOffset + ClientRectY,
        width: Width,
        height: Height
    };
    console.log(retVal)

    return retVal
}
function randomFlags(arr) {
    let selection = [];
    while (selection.length < 7) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        if (selection.indexOf(arr[randomIndex]) === -1) {
            selection.push(arr[randomIndex]);
        }
    }
    return selection;
}
function txtToArray(filepath) {
    let lines = [];
    lines = readFileSync(filepath, 'utf-8').split('\n')
    // fs.readFile(filepath, (err, data) => {
    //     if (err) throw err;
    //     const textData = data.toString();
    //     lines = textData.split('\n');
    // });
    return lines;
}
// arr.join(" ");
// setTimeout(checkFieldLocation(XOffset, YOffset, ClientRectX, ClientRectY), 10000);
let dataFetcher = new SmartInterval(
    async function startGrabber() {
        // exec(`command rm -rf  /Users/kacey/Desktop/Datadir/68188/*
        // `)
        const script = `
tell application "TunnelBear"
    activate
    delay 2
    click button "Connect" of window 1
end tell
`;

        applescript.execString(script, (err, rtn) => {
            if (err) {
                // Handle error
            } else {
                // Do something with the returned value
            }
        });
        var profileDir = Math.floor(Math.random() * (1000000 - 1 + 1) + 1)
        var proxy = proxies[Math.floor(Math.random() * proxies.length)];
        var browsers = [`/Applications/Google\\ Chrome\\ Canary.app/Contents/MacOS/Google\\ Chrome\\ Canary`, `/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome`, `/Applications/Microsoft\\ Edge.app/Contents/MacOS/Microsoft\\ Edge`]
        var browser = browsers[Math.floor(Math.random() * browsers.length)];
        // console.log(proxy)

        var proxyParts = proxy.split(':')
        const oldProxyUrl = `http://${proxyParts[2]}:${proxyParts[3]}@${proxyParts[0]}:${proxyParts[1]}`
        console.log(oldProxyUrl)
        // const oldProxyUrl = 'http://iproyal6074:LeNwP7lIKkX73mBv_country-UnitedKingdom_session-BXirHgpO@rproxie.iproyal.com:31112';
        const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
        console.log(newProxyUrl)

        var possibleFlags = txtToArray(`flags.txt`)
        var flagChoices = randomFlags(possibleFlags)
        var formattedFlags = flagChoices.join(` `)
        console.log(formattedFlags)

        exec(`open -a /${browser} --args --load-extension=/Users/kacey/Desktop/esoteraLinker --user-data-dir=/Users/kacey/Desktop/Datadir/${profileDir} --window-position=592,25 --window-size=1200,897 --app=https://endclothing.com/gb/account --no-default-browser-check --no-first-run --url=https://endclothing.com/gb/account ${formattedFlags}`)

        // await delay(randomNumber(4123, 5123))
        // promise.then(function () {
        //     nut.keyboard.pressKey(nut.Key.Enter);aaa@aaa.aaa

        // });
        await delay(randomNumber(19321, 20431))
        retVal = checkFieldLocation(XOffset, YOffset, ClientRectX, ClientRectY)
        buttonRetVal = checkFieldLocation(XOffset, YOffset, buttonClientRectX, buttonClientRectY)
        if (retVal) {
            var randomPointX = Math.floor(Math.random() * ((retVal.x + retVal.width) - retVal.x + 1)) + retVal.x;
            var randomPointY = Math.floor(Math.random() * ((retVal.y + retVal.height) - retVal.y + 1)) + retVal.y
            console.log(randomPointX, randomPointY);
            const fromPoint = { x: 0, y: 0 }
            const to = { x: randomPointX, y: randomPointY }
            const route = ghost.path(fromPoint, to)
            console.log(route)
            route.forEach(function (element) {
                promise = promise.then(function () {
                    var targetPoint = new nut.Point(element.x, element.y);
                    console.log(targetPoint);
                    nut.mouse.setPosition(targetPoint);
                    return new Promise(function (resolve) {
                        setTimeout(resolve, interval);
                    });
                });
            });
            //route.slice(-1)[0]


            promise.then(function () {
                console.log('Movement finished');
            });
            await delay(randomNumber(999, 1333))
            // ADD REALISTIC DELAY BETWEEN MOVEMENT TO ELEMENT AND CLICK
            promise.then(function () {
                nut.mouse.click(0)
            });
            await delay(randomNumber(49, 72))
            promise.then(function () {
                nut.keyboard.pressKey(nut.Key.LeftSuper);

            });
            await delay(randomNumber(88, 122))
            promise.then(function () {
                nut.keyboard.pressKey(nut.Key.V);

            });
            await delay(randomNumber(49, 72))
            //split below function into 2 and add realistic keyboard delay
            promise.then(function () {
                nut.keyboard.releaseKey(nut.Key.LeftSuper);
            });
            await delay(randomNumber(50, 99))
            promise.then(function () {
                nut.keyboard.releaseKey(nut.Key.V);
            });
            // add delay
            await delay(randomNumber(999, 1234))
            var buttonRandomPointX = Math.floor(Math.random() * ((buttonRetVal.x + buttonRetVal.width) - buttonRetVal.x + 1)) + buttonRetVal.x;
            var buttonRandomPointY = Math.floor(Math.random() * ((buttonRetVal.y + buttonRetVal.height) - buttonRetVal.y + 1)) + buttonRetVal.y
            console.log(buttonRandomPointX, buttonRandomPointY);
            const buttonFromPoint = route.slice(-1)[0]
            const toButton = { x: buttonRandomPointX, y: buttonRandomPointY }
            const routeButton = ghost.path(buttonFromPoint, toButton)
            console.log(routeButton)
            routeButton.forEach(function (element) {
                promise = promise.then(function () {
                    var targetPoint = new nut.Point(element.x, element.y);
                    console.log(targetPoint);
                    nut.mouse.setPosition(targetPoint);
                    return new Promise(function (resolve) {
                        setTimeout(resolve, interval);
                    });
                });
            });
            await delay(randomNumber(1000, 2000))
            await delay(10000000)
            for (let i = 0; i < 1; i--) { }
            for (let i = 0; i < 40; i++) {
                promise.then(function () {
                    nut.mouse.click(0)
                });
                //add delay or lopp
                await delay(randomNumber(1111, 2222))
            }

            VpnReady = false
            await delay(1000)
            var tunnelBearApp = new nut.Point(1010, 12)
            var tuennlBearButton = new nut.Point(914, 79)
            promise.then(function () {
                nut.mouse.setPosition(tunnelBearApp)
            });
            await delay(50)
            promise.then(function () {
                nut.mouse.click(0)
            });
            await delay(1000)
            promise.then(function () {
                nut.mouse.setPosition(tuennlBearButton)
            });
            await delay(50)
            promise.then(function () {
                nut.mouse.click(0)
            });
            await delay(1000)
            promise.then(function () {
                nut.mouse.click(0)
            });
            await delay(500)
            promise.then(function () {
                nut.mouse.setPosition(tunnelBearApp)
            });
            await delay(50)
            promise.then(function () {
                nut.mouse.click(0)
            });
            await delay(randomNumber(9999, 11111))
            VpnReady = true
        }
        // route.forEach((element, index, array) => {
        //     var targetPoint = new nut.Point(element.x, element.y)
        //     console.log(targetPoint)
        //     nut.mouse.setPosition(targetPoint)
        //     delay(100)
        //     // console.log(element.x); // 100, 200, 300
        //     // console.log(index); // 0, 1, 2
        //     // console.log(array); // same myArray object 3 times
        // });nd 
        var toClose = browser.split(`/`)
        var toClose1 = toClose[2].split(`.`)
        var toClose2 = toClose1[0]
        let newStr = toClose2.replace(/\\/g, "\\");
        exec(`pkill -f ${newStr}`)

        // exec(`pkill -f Google\  Chrome\  Canary`)

        return

    },
    randomNumber(2500, 4000)
);

dataFetcher.start()
