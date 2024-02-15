import React, { useContext } from "react";
// import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../../pages/Login";
import { useSelector } from "react-redux";
// import { getUserStatus, getUsertoken } from "../../store/slices/userSlice";
// import TermsAndConditions from "../../pages/TermsAndConditions";
// import PrivacyPolicy from "../../pages/PrivacyPolicy";
import Spinner from "../Spinner";
import { context } from "../../context/context";
import Nav from "../Nav";
import Hero from "../TopSection";
import Cards from "../Cards";
import New from "../New";
import Landing from "../../pages/Landing";

const Layout = () => {
  const { isLoading } = useContext(context);
  // const status = useSelector("Admin");
  const status = "loadings";
  // const authtoken = useSelector(getUsertoken);
  const authtoken = "ABC";
  return (
    <>
      {status == "loading" || isLoading ? <Spinner /> : <></>}
      <div className={!authtoken ? "" : "wrapper"}>
        <BrowserRouter>
          {authtoken ? (
            <>
              {/* <Sidebar /> */}
              <div style={{ width: "100%" }}>
                {/* <Nav />
                <Hero />
                <Cards />
                <New /> */}
                <Landing/>
                <Routes>
                  <Route
                    path="*"
                    element={<Navigate to="/" />}
                  />
                  {/* <Route
                    path="/admin/terms-and-conditions"
                    exact
                    element={<TermsAndConditions />}
                  />
                  <Route
                    path="/admin/privacy-policy"
                    exact
                    element={<PrivacyPolicy />}
                  /> */}
                  {/* <Route path="/add-category" exact element={<AddCategory />} /> */}
                </Routes>
              </div>
            </>
          ) : (
            <>
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                {/* <Route path="/admin/" exact element={<Login />} /> */}
              </Routes>
            </>
          )}
        </BrowserRouter>
      </div>
    </>
  );
};

export default Layout;
