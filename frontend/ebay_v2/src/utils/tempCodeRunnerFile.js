let  BASIC_HEADER = "HEADERRS"
let store = {token:"JLJLJKJLJL"}

const parametersFormater = (method, body=null) => {

    let headers = BASIC_HEADER

    if (store.token) {
        headers["Authorization"] = "token " + store.token
    }


    switch (method) {
        case "GET":
            return {method: method, headers:headers}


        case "PUT":
        case "UPDATE":
        case "POST":
            return {method: method, headers:headers, body:JSON.stringify(body)}

        default:
            return {};
    }
}


let obj = {id:1, title:"TEST", description:"description"}

console.log(parametersFormater("PUT", obj))