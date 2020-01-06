import {serverInfo} from "./store/static";

export const getData = (callback) => {
    fetch(serverInfo.url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': serverInfo.secretKey,
            'versioning': false
        }
    })
    .then(res => res.json())
    .then(res => {
        callback(res)
    })
    .catch(res => {
        console.error(res)
    })
};

export const updateData = (data, callback) => {
    fetch(serverInfo.url,  {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': serverInfo.secretKey,
            'versioning': false
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        if(typeof callback === 'function'){
            callback(res)
        }
    })
    .catch(res => {
        console.error(res)
    })
}