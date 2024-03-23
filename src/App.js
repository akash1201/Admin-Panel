import React from 'react';
import { useSelector } from 'react-redux';
import Main from './Pages/Main';
import AuthRoute from './Routes/AuthRoutes';
const App = () => {
  const authToken = useSelector(state => state?.auth?.user);
  if (authToken) return <Main />;
  else return <AuthRoute />;
};
export default App;
