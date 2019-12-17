export const getData = (url, callback) => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        callback(res)
    })
    .catch(res => {
        console.error('Res error ' + res)
    })
}
