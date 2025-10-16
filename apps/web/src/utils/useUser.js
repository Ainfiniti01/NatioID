import * as React from 'react';
import { useSession } from "@auth/create/react";


const useUser = () => {
  const { data: session, status } = useSession();
  const id = session?.user?.id

  const [user, setUser] = React.useState(session?.user ?? null);

  // Removed refetch logic that depended on process.env
  // const fetchUser = React.useCallback(async (session) => {
  //   return session?.user;
  // }, [])

  // const refetchUser = React.useCallback(() => {
  //   // Removed process.env.NEXT_PUBLIC_CREATE_ENV dependency
  //   // if("development" === "PRODUCTION") { // Replaced with dummy value
  //   //   if (id) {
  //   //     fetchUser(session).then(setUser);
  //   //   } else {
  //   //     setUser(null);
  //   //   }
  //   // }
  // }, [fetchUser, id])

  // React.useEffect(refetchUser, [refetchUser]);

  // Simplified return to always use mock/development data
  return { user, data: session?.user || null, loading: status === 'loading', refetch: () => {} }; // Provide a no-op refetch
};

export { useUser }

export default useUser;
