import "isomorphic-fetch";

const getDroneMeasurements = async () => {
  // Using the create-react-app's proxy for CORS issues
  const response = await fetch(
    `https://react-assessment-api.herokuapp.com/api/drone`
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return json;
};

export default getDroneMeasurements;