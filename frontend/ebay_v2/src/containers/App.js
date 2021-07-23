import Header from "../components/Header";
import Home from "../pages/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import {Provider, connect} from "react-redux"

import {store} from "../store/store"

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

        </div>

      </Router>

    </Provider>
  );
}

export default App;
