import React from "react";
import { Route } from "react-router-dom";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ path, children }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const history = useHistory();

  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    mainApi.getCurrentUser()
    .then((user) => {
      if(!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== JSON.stringify(currentUser)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      setIsLogged(true)
    })
    .catch(() => {
      history.push({
        pathname: '/'
      });
    })
  }, [history, currentUser])

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
