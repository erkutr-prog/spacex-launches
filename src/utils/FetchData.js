const launchApiUrl = 'https://api.spacexdata.com/v4/launches/query';
const launchpadApiUrl = 'https://api.spacexdata.com/v4/launchpads/query';

const FetchData = async function (body, api) {
  const url = api == 'Launch' ? launchApiUrl : launchpadApiUrl;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return false;
    });

  return response;
};

export default FetchData;
