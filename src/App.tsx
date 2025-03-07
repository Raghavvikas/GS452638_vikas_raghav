import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor, RootState } from "./store/store";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import StoresPage from "./pages/StoresPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import SKUsPage from "pages/SKUs/SKUsPage";
import "./App.css";
import storesData from "./stores.json";
import skuData from "./sku.json";
import { Button } from "react-bootstrap";
import { Store } from "types";
import { addStore, updateStore } from "./redux/storeSlice";
import ProtectedRoute from "components/ProtectedRoute";
import Dashboard from "pages/Dashboard";
import LoginForm from "pages/auth/LoginForm";
import { PersistGate } from "redux-persist/integration/react";
import { addSKU } from "./redux/skuSlice";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <MainApp />
        </Router>
      </PersistGate>
    </Provider>
  );
};

const MainApp: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const stores = storesData || []; // ✅ No Redux here; using static data
  const handleAdd = () => {
    if (location.pathname === "/stores") {
      // ✅ Adding new store
      const newStore = {
        id:Date.now(),
        seqNo: storesData.length + 1, // Ensure seqNo is incremented
        store: "",
        city: "",
        state: "",
      };
      dispatch(addStore(newStore));
    } else if (location.pathname === "/skus") {
      const newSku = {
        id:storesData.length + 1,
        sku: "",
        price: 0,
        cost: 0,
      };
      dispatch(addSKU(newSku));
    }
  };

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route
              path="/stores"
              element={<ProtectedRoute element={<StoresPage />} />}
            />
            <Route
              path="/skus"
              element={
                <ProtectedRoute element={<SKUsPage />} />
              }
            />
            <Route
              path="/planning"
              element={<ProtectedRoute element={<PlanningPage />} />}
            />
            <Route
              path="/chart"
              element={<ProtectedRoute element={<ChartPage />} />}
            />
            <Route
              path="/"
              element={<ProtectedRoute element={<Dashboard />} />}
            />

            {/* Define Login route */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
            />
          </Routes>
          {isAuthenticated &&
            ["/stores", "/skus"].includes(location.pathname) && (
              <div className="new-store-container">
                <Button className="new-store-btn" onClick={handleAdd}>
                  NEW {location.pathname === "/stores" ? "STORE" : "SKU"}
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;
