import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import MDBox from "common/components/MDBox";
import { useMaterialUIController, setLayout } from "context";

function PageLayout({ children }) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/authentication/sign-up" || pathname === "/authentication/sign-in") {
      setLayout(dispatch, "page");
    } else {
      setLayout(dispatch, "dashboard");
    }
  }, [pathname]);

  return (
    <MDBox width="100vw" height="100%" minHeight="100vh" sx={{ overflowX: "hidden" }}>
      {children}
    </MDBox>
  );
}

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
