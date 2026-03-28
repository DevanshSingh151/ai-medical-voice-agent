"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface UserDetail {
  name: string;
  email: string;
  credits: number;
}

interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: (user: UserDetail | null) => void;
}

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});

export function UserDetailProvider({ children }: { children: ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/users");
        if (res.data) {
          setUserDetail(res.data);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export const useUserDetail = () => useContext(UserDetailContext);
