import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default NotFound;
