import "./App.css";
import NavBar from "./Manager/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Manager/Components/Home";
import { MenuItems } from "./Manager/Components/MenuItems/MenuItems";
import { Inventory } from "./Manager/Components/Inventory/Inventory";
import { ExtraFeatures } from "./Manager/Components/ExtraFeatures";
import { CustomerPage } from "./Manager/Components/Customer/CustomerPage";
import {ServerPage} from "./Manager/Components/Server/ServerPage";
import { Edit as MenuItemEdit } from "./Manager/Components/MenuItems/Edit";
import { EditInventory } from "./Manager/Components/Inventory/EditInventory";
import { New as MenuItemNew } from "./Manager/Components/MenuItems/New";
import { useEffect } from "react";

function App() {
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
  }, []);
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <div id="google_translate_element"></div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path= "/MenuItems" component={MenuItems} />
            <Route path= "/Inventory" component={Inventory} />
            <Route path= "/ExtraFeatures" component={ExtraFeatures} />
            <Route path= "/CustomerPage" component={CustomerPage} />
            <Route exact path= "/MenuItems/:id/edit" component={MenuItemEdit} />
            <Route exact path= "/MenuItems/new" component={MenuItemNew} />
            <Route exact path= "/InventoryItems/:id/edit" component={EditInventory} />
            <Route exact path = "/ServerPage" component={ServerPage}/>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
