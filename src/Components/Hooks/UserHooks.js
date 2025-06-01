import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = getLoggedinUser();

      if (
        user &&
        typeof user === "object" &&
        user.data &&
        typeof user.data === "object"
      ) {
        setUserProfile(user.data);
        setToken(user.data.token || null);
      } else {
        setUserProfile(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      setUserProfile(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { userProfile, token, loading };
};

export { useProfile };
