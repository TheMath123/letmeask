//React
import { useContext } from "react";

//Contexto
import { AuthContext } from "../contexts/AuthContext";

//Hook de autentificação
export const useAuth = () => {
  return useContext(AuthContext);
}