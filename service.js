const { parentPort } = require('worker_threads')
const os = require("os");

let oldInterfaces = [];

const interval = setInterval(() => {    
    let interfaces = os.networkInterfaces();

    if (JSON.stringify(interfaces) !== JSON.stringify(oldInterfaces)) {
        parentPort.postMessage(interfaces);
        oldInterfaces = interfaces;
    }
},1000);


function cln(){
    clearInterval(interval);
}