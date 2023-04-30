import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "components/header/Header";
import store from "redux/store";
import { Provider } from "react-redux";
import Home from "pages/Home";
import Footer from "components/footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Header showSearch />} />
          <Route path="*" element={<Header />} />
        </Routes>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
