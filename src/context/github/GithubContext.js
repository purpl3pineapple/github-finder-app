import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {

    const init = {
        users: [],
        user: {},
        loading: false
    };

    const [state, dispatch] = useReducer(githubReducer, init);
    const setLoading = () => dispatch({type: 'SET_LOADING'});
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'});

    const search = async (text, allUsers = false) => {

        setLoading();

        const params = new URLSearchParams({
            q: text
        });

        const response = await fetch(
            allUsers 
            ? `${GITHUB_URL}/search/users?${params}`
            : `${GITHUB_URL}/users/${text}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        if(!allUsers && response.status === 404){

            window.location = '/notfound';

        } else {

            if(allUsers){

                const {items} = await response.json();

                dispatch({
                    type: 'GET_USERS',
                    payload: items
                });

            } else {

                const data = await response.json();

                dispatch({
                    type: 'GET_USER',
                    payload: data
                });

            };
        };
    };

    const searchUsers = (text) => search(text, true);
    const getUser = (text) => search(text);


    return (
        <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            isLoading: state.isLoading,
            getUser: getUser,
            searchUsers: searchUsers,
            clearUsers: clearUsers
        }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;