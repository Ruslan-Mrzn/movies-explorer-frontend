import React from "react";
import { Route } from "react-router-dom";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { useHistory } from 'react-router-dom';
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ path, children }) => {

  const history = useHistory();

  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {

    mainApi.getCurrentUser()
    .then((user) => {
      if(!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== JSON.stringify(user)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      setIsLogged(true)
    })
    .catch(() => {
      history.push({
        pathname: '/'
      });
    })

  }, [history])

  return (
    <Route exact path={path}>
      {
        !isLogged ?
        <Preloader/>
        :
        children
      }
    </Route>
  );
};

export default ProtectedRoute;
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ loggedIn, path, children }) => {
//   return (
//     <Route exact path={path}>
//       {() => loggedIn ? children : <Redirect to="/" />}
//     </Route>
//   );
// };

// export default ProtectedRoute;
