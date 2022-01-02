# network-interfaces-listener

Listens change in network interfaces. If they become active, or inactive. Which network interfaces are online or not. For example, listener gets called, and returns network interface data like ip addreess etc. when wifi is active, or ethernet connection is active.


## Installing

Using npm:

```bash
$ npm install network-interfaces-listener
```

## Usage

### Adding Listener
```js
//called if any network interface becomes active, and returns data of all interfaces.
const net_listner = require("network-interfaces-listener");

function onNetworkInterfaceChange(data){
    console.log(data);
}

net_listner.addNetInterfaceListener("all",onNetworkInterfaceChange);

/*
Example Output:
{
  lo: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8'
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/128',
      scopeid: 0
    }
  ]
}
*/
```

### Removing Listener
```js
net_listner.removeNetInterfaceListener(onNetworkInterfaceChange);
```

## API

### addNetInterfaceListener()
To add listener

```js
addNetInterfaceListener(type,listener);
```

`type:` type can be 'all', or name of a particular interface. eg. 'lo', 'wlo1', 'Wi-Fi', 'Loopback Pseudo-Interface 1' etc. 

`listener:` name of callback function, having a parameter called data. The data parater will be a javascript object containing information about network interfaces/interface.

### removeNetInterfaceListener()
To remove listener

```js
removeNetInterfaceListener(listener);
```

`listener:` pass the same listener passed to addNetInterfaceListener. Do not pass two different functions, otherwise it will not be removed.

## Message
Any contribution to this project is welcome.