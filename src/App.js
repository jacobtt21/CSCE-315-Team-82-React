import "./App.css";
import NavBar from "./Manager/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Manager/Components/Home";
import { MenuItems } from "./Manager/Components/MenuItems";
import { Inventory } from "./Manager/Components/Inventory";
import { ExtraFeatures } from "./Manager/Components/ExtraFeatures";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path= "/MenuItems" component={MenuItems} />
            <Route path= "/Inventory" component={Inventory} />
            <Route path= "/ExtraFeatures" component={ExtraFeatures} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;