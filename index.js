const { Worker } = require('worker_threads')
const path = require("path");

let listeners = [];
let listener_types = [];
let previous_data = []
const worker = new Worker(path.resolve(__dirname, 'service.js'), { workerData:"Hi" });

worker.on("message",(data)=>{
    listeners.forEach((listener,index)=>{
        if(listener_types[index] === "all"){
            listener(data);
        } else {
            if(typeof data[listener_types[index]] === "undefined"){
                listener({message:"Network interface is not active"});
                previous_data[index] = [];
            } else {
                let interface_data = data[listener_types[index]];
                if(JSON.stringify(previous_data[index]) !== JSON.stringify(interface_data)){
                    listener({[listener_types[index]]:interface_data});
                    previous_data[index] = interface_data;
                }
            }
        }
        
    });
});

worker.on('error', (err)=>{
    console.log("NETWORK INTERFACES LISTNER ERROR");
    console.log(err);
});

worker.on('exit', (code) => {
    if (code !== 0)
      console.log(`NETWORK INTERFACES LISTNER Worker stopped with exit code ${code}`);
    else
      console("NETWORK INTERFACES LISTNER worked exited");
})

function addNetInterfaceListener(type,listener) {
    if (listeners.indexOf(listener) === -1) {
        listeners.push(listener);
        listener_types.push(type);
        previous_data.push([]);
    }
}

function removeNetInterfaceListener(listener){
    let index = listeners.indexOf(listener);
    if(index > -1){
        listeners.splice(index, 1);
        listener_types.splice(index,1);
        previous_data.splice(index,1);
    }
}

module.exports = {
    addNetInterfaceListener: addNetInterfaceListener,
    removeNetInterfaceListener: removeNetInterfaceListener
}