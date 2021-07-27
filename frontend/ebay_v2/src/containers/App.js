import Header from "../components/Header";
import Home from "../pages/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import {Provider} from "react-redux"

import {store} from "../store/store"
import Footer from "../components/Footer";

function App() {

  return (
    <Provider store={store}>

      <Router>
        <div className="App">
          
          <Header/>

          <Switch>

            <Route path="/home">
              <Home/>
            </Route>

          </Switch>

          <Footer/>

        </div>


      </Router>

    </Provider>
  );
}

export default App;
