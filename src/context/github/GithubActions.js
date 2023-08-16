import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: GITHUB_TOKEN
    }
});

const search = async ({
    text, 
    allUsers = false, 
    getRepos = false
}) => {

    let query;
    let params;


    if (allUsers) params = new URLSearchParams({
        q: text
    });
    else if (getRepos) params = new URLSearchParams({
        sort: 'created_at',
        per_page: 10
    });
    

    if (allUsers) query = await github.get(`/search/users?${params}`);
    else if (getRepos) query = await github.get(`/users/${text}/repos?${params}`);
    else query = await github.get(`/users/${text}`);

    const response = allUsers ? query.data.items : query.data;

    if(!allUsers && response.status === 404){

        window.location = '/notfound';

    } else {

        return response;
    };
};

const searchUsers = async (text) => await search({text: text, allUsers: true});

const getUserAndRepos = async (login) => {

    const [user, repos] = await Promise.all([
        search({text: login}),
        search({text: login, getRepos: true})
    ]);

    return {
        user: user,
        repos: repos
    };
};

export {
    searchUsers,
    getUserAndRepos
};