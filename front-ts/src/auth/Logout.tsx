import * as React from 'react';
import { Link } from 'react-router-dom';

import { AUTH_TOKEN, CURRENT_USER } from '../constant';

const Logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(CURRENT_USER);

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-5 col-mx-auto">
            <h1>You are currently logged out</h1>.
            <Link to="/login">
              <p>please login.</p>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
