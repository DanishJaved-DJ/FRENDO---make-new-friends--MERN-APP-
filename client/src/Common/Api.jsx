import { use } from "react";
import Signup from "../Pages/Signup";

const backendDomain = "http://localhost:3000/api/v1";

const Api = {
    
      Signup : {
        url : `${backendDomain}/users/signup`,
        method : 'POST'
      },
      Login : {
        url : `${backendDomain}/users/login`,
        method : 'POST'
      }
}

export default Api;