import { createContext } from 'react';
import { useCookies } from 'react-cookie';
import { createTheme } from '@mui/material/styles';

export const AppContext = createContext(null);

const baseURL = 'http://localhost:3001/'

const AppContextProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['username'])


    const post = (url, data) => {
        console.log(data)
        fetch(baseURL + url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    };

    const patch = (url, data) => {
        fetch(baseURL + url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    };

    const deletion = (url) => {
        fetch(baseURL + url, {
            method: 'DELETE'
        });
    };

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
    });

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }; 

      const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }; 

      const style3 = {
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 6,
      }; 


    const objValue = {
        post,
        patch,
        deletion,
        cookies,
        setCookie,
        removeCookie,
        darkTheme,
        style1,
        style2,
        style3
    };

    return (
        <AppContext.Provider value={objValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;