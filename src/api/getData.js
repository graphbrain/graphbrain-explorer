
export const getData = (graphType) => {
  // const ending = graphType === '1' ? '/all' : '2';

  const findEnding = () => {
    switch(graphType) {
      case 'topics':
      return '/topics';
      case '1':
      return '1';
      case '2':
      return '2';
      default:
      return `/topic${graphType}`;
    }
  }

  console.log(graphType);
  console.log(findEnding());

  return fetch(`http://localhost:5000/api/conflicts${findEnding()}`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    return data;
  }).catch((err) => {
    console.log(err);
  });
}

export default getData;

