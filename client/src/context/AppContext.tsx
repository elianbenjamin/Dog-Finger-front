import { ReactNode, createContext, useState } from "react";
import { CreatedDog, Dog } from "../types";

export interface AppContextType {
  allTemperaments: string[];
  allBreedGroups: string[];
  createdDog: CreatedDog;
  setAllTemperaments: React.Dispatch<React.SetStateAction<string[]>>;
  setAllBreedGroups: React.Dispatch<React.SetStateAction<string[]>>;
  setCreatedDog: React.Dispatch<React.SetStateAction<CreatedDog>>;
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  backRoute: string;
  setBackRoute: React.Dispatch<React.SetStateAction<string>>;
  modifying: "accepted" | "pending" | false;
  setModifying: React.Dispatch<
    React.SetStateAction<"accepted" | "pending" | false>
  >;
  dogs: Dog[];
}

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
  const [backRoute, setBackRoute] = useState<string>("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [allTemperaments, setAllTemperaments] = useState<string[]>([]);
  const [allBreedGroups, setAllBreedGroups] = useState<string[]>([]);
  const [createdDog, setCreatedDog] = useState<CreatedDog>({
    name: "",
    height: "",
    weight: "",
    temperaments: [],
    breedGroup: "",
    lifeSpan: "",
    img: null,
  });
  const [modifying, setModifying] =
    useState<AppContextType["modifying"]>(false);


  return (
    <AppContext.Provider
      value={{
        allBreedGroups,
        allTemperaments,
        setAllTemperaments,
        setAllBreedGroups,
        createdDog,
        setCreatedDog,
        setDogs,
        backRoute,
        setBackRoute,
        modifying,
        setModifying,
        dogs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
