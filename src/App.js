import "./App.css";
import NavBar from "./Manager/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Manager/Components/Home";
import { Welcome } from "./Manager/Components/Welcome";
import { MenuItems } from "./Manager/Components/MenuItems/MenuItems";
import { Inventory } from "./Manager/Components/Inventory/Inventory";
import { ExtraFeatures } from "./Manager/Components/ExtraFeatures/Landing";
import { CustomerPage } from "./Manager/Components/Customer/CustomerPage";
import {ServerPage} from "./Manager/Components/Server/ServerPage";
import { Edit as MenuItemEdit } from "./Manager/Components/MenuItems/Edit";
import { EditInventory } from "./Manager/Components/Inventory/EditInventory";
import { New as MenuItemNew } from "./Manager/Components/MenuItems/New";
import { useEffect } from "react";

import { SalesReport } from "./Manager/Components/ExtraFeatures/SalesReport";
import { RestockReport } from "./Manager/Components/ExtraFeatures/RestockReport";
import { ExcessReport } from "./Manager/Components/ExtraFeatures/ExcessReport";
import { PairingsReport } from "./Manager/Components/ExtraFeatures/PairingsReport";

import { useGlobalState } from "./state";
import { isExpired } from "react-jwt";

function App() {

  const [authenticated, setAuthenticated] = useGlobalState('authenticated');

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    var jwt = localStorage.getItem("jwt");

    if (!jwt || isExpired(jwt)) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }

  }, []);

  if (authenticated) {
    return (
      <>
        <Router>
          <NavBar />
          <div className="pages">
            <div id="google_translate_element"></div>
            <Switch>
            <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path= "/MenuItems" component={MenuItems} />
              <Route exact path= "/Inventory" component={Inventory} />
              <Route exact path= "/ExtraFeatures" component={ExtraFeatures} />
              <Route exact path= "/CustomerPage" component={CustomerPage} />
              <Route exact path= "/MenuItems/:id/edit" component={MenuItemEdit} />
              <Route exact path= "/MenuItems/new" component={MenuItemNew} />
              <Route exact path= "/InventoryItems/:id/edit" component={EditInventory} />
              <Route exact path = "/ServerPage" component={ServerPage}/>
              <Route exact path = "/ExtraFeatures/SalesReport" component={SalesReport}/>
              <Route exact path = "/ExtraFeatures/RestockReport" component={RestockReport}/>
              <Route exact path = "/ExtraFeatures/ExcessReport" component={ExcessReport}/>
              <Route exact path = "/ExtraFeatures/PairingsReport" component={PairingsReport}/>
            </Switch>
          </div>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <div className="pages">
            <div id="google_translate_element"></div>
            <Welcome />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
