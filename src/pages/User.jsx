import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";


const User = () => {

    const {getUser, user} = useContext(GithubContext);
    const params = useParams();

    useEffect(() => {
        getUser(params.login);
        //getUserRepos(params.login)
    }, []);

  return (
    <div>
      USER
    </div>
  );
};

export default User;
