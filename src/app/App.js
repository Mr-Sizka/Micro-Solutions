import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "common/components/Sidenav";
import theme from "assets/theme";
import routes from "common/navigation/routes";
import {useMaterialUIController, setMiniSidenav} from "context";
import DashboardNavbar from "common/components/DashboardNavbar";
import DashboardLayout from "common/layoutContainers/DashboardLayout";
import PageLayout from "common/layoutContainers/PageLayout";
import Footer from "common/components/Footer";
import { getItem, RemoveItem} from "common/utils/Storage/Storage";
import SignUp from "pages/sign-up";
import SignIn from "pages/sign-in";
import {pageLoading} from "config/images"
import "./style.css"

export default function App() {

  const [loading, setLoading] = useState(true);
  const [authentication, setAuthentication] = useState(false);

  setTimeout(function (){setLoading(false)}, 3000);

  useEffect(() => {
    const login = getItem("login-token");
    const remember = getItem("login-remember");
    if(login && remember){
      if(remember === "login-fail"){
        RemoveItem("login-remember");
      }
      setAuthentication(true);
    } else {
      setAuthentication(false);
    }
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
          <div className="loading-container">
            <img className="loader" src={pageLoading} alt="loading"/>
            <h4 className="">Loading...</h4>
          </div>
      ) : (
          <Main dashboard={authentication}/>
      )}
    </ThemeProvider>
  );
}

// main function
function Main({dashboard}) {

  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
      allRoutes.map((route) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      });

  return (
      <div>
        {dashboard ? (
            <div>
              <Sidenav
                  color={sidenavColor}
                  brandName="ADIYA"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
              />
              <DashboardLayout>
                <DashboardNavbar />
                <Routes>
                  {getRoutes(routes)}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
                <Footer />
              </DashboardLayout>
            </div>
        ) : (
            <PageLayout>
              <Routes>
                <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
                <Route exact path={"/authentication/sign-up"} element={<SignUp/>} key={'sign-up'}/>
                <Route exact path={"/authentication/sign-in"} element={<SignIn/>} key={'sign-in'}/>
              </Routes>
            </PageLayout>
        )}
      </div>
  )
}
