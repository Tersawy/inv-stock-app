const { contextBridge, ipcRenderer } = require("electron");

const Channels = require("../src/helpers/channels");

let validChannels = Object.values(Channels);

contextBridge.exposeInMainWorld("ipc", {
	send: (channel, data) => {
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	on: (channel, func) => {
		if (validChannels.includes(channel)) {
			// Strip event as it includes `sender` and is a security risk
			ipcRenderer.once(channel, (event, ...args) => func(...args));
		}
	},
	removeListener: (channel) => {
		if (validChannels.includes(channel)) {
			// Strip event as it includes `sender` and is a security risk
			ipcRenderer.removeAllListeners(channel);
		}
	}
});
