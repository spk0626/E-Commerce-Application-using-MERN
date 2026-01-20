import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './components/footer'
import Header from './components/header'
import HomeScreen from "./pages/HomeScreen";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/cartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import DeliveryPage from "./pages/DeliveryPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrdersPage from "./pages/ordersPage";


function App() {
  return (
    <Router>
      <Header/>
        <main className="my-3">
          <Container>
          <Routes>
            <Route path="/" Component={HomeScreen} exact />
            <Route path="/login" Component={LoginPage} />
            <Route path="/profile" Component={UserProfile}/>
            <Route path="/register" Component={RegisterPage}/>
            <Route path="/product/:id" Component={ProductDetails} />
            <Route path="/cart/:id?" Component={CartPage} />
            <Route path="/delivery" Component={DeliveryPage} />
            <Route path="/payment" Component={PaymentPage} />
            <Route path="/placeorder" Component={PlaceOrderPage} />
            <Route path="/order/:id" Component={OrdersPage}/>
          </Routes>
        </Container>
        </main>
      <Footer/> 
    </Router>
  );
}

export default App;
