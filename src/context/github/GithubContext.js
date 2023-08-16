import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {

    const init = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] = useReducer(githubReducer, init);

    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch
        }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;