import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "components/header/Header";
import store from "redux/store";
import { Provider } from "react-redux";
import Home from "pages/Home";
import Footer from "components/footer/Footer";
import Register from "pages/Register";
import {
  HOME_LINK,
  LOGIN_LINK,
  PROFILE_LINK,
  REGISTER_LINK,
  RESET_PASSWORD_LINK,
  UPDATE_PASSWORD_LINK,
  VERIFY_CODE_LINK,
  HOTELS_LIST_LINK,
  ROOM_LINK,
  CHECKOUT_LINK,
  NOTIFICATIONS_LINK,
} from "constants/links";
import Login from "pages/Login";
import AppAlert from "components/common/AppAlert";
import VerifyCode from "pages/VerifyCode";
import ResetPasswordSendEmail from "pages/ResetPasswordSendEmail";
import ResetPassword from "pages/ResetPassword";
import Profile from "pages/Profile";
import PrivateRoute from "utils/PrivateRoute";
import { useEffect, useState } from "react";
import AuthService from "services/AuthService";
import UpdatePassword from "pages/UpdatePassword";
import HotelsListPage from "pages/HotelsListPage";
import HotelDetailsPage from "pages/HotelDetailsPage";
import RoomDetailsPage from "pages/RoomDetailsPage";
import CheckoutPage from "pages/CheckoutPage";
import AppLoader from "components/common/AppLoader";
import NotificationsPage from "pages/NotificationsPage";
import { Container } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = store.getState().auth.isAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      AuthService.refreshTokens().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <>
      {!loading ? (
        <Provider store={store}>
          <Router>
            <Routes>
              <Route exact path={HOME_LINK} element={<Header showSearch />} />
              <Route path="*" element={<Header />} />
            </Routes>
            <Container className="main-container" maxWidth="xl">
              <Routes>
                <Route path={HOME_LINK} element={<Home />} />
                <Route path={HOTELS_LIST_LINK} element={<HotelsListPage />} />
                <Route path={`${HOTELS_LIST_LINK}/:id`} element={<HotelDetailsPage />} />
                <Route path={`${HOTELS_LIST_LINK}/:id/${ROOM_LINK}/:roomId`} element={<RoomDetailsPage />} />
                <Route path={REGISTER_LINK} element={<Register />} />
                <Route path={LOGIN_LINK} element={<Login />} />
                <Route path={RESET_PASSWORD_LINK} element={<ResetPasswordSendEmail />} />
                <Route path={`${RESET_PASSWORD_LINK}/confirm/:token`} element={<ResetPassword />} />
                <Route
                  path={VERIFY_CODE_LINK}
                  element={
                    <PrivateRoute>
                      <VerifyCode />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={PROFILE_LINK}
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={UPDATE_PASSWORD_LINK}
                  element={
                    <PrivateRoute>
                      <UpdatePassword />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={CHECKOUT_LINK}
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={NOTIFICATIONS_LINK}
                  element={
                    <PrivateRoute>
                      <NotificationsPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Router>
          <AppAlert />
          <Footer />
        </Provider>
      ) : (
        <AppLoader open={loading} />
      )}
    </>
  );
}

export default App;
