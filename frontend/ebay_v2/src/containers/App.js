import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import HeaderContainer from "./HeaderContainer";
import HomePage from "./HomePage"
import Footer from "../components/Footer";
import CategoryPage from "./CategoryPage";
import DetailPage from "./DetailPage";
import AccountPage from "./AccountPage";
import CookieBannerContainer from "./CookieBannerContainer";
import SellPage from "./SellPage";
import AuthPage from "./AuthPage";
import SearchPage from "./SearchPage";
import UserPage from "./UserPage";
import { retrieveUserData } from "../utils/cookieHandler";

import MessagingPage from "./MessagingPage";
import SelledPage from "./SelledPage";
import PurchasedPage from "./PurchasedPage";
import ChoicePage from "./ChoicePage";
import SoldePage from "./SoldePage";
import HelpPage from "./HelpPage";



function App() {

  retrieveUserData()

  return (

    <Router>
      <div className="App">
        
        <HeaderContainer/>

        <Switch>

          <Route path="/home">
            <HomePage/>
          </Route>

          <Route path="/choice/:choice">
            <ChoicePage/>
          </Route>

          <Route path="/user/:username">
            <UserPage/>
          </Route>

          <Route path="/sell">
            <SellPage/>
          </Route>

          <Route path="/selled">
            <SelledPage/>
          </Route>

          <Route path="/purchased">
            <PurchasedPage/>
          </Route>

          <Route path="/solde">
            <SoldePage/>
          </Route>

          <Route path={["/messaging/:dataSet/:dataIndex", "/messaging"]}>
            <MessagingPage/>
          </Route>

          <Route path={["/search/:query", "/search/"]}>
            <SearchPage/>
          </Route>

          <Route path="/category/:categoryId">
            <CategoryPage/>
          </Route>

          <Route path="/detail/:objectId">
            <DetailPage/>
          </Route>

          <Route path="/auth">
            <AuthPage/>
          </Route>

          <Route path="/account">
            <AccountPage />
          </Route>

          <Route path="/account">
            <AccountPage/>
          </Route>

          <Route path="/Help">
            <HelpPage/>
          </Route>

        </Switch>

        <CookieBannerContainer/>

        <Footer/>

      </div>


    </Router>

  );
}

export default App;
