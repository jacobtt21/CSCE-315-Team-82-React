import "./App.css";
import NavBar from "./Manager/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Manager/Components/Home";
import { MenuItems } from "./Manager/Components/MenuItems/MenuItems";
import { Inventory } from "./Manager/Components/Inventory/Inventory";
import { ExtraFeatures } from "./Manager/Components/ExtraFeatures/Landing";
import { CustomerPage } from "./Manager/Components/Customer/CustomerPage";
import {ServerPage} from "./Manager/Components/Server/ServerPage";
import { Edit as MenuItemEdit } from "./Manager/Components/MenuItems/Edit";
import { EditInventory } from "./Manager/Components/Inventory/EditInventory";
import { New as MenuItemNew } from "./Manager/Components/MenuItems/New";

import { SalesReport } from "./Manager/Components/ExtraFeatures/SalesReport";
import { RestockReport } from "./Manager/Components/ExtraFeatures/RestockReport";
import { ExcessReport } from "./Manager/Components/ExtraFeatures/ExcessReport";
import { PairingsReport } from "./Manager/Components/ExtraFeatures/PairingsReport";

import { useEffect } from "react";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
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
}

export default App;
