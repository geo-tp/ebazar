import { API_URL } from "./APIConfig"

export function urlFormater(kwargs) {

    let counter = 0

    let request = API_URL + kwargs["model"] + "/"

    if (kwargs['pk']) {
        return request+kwargs['pk']+"/"
    }

    if (kwargs["search"]) {
        return request+"?search="+kwargs['search']
    }

    if (kwargs["filter_field"]) {
        request += "?"+kwargs['filter_field']+"="+kwargs["filter_value"]
        counter +=1
    }


    if (kwargs["filter_fields"]) {

        let values = kwargs['filter_values']
        let fields = kwargs["filter_fields"]
        
        for (let i = 0 ; i < values.length ; i++) {

            if (i == 0) {
                request += '?'
            }

            request += fields[i]+"="+values[i]
            counter +=1

            if (i+1 != values.length) {
                request += '&'
            }
        }

    }

    if (kwargs["ordering"]) {

        let char;

        if (counter) {
            char = "&"
        }

        else{
            char = '?'
        }
        request += char+"ordering="+kwargs["ordering"]
    }

    return request

}
