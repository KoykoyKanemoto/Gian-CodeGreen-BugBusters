import { useEffect, useState } from "react";
import { BackendError } from "../types/error.types";
import { UserType } from "../types/datatypes.ts";
import { fetchWithAuth } from "../utils/fetch.tsx";
import useFetchWithAuthExports from "./context-hooks/useFetchWithAuthExports.ts";

const useUser = () => {
  const [data, setData] = useState<UserType | null>(null); // Store fetched drivers
  const [error, setError] = useState<BackendError | null>(null); // Handle errors
  const [loading, setLoading] = useState(false); // Track loading state
  const { auth, refresh, navigate } = useFetchWithAuthExports();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          navigate,
          refresh,
          auth,
          "/user/get",
          "get"
        );
        if (!response.ok) {
          const error: BackendError = await response.json();
          setError(error);
          return;
        }
        const user: UserType = await response.json();
        console.log(user);
        setData(user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError({ message: "An unexpected error occurred" } as BackendError);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [auth]);

  return { data, error, loading };
};

export default useUser;
