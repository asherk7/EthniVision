export const resetDatabase = async() => {
    fetch('http://localhost:4000/reset', {
        method: 'GET',
        crossDomain: true
    }).then((response) => {
        response.json().then((data) => { console.log(data); })
    }).catch((err) => {
        console.log(err);
    })
}