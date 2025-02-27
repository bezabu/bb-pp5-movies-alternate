import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const GenreDataContext = createContext();
export const SetGenreDataContext = createContext();


export const useGenreData = () => useContext(GenreDataContext)
export const useSetGenreData = () => useContext(SetGenreDataContext)


export const GenreDataProvider = ({children}) => {
    const [genreData, setGenreData] = useState(null)

    //second
    const history = useHistory()

//second changed axios to axiosRes
  const handleMount = async () => {
    try {
      const {data} = await axiosRes.get('/genres')
      setGenreData(data.results)
      for ( const [key, value] of Object.entries(genreData)) {
        console.log(`${key}: ${value}`)
      }
    } catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    handleMount()
  }, []);


  //second
  

  return (
    <GenreDataContext.Provider value={genreData}>
      <SetGenreDataContext.Provider value={setGenreData}>
        {children}
      </SetGenreDataContext.Provider>
    </GenreDataContext.Provider>
  )
}