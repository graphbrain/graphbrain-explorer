
export const getData = async (graphType) => {
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

  try {
    const result = await fetch(`http://localhost:5000/api/conflicts${findEnding()}`);
    const data = await result.json();
    // console.log(data);
    return data;

  } catch(err) {
    console.log(err);
    return 'error';
  };
}

export default getData;
