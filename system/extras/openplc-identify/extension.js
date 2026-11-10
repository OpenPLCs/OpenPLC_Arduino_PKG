// Blinks LED3 on the OpenPLC board picked in the Arduino IDE 2 port list.
// The board blinks on a DTR rise on USB or on a unicast UDP request
// (decisions 161 and 177, OpenPLC_Instruction docs/tables/DECISIONS.md).
'use strict';

const vscode = require('vscode');
const fs = require('fs');
const dgram = require('dgram');
const { execFile } = require('child_process');

const USB_VID = '0x0483'; // boards.txt upload_port.0.vid / pid
const USB_PID = '0x5740';
const NET_DEVICE = 'STM32H743'; // deviceName in the network discovery reply
const DISCOVER = 'openplc_server_where_r_y';
const HOLD_MS = 100;

function pokeSerial(address) {
  if (process.platform === 'win32') {
    // Opening a COM port from Node does not raise DTR; .NET SerialPort does.
    if (!/^COM\d+$/i.test(address)) {
      return;
    }
    const ps = "$p = New-Object System.IO.Ports.SerialPort '" + address + "',115200; " +
      '$p.DtrEnable = $true; $p.Open(); Start-Sleep -Milliseconds ' + HOLD_MS + '; $p.Close()';
    execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps],
      { windowsHide: true, timeout: 10000 }, () => {});
    return;
  }
  // Linux and macOS raise DTR when the tty is opened.
  fs.open(address, fs.constants.O_RDWR | fs.constants.O_NOCTTY | fs.constants.O_NONBLOCK, (err, fd) => {
    if (!err) {
      setTimeout(() => fs.close(fd, () => {}), HOLD_MS);
    }
  });
}

function pokeNetwork(address, port) {
  const sock = dgram.createSocket('udp4');
  sock.on('error', () => sock.close());
  sock.send(DISCOVER, port, address, () => sock.close());
}

function onPort(port) {
  if (!port || !port.address) {
    return;
  }
  const props = port.properties || {};
  if (port.protocol === 'serial') {
    if (String(props.vid).toLowerCase() === USB_VID && String(props.pid).toLowerCase() === USB_PID) {
      pokeSerial(port.address);
    }
  } else if (port.protocol === 'network') {
    const udpPort = parseInt(props.port, 10);
    if (props.deviceName === NET_DEVICE && udpPort > 0) {
      pokeNetwork(port.address, udpPort);
    }
  }
}

function activate(context) {
  const api = vscode.extensions.getExtension('dankeboy36.vscode-arduino-api');
  const arduino = api && api.exports;
  if (!arduino) {
    return;
  }
  context.subscriptions.push(arduino.onDidChange('port')(onPort));
}

module.exports = { activate, deactivate() {} };
