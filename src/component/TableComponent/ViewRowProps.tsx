
import { useLocation } from 'react-router-dom';

const ViewRow = () => {
  const location = useLocation();
  const viewData = location.state.viewData;

  // Use the viewData here
  console.log(viewData);

  return (
    <div>
        <h2>ViewData</h2>
        <pre>{JSON.stringify(viewData)}</pre>
      </div>
  );
};

export default ViewRow