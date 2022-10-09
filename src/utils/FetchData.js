const apiUrl = 'https://api.spacexdata.com/v4/launches/query'


const FetchData = async function (body) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(apiUrl, options)
        .then(response => response.json())
        .then(response => {return response})
        .catch((error) => {
            return false;
    })

    return response;
}

export default FetchData;