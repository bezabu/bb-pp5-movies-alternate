import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();


export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)


export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    //second
    const history = useHistory()

//second changed axios to axiosRes
  const handleMount = async () => {
    try {
      console.log('get current user')
      const {data} = await axiosRes.get('/dj-rest-auth/user/')
      setCurrentUser(data)
    } catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    handleMount()
  }, []);


  //second
  useMemo(() => {
    axiosReq.interceptors.request.use(
        async (config) => {
            try {
              console.log('attempt refresh')
                await axios.post('/dj-rest-auth/token/refresh/')
                
            } catch{
                setCurrentUser((prevCurrentUser) => {
                    if (prevCurrentUser) {
                        history.push('/signin')
                    }
                    return null
                })
                return config
            }
            return config
        },
        (err) => {
            return Promise.reject(err);
        }
    );



    axiosRes.interceptors.response.use(
        (response) => response,
        async (err) => {
            if (err.response?.status === 401){
                try{
                  console.log('attempt refresh')
                    await axios.post('/dj-rest-auth/token/refresh/')
                } catch(err){
                    setCurrentUser(prevCurrentUser => {
                        if (prevCurrentUser){
                            history.push('/signin')
                        }
                        return null
                    })
                }
                return axios(err.config)
            }
            return Promise.reject(err)
        }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}