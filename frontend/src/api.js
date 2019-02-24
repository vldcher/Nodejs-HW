import axios from 'axios';

const serverUrl = 'http://localhost:3005';

export async function getDevices() {
    const response =  await axios.get(`${serverUrl}/devices`);
    return response.data;
}

export async function getDeviceById(deviceId) {
    const response = await axios.get(`${serverUrl}/devices/${deviceId}`);
    return response.data;
}

export async function addDevice(device) {
    return axios.post(`${serverUrl}/devices`, device);
}

export async function removeDevice(deviceId) {
    return axios.delete(`${serverUrl}/devices/${deviceId}`);
}

export async function updateDevice(deviceId, data) {
    return axios.put(`${serverUrl}/devices/${deviceId}`, data);
}

export async function switchOn(deviceId) {
    await updateDevice(deviceId, {
        state: 'on'
    });
}

export async function switchOff(deviceId) {
    await updateDevice(deviceId, {
        state: 'off'
    });
}

export async function getDeviceLog(deviceId) {
    return [
        {
            date: '2018-31-08 16:00:00',
            action: 'On'
        },
        {
            date: '2018-31-08 17:00:00',
            action: 'Off'
        }]
}