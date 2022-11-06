import "./App.css";
import NavBar from "./Manager/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Manager/Components/Home";
import { MenuItems } from "./Manager/Components/MenuItems/MenuItems";
import { Inventory } from "./Manager/Components/Inventory";
import { ExtraFeatures } from "./Manager/Components/ExtraFeatures";
import { CustomerPage } from "./Manager/Components/Customer/CustomerPage";
import {Server} from "./Manager/Components/Server/Server";
import { Edit as MenuItemEdit } from "./Manager/Components/MenuItems/Edit";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path= "/MenuItems" component={MenuItems} />
            <Route path= "/Inventory" component={Inventory} />
            <Route path= "/ExtraFeatures" component={ExtraFeatures} />
            <Route path= "/CustomerPage" component={CustomerPage} />
            <Route exact path= "/MenuItems/:id" component={MenuItemEdit} />
            <Route exact path = "/Server" component={Server}/>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
