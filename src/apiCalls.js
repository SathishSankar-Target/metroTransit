export const fetchApi = (query) => {
    const queryUrl = 'https://svc.metrotransit.org/nextripv2/'+query
    return fetch(queryUrl).then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        console.error(error);
        return error
    })
}