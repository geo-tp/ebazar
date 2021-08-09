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



function App() {

  return (

    <Router>
      <div className="App">
        
        <HeaderContainer/>

        <Switch>

          <Route path="/home">
            <HomePage/>
          </Route>

          <Route path="/sell">
            <SellPage/>
          </Route>

          <Route path={["/search/:query", "/search"]}>
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
            <AccountPage/>
          </Route>

        </Switch>

        <CookieBannerContainer/>

        <Footer/>

      </div>


    </Router>

  );
}

export default App;
