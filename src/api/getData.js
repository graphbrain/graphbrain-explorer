
export const getData = (graphType) => {
  return fetch(`http://localhost:5000/api/conflicts${graphType}`)
  .then(response => {
    return response.json();
  }).then(data => {
    return data;
  }).catch((err) => {
    console.log(err);
  });
}

export default getData;