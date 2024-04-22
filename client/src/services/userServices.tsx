import { NavigateFunction } from "react-router-dom";
import Axios from "../axios";
import { UserContextType } from "../context/userContext";
import { User } from "../types";

interface GetUserInfoParams {
  setIsAuthenticated: UserContextType["setIsAuthenticated"];
  setUser: UserContextType["setUser"];
  navigate?: NavigateFunction;
}

export const GetUserInfo = async ({
  setIsAuthenticated,
  setUser,
  navigate,
}: GetUserInfoParams) => {
  const token = localStorage.getItem("jwtToken");

  try {
    if (!token) return;
    const response = await Axios.get<User>("/user/info");
    if (!response.data.username) throw new Error("Unauthorized");
    setIsAuthenticated(true);
    setUser(response.data);
    navigate && navigate("/");
  } catch (error) {
    setIsAuthenticated(false);
    console.log(error);
  }
};
