import { Component } from "react";
import CategorySelectionBox from "./CategorySelectionBox";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { userSelector } from "../selectors/UserSelectors"
import { stateSelector } from "../selectors/StateSelectors"
import { durationSelector } from "../selectors/DurationSelectors"
import { categorySelector } from "../selectors/CategorySelectors"
import { fetchCreateObject } from "../thunks/ObjectThunk"
import { fetchDurations } from "../thunks/DurationThunk"
import { fetchStates } from "../thunks/StateThunk"
import { fetchCategories } from "../thunks/CategoryThunk"
import { fetchSubCategories } from "../thunks/SubCategoryThunk"
import { subCategorySelector } from "../selectors/SubCategorySelectors";

class ObjectForm extends Component {

    constructor(props) {
        super(props)

        // { !this.props.categories.loaded && this.props.fetchCategories() }

        if (this.props.object) {

            this.state = ({
                title: this.props.object.title,
                description: this.props.object.description,
                actualPrice: this.props.object.actualPrice,
                state: this.props.object.state,
                durationInDays: this.props.object.durationInDays,
                reservePrice: this.props.object.reservePrice,
                shippingPrice: this.props.object.shippingPrice,
                returnPolicy: this.props.object.returnPolicy,
                mainImage: this.props.object.mainImage,
                category: this.props.object.category,
                subcategory: this.props.object.subcategory,

                state_set: null,
                duration_set: null,

                redirection: 0,
                object_returned_id: null,

            })

        }

        else {
            this.state = ({
                title: '',
                description: '',
                actualPrice: "",
                state: "",
                durationInDays: "",
                reservePrice: "",
                shippingPrice: "",
                returnPolicy: "",
                mainImage: "",
                category: null,
                subcategory: null,

                img1: null,
                img2: null,
                img3: null,

                state_set: null,
                duration_set: null,

                confirmation_message: "",

            })
        }
    }

    handleCategoryChange = (e) => {

        this.setState({
            category: e.target.value
        })

        this.props.fetchSubCategories(e.target.value)
    }

    handleSubCategoryChange = (e) => {

        this.setState({
            subcategory: e.target.value
        })
    }

    handleImageChange = (e, index) => {

        switch (index) {
            case 1:
                this.setState({ img1: e.target })
                break;
            case 2:
                this.setState({ img2: e.target })
                break;
            case 3:
                this.setState({ img3: e.target })
                break;
        }

    }

    requestForSubmitForm(e) {

        e.preventDefault()

        if (!this.state.category && !this.state.subcategory) {
            this.setState({ confirmation_message: "Veuillez choisir une catégorie et sous catégorie" })
            return
        }

        this.props.fetchCreateObject(e.target)

    }


    base_fields = ["Titre", "Decription", "Prix de départ", "Etat", "Durée",
        "Prix de réserve", "Frais de port", "Image"]

