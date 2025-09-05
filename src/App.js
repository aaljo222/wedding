// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header-and-footer/Header";
import Footer from "./components/header-and-footer/Footer";

import Home from "./pages/main/Home";

// invitation
import InvitationCards from "./pages/invitation/InvitationCards";
import InvitationAdd from "./pages/invitation/InvitationAdd";
import InvitationList from "./pages/invitation/InvitationList";
import InvitationEdit from "./pages/invitation/InvitationEdit";

// etc
import FAQ from "./pages/faq/FAQ";
import InquiryPage from "./pages/faq/InquiryPage";
import Frame from "./pages/frame/Frame";
import Letter from "./pages/letter/Letter";
import Ticket from "./pages/ticket/Ticket";
import CustomerReview from "./pages/review/CustomerReview";
import CartList from "./pages/cart/CartList";
import OrderComplete from "./pages/cart/OrderComplete";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import { AuthProvider } from "./features/auth/AuthContext";
import RequireAuth from "./pages/auth/RequireAuth";
import { CartProvider } from "./pages/invitation/CartProvider";

const HEADER_HEIGHT = 60;

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main style={{ marginTop: `${HEADER_HEIGHT}px` }}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Invitation (신규 경로) */}
              <Route path="/invitation-cards" element={<InvitationCards />} />
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
              <Route
                path="/invitation-edit/:ino"
                element={<InvitationEdit />}
              />

              {/* Invitation (구 경로 호환) */}
              <Route path="/InvitationCards" element={<InvitationCards />} />
              <Route
                path="/InvitationAdd"
                element={
                  <RequireAuth>
                    <InvitationAdd />
                  </RequireAuth>
                }
              />
              <Route
                path="/InvitationList"
                element={
                  <RequireAuth>
                    <InvitationList />
                  </RequireAuth>
                }
              />
              <Route path="/InvitationEdit/:ino" element={<InvitationEdit />} />

              {/* Cart (신규/구 경로) */}
              <Route path="/cart-list" element={<CartList />} />
              <Route path="/CartList" element={<CartList />} />

              {/* OrderComplete (신규/구 경로) */}
              <Route path="/order-complete" element={<OrderComplete />} />
              <Route path="/OrderComplete" element={<OrderComplete />} />
              <Route path="/orderComplete" element={<OrderComplete />} />

              {/* Review (신규/구 경로) */}
              <Route path="/review" element={<CustomerReview />} />
              <Route path="/Review" element={<CustomerReview />} />

              {/* FAQ (신규/구 경로) */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/FAQ" element={<FAQ />} />

              {/* FAQ 문의 (신규/구 경로) */}
              <Route path="/faq-query" element={<InquiryPage />} />
              <Route path="/FAQquery" element={<InquiryPage />} />
              <Route path="/FAQQuery" element={<InquiryPage />} />

              {/* 기타 (신규/구 경로) */}
              <Route path="/ticket" element={<Ticket />} />
              <Route path="/Ticket" element={<Ticket />} />

              <Route path="/letter" element={<Letter />} />
              <Route path="/Letter" element={<Letter />} />

              <Route path="/frame" element={<Frame />} />
              <Route path="/Frame" element={<Frame />} />

              {/* Auth (신규/구 경로) */}
              <Route path="/register" element={<Register />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Login" element={<Login />} />

              {/* 혹시 모르는 낙오 경로들 간단 리다이렉트(선택) */}
              <Route
                path="/cartList"
                element={<Navigate to="/cart-list" replace />}
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
