import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./services/apiAuth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(
    function () {
      authService
        .getCurrentUser()
        .then((userData) => {
          if (!userData) {
            dispatch(logout());
          } else {
            dispatch(login(userData));
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },
    [dispatch]
  );
  if (loading) return <p>Loading</p>;
  return (
    <div>
      <Header />
      {/* <Outlet/> */}
      <Footer />
    </div>
  );
}

export default App;