    render() {

        if (this.state.redirection) {
            return <Redirect to={"/object/" + this.state.object_returned_id} />
        }
        return (
            <div className="main-sale-form">
                <h3>Mettre en vente :</h3>
                <form onSubmit={(e) => this.requestForSubmitForm(e)}>
                    <h2>Détail sur votre objet</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Titre</td>
                                <td className="main-sale-form__field">
                                    <input maxLength="50"
                                        name="title"
                                        onChange={e => this.setState({ title: e.target.value })}
                                        value={this.state.title} required>
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td className="main-sale-form__field">
                                    <textarea 
                                        className="main-sale-form__field__description"
                                        maxLength="1000"
                                        name="description"
                                        onChange={e => this.setState({ description: e.target.value })}
                                        value={this.state.description} required>
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Prix de Départ</td>
                                <td><input name="actualPrice"
                                    type="number"
                                    maxLength="20"
                                    placeholder='€'
                                    onChange={e => this.setState({ actualPrice: e.target.value })}
                                    value={this.state.actualPrice} className="int-field" required></input></td>
                            </tr>
                            <tr>
                                <td>Etat</td>
                                <td>
                                    <select name="state"
                                        onChange={e => this.setState({ state: e.target.value })}
                                        value={this.state.state} required>
                                        <option>-</option>
                                        {this.props.states.loaded && this.props.states.items.map((state) => {
                                            if (state.id == this.state.state) {

                                                return <option selected="selected" value={state.id}>{state.title}</option>
                                            }
                                            else {
                                                return <option value={state.id}>{state.title}</option>

                                            }

                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Durée</td>
                                <td>
                                    <select name="durationInDays"
                                        onChange={e => this.setState({ durationInDays: e.target.value })}
                                        value={this.state.duration} required>

                                        <option>-</option>
                                        {this.props.durations.loaded && this.props.durations.items.map((duration) => {

                                            if (duration.time == this.state.duration) {
                                                return <option selected="selected" value={duration.time}>{duration.time} jours</option>
                                            }

                                            else {
                                                return <option value={duration.id}>{duration.time} jours</option>
                                            }
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Prix de reserve</td>
                                <td><input name="reservePrice"
                                    maxLength="20" type="number"
                                    placeholder='€' name="reservePrice"
                                    onChange={e => this.setState({ reservePrice: e.target.value })}
                                    value={this.state.reservePrice} className="int-field" required>
                                </input>
                                </td>
                            </tr>
                            <tr>
                                <td>Frais de port</td>
                                <td><input maxLength="20" type="number"
                                    placeholder='€' name="shippingPrice"
                                    onChange={e => this.setState({ shippingPrice: e.target.value })}
                                    value={this.state.shippingPrice} className="int-field"
                                    required>
                                </input>
                                </td>

                            </tr>
                            <tr>
                                <td>Politique de retour</td>
                                <td><input maxLength="20" type="number"
                                    placeholder='€' name="returnPolicy"
                                    onChange={e => this.setState({ returnPolicy: e.target.checked })}
                                    value={this.state.returnPolicy} className="main-sale-form__int-field"
                                    type="checkbox">
                                </input>
                                    <p>(cocher pour accepter)</p>
                                </td>

                            </tr>
                            <tr>
                                <td>Image principale</td>
                                <td>
                                    <img className="main-sale-form__main-image" src={this.state.mainImage}></img>
                                    <input
                                        onChange={e => this.setState({ mainImage: e.target.files[0] })}
                                        name="mainImage"
                                        className="main-sale-form__field"
                                        type="file" required>
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <td>Image supplémentaire</td>
                                <td>
                                    <p><input onChange={e => this.handleImageChange(e, 1)} name="img1" type="file"></input></p>
                                    <p><input onChange={e => this.handleImageChange(e, 2)} name="img2" type="file"></input></p>
                                    <p><input onChange={e => this.handleImageChange(e, 3)} name="img3" type="file"></input></p>
                                </td>
                            </tr>
                            <tr>
                                <td>Categorie</td>
                                <td>
                                    <CategorySelectionBox categories={this.props.categories}
                                        handleChoiceChange={this.handleCategoryChange}
                                        categoryType="category"
                                        selected={this.state.category} />
                                </td>
                            </tr>
                            <tr>
                                <td>Sous-categorie</td>

                                <td>
                                    {this.state.category &&
                                        <CategorySelectionBox categories={this.props.subcategories}
                                            handleChoiceChange={this.handleSubCategoryChange}
                                            categoryId={this.state.category}
                                            categoryType="subcategory"
                                            selected={this.state.subcategory} />}
                                </td>
                            </tr>
                            <tr hidden>
                                <td>User</td>
                                <td>
                                    <input name="user" value={this.props.user.id}></input>
                                    <input name="isActive" value="1"></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="submit">Envoyer</button>
                    <p>{this.state.confirmation_message}</p>
                </form>
            </div>
        )
    }
}

// export const ObjectFormStore = connect(
//     (state) => ({

//         user: userSelector(state),
//         states: stateSelector(state),
//         durations: durationSelector(state),

//         categories: categorySelector(state),
//         subcategories: subCategorySelector(state)


//     }),
//     (dispatch) => ({
//         fetchStates: () => dispatch(fetchStates()),
//         fetchDurations: () => dispatch(fetchDurations()),
//         fetchCreateObject: (objectForm) => dispatch(fetchCreateObject(objectForm)),
//         fetchCategories: () => dispatch(fetchCategories()),
//         fetchSubCategories: (categoryId) => dispatch(fetchSubCategories(categoryId))
//     })
// )(ObjectForm)

ObjectForm.propTypes = {

    user: PropTypes.object.isRequired,

    categories: PropTypes.object.isRequired,

    states: PropTypes.object.isRequired,
    durations: PropTypes.object.isRequired,

    object: PropTypes.object,

}


export default ObjectForm