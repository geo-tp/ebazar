import { Component } from "react";

import PropTypes from "prop-types"


class SearchForm extends Component {

    constructor(props) {
        super(props)
         
        this.state = {
            category: false,
            query: this.props.query,
            freeShipping: false,
            EndedObjects: false,
        }

        {this.props.query && 
            this.props.fetchObjects(
                {
                    filter_fields: [],
                    filter_values: [],
                    search: this.props.query}
                )}
    }

    handleSearchBarChange(e) {

        let text = e.target.value

        while (text.includes(" ")) {
            text = text.replace(" ", "+")
        }
        this.setState({query: e.target.value})
    }

    handleEnterPressed(e) {
        if (e.keyCode === 13) {
            this.handleSearchClick()
        }
    }

    handleSearchClick() {

        let fields = []
        let values = []

        if (this.state.category) {
            fields.push("category")
            values.push(this.state.category)
        }


         if (this.state.freeShipping) { 
            fields.push("shippingPrice");
            values.push("0")
        }


        if (this.state.EndedObjects) { 
            fields.push("isActive")
            values.push("0")
        }

        this.props.fetchObjects(
                {
                    filter_fields: fields,
                    filter_values: values,
                    search: this.state.query,
                }
        
        )
            
    }


    render() {

        return(
            <div className="main-search-form">
                <h3>Recherche</h3>

                <input className="main-search-form__search-bar"
                       onChange={(e) => this.handleSearchBarChange(e)}
                       onKeyDown={(e) => this.handleEnterPressed(e)}
                       placeholder="Iphone, PS5, Tshirt..."
                       value={this.state.query}>
               </input>

                <select name="categories"
                        onChange={e => this.setState({category: e.target.value})}>
                        <option>Tout</option>
                        {this.props.categories.loaded && this.props.categories.items.map((categories) => {
                                return <option value={categories.id}>{categories.title}</option>
                            }

                        )}

                </select>

                <div className="main-search-form__checkbox">
                    <div>
                        <input onClick={() => this.setState({EndedObjects: !this.state.EndedObjects })} 
                               type="checkbox"></input>
                        <label>Ventes terminées</label>
                    </div>
                    <div>
                        <input onClick={() => this.setState({freeShipping: !this.state.freeShipping })}
                               type="checkbox"></input>
                        <label>Livraison gratuite</label>
                    </div>
                </div>
                <div className="main-search-form__button">
                    <button onClick={() => this.handleSearchClick()}>Rechercher</button>
                </div>
            </div>
        )
    }
}

SearchForm.propTypes = {
    categories: PropTypes.object.isRequired
}

export default SearchForm