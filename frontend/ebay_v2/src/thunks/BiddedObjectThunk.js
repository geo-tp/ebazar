// import { getBiddedObjects, getBiddedObjectsError, getBiddedObjectsSuccess } from "../actions/ObjectActions"
// import { urlFormater } from "../utils/urlFormater"


// export const fetchBiddedObjects = (userId) => {
//     return (dispatch) => {
//         dispatch(getBiddedObjects())

//         let url = urlFormater(
//                         {model: "object",
//                          filter_fields: ['user', "isBidded"],
//                          filter_values: [userId, 1]}
//         )

//         let parameters = parametersFormater("GET")

//         return fetch(url, parameters)
//                     .then(rslt => {
//                         if (!rslt.ok) {
//                             throw new Error(NOT_FOUND)
//                         }

//                         return rslt.json()
//                     })

//                     .then((objects) => {
//                         dispatch(getBiddedObjectsSuccess(objects))
//                     })

//                     .catch((error) => {
//                         console.log(error)
//                         dispatch(getBiddedObjectsError(error))
//                     })
//     }
// }