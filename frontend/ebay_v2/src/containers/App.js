import Header from "../components/Header";
import Home from "../containers/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



import Footer from "../components/Footer";
import CategoryStore from "../containers/Category";
import DetailStore from "../containers/Detail";
import Account from "../containers/Account";

function App() {

  return (

    <Router>
      <div className="App">
        
        <Header/>

        <Switch>

          <Route path="/home">
            <Home/>
          </Route>

          <Route path="/category/:categoryId">
            <CategoryStore/>
          </Route>

          <Route path="/detail/:objectId">
            <DetailStore/>
          </Route>

          <Route path="/auth">
            <Account/>
          </Route>
        </Switch>

        <Footer/>

      </div>


    </Router>

  );
}

export default App;
