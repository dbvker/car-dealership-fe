import { useSelector, useDispatch } from "react-redux";
import { addAuth } from "../redux/features/authSlice";

import decodeJWT from "jwt-decode";
import "../styles/App.css";

// Components
import Header from "../components/header/Header";
import Search from "../components/search/Search";
import Inventory from "../components/inventory/Inventory";

function App() {
  const userID = useSelector(state => state.userAuth.userID);
  const dispatch = useDispatch();

  
  const token = localStorage.getItem('token');
  
  // See if we can put this in redux and header maybe
  if (userID === null && token) {
    const decoded = decodeJWT(token);
    dispatch(addAuth(decoded.id))
  }
  
  return (
    <>
      <Header />
      <Search />
      <Inventory />
    </>
  );
}

export default App;
