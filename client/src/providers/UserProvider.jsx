import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  /* loading state is necessary, when some components are using useEffect 
  it fetches initial values like null and becomes difficult to get values from 
  context API, that why we use loading state */
  const [loading, setLoading] = useState(true);

  // getting user
  const fetchUser = async () => {
    try {
      // set loading to true while fetching
      setLoading(true);

      // getting response from server for refetch API
      const response = await axios.get(
        "http://localhost:8000/user/refetch",
        { withCredentials: true } // for cookie
      );

      console.log(response.data.decodedToken);

      setUser(response.data.decodedToken);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      // set loading to false once fetching is done
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // logout
  const logout = async () => {
    try {
      // getting response from server for logout API
      const response = await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true, // for cookie
      });

      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
