
import { BASIC_HEADER } from "../utils/APIConfig";
import {store} from "../store/store"



export const parametersFormater = (method, body=null) => {

    let headers = BASIC_HEADER

    if (store.token) {
        headers["Authorization"] = "token " + store.token
    }


    switch (method) {

        case "GET":
        case "DELETE":
            return {method: method, headers:headers}


        case "PUT":
        case "PATCH":
        case "POST":
            return {method: method, headers:headers, body:JSON.stringify(body)}

            
        default:
            return {};
    }
}
