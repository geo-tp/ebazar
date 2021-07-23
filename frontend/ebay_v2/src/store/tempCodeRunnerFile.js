
function initialState() {
    
    const storeFields = ["objects", "offerBanners", "categories"]

    let store = {}
    for (let field of storeFields) {
        store[field] = {

            loading: false,
            error: false,
            loaded: false,
    
            items: {}
        }
    }

    return {store:store}
}

console.log(initialState())