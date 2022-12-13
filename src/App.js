import "./App.css";
import NavBar from "./Manager/Navbar";
import GuestNavBar from "./Manager/GuestNavBar";
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
import { NewInventory as InventoryNew } from "./Manager/Components/Inventory/NewInventory";
import { New as MenuItemNew } from "./Manager/Components/MenuItems/New";
import { useEffect, useState } from "react";

import { SalesReport } from "./Manager/Components/ExtraFeatures/SalesReport";
import { RestockReport } from "./Manager/Components/ExtraFeatures/RestockReport";
import { ExcessReport } from "./Manager/Components/ExtraFeatures/ExcessReport";
import { PairingsReport } from "./Manager/Components/ExtraFeatures/PairingsReport";

import { useGlobalState } from "./state";
import { isExpired } from "react-jwt";

function App() {
// Establish google translate
  const [authenticated, setAuthenticated] = useGlobalState('authenticated');
  const [guest_authenticated, setGuestAuthenticated] = useGlobalState('guest_authenticated');
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [dyslexiaMode, setDysledyslexiaMode] = useState(false);

  useEffect(() => {

    var jwt = localStorage.getItem("jwt");
    var highContrast = localStorage.getItem("highContrast");
    var dyslexia = localStorage.getItem("dyslexia");

    // authentication setup
    if (!jwt || isExpired(jwt)) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }

    if (highContrast === "true") {
      setHighContrastMode(true);
    } else {
      localStorage.setItem("highContrast", "false");
    }

    if (dyslexia === "true") {
      setDysledyslexiaMode(true);
    } else {
      localStorage.setItem("dyslexia", "false");
    }

    window.addEventListener('storage', () => {
      var highContrast = localStorage.getItem("highContrast");
      var dyslexia = localStorage.getItem("dyslexia");

      if (highContrast === "true") {
        setHighContrastMode(true);
      } else {
        setHighContrastMode(false);
      }

      if (dyslexia === "true") {
        setDysledyslexiaMode(true);
      } else {
        setDysledyslexiaMode(false);
      }
    });

  }, []);
  // Create Page
  if (authenticated && !guest_authenticated) {
    console.log("yay regular login")

    return (
      <>
        <Router>
          <div className={(dyslexiaMode ? "dyslexia-mode" : "") + " " + (highContrastMode ? "high-contrast-mode" : "")}>
            <NavBar />
            <div id="pages">
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
                <Route exact path= "/Inventory/new" component={InventoryNew} />
                <Route exact path = "/ServerPage" component={ServerPage}/>
                <Route exact path = "/ExtraFeatures/SalesReport" component={SalesReport}/>
                <Route exact path = "/ExtraFeatures/RestockReport" component={RestockReport}/>
                <Route exact path = "/ExtraFeatures/ExcessReport" component={ExcessReport}/>
                <Route exact path = "/ExtraFeatures/PairingsReport" component={PairingsReport}/>
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );
  } 
  else if (guest_authenticated && authenticated) {
    return (
      <>
        <Router>
          <div className={(dyslexiaMode ? "dyslexia-mode" : "") + " " + (highContrastMode ? "high-contrast-mode" : "")}>
            <GuestNavBar />
            <div id="pages">
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
                <Route exact path= "/Inventory/new" component={InventoryNew} />
                <Route exact path = "/ServerPage" component={ServerPage}/>
                <Route exact path = "/ExtraFeatures/SalesReport" component={SalesReport}/>
                <Route exact path = "/ExtraFeatures/RestockReport" component={RestockReport}/>
                <Route exact path = "/ExtraFeatures/ExcessReport" component={ExcessReport}/>
                <Route exact path = "/ExtraFeatures/PairingsReport" component={PairingsReport}/>
              </Switch>
            </div>
          </div>
        </Router>
      </>
    );  
  } 
  else {
    return (
      <>
        <Router>
        <div id="pages" className={(dyslexiaMode ? "dyslexia-mode" : "") + " " + (highContrastMode ? "high-contrast-mode" : "")}>
            <Welcome />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
