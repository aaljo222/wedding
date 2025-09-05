// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header-and-footer/Header";
import Footer from "./components/header-and-footer/Footer";
import Home from "./pages/main/Home";
import InvitationCards from "./pages/invitation/InvitationCards";
import InvitationAdd from "./pages/invitation/InvitationAdd";
import InvitationList from "./pages/invitation/InvitationList";
import InvitationEdit from "./pages/invitation/InvitationEdit";
import FAQ from "./pages/faq/FAQ";
import InquiryPage from "./pages/faq/InquiryPage";
import Frame from "./pages/frame/Frame";
import Letter from "./pages/letter/Letter";
import Ticket from "./pages/ticket/Ticket";
import Review from "./pages/review/Review";
import CartList from "./pages/cart/CartList";
import OrderComplete from "./pages/cart/OrderComplete";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./features/auth/AuthContext";
import RequireAuth from "./pages/auth/RequireAuth";
import { CartProvider } from "./pages/invitation2/CartProvider";

const HEADER_HEIGHT = 60;

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        {/* ✅ index.js에서 감싸고 있다면 한쪽만 남기기 */}
        <Router>
          <Header />
          <main style={{ marginTop: `${HEADER_HEIGHT}px` }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/invitation-cards" element={<InvitationCards />} />
              <Route
                path="/invitation-edit/:ino"
                element={<InvitationEdit />}
              />
              <Route
                path="/invitation-add"
                element={
                  <RequireAuth>
                    <InvitationAdd />
                  </RequireAuth>
                }
              />
              <Route
                path="/invitation-list"
                element={
                  <RequireAuth>
                    <InvitationList />
                  </RequireAuth>
                }
              />
              <Route path="/cart-list" element={<CartList />} />
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="/review" element={<Review />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/faq-query" element={<InquiryPage />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/letter" element={<Letter />} />
              <Route path="/frame" element={<Frame />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
