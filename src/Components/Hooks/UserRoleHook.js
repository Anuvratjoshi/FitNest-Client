import { useMemo } from "react";

const useUserRole = () => {
  return useMemo(() => {
    try {
      // #### Try sessionStorage first ####
      const sessionData = sessionStorage.getItem("authUser");
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        if (parsedSession?.data?.role) return parsedSession.data.role;
      }

      //  #### Fallback to localStorage ####
      const localData = localStorage.getItem("authUser");
      if (localData) {
        const parsedLocal = JSON.parse(localData);
        if (parsedLocal?.data?.role) return parsedLocal.data.role;
      }
    } catch (error) {
      console.error("Error parsing authUser:", error);
    }

    return null;
  }, []);
};

export default useUserRole;
