import {useEffect, useState} from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import MDBox from "common/components/MDBox";
import MDTypography from "common/components/MDTypography";
import SidenavCollapse from "common/components/Sidenav/SidenavCollapse";
import SidenavRoot from "common/components/Sidenav/SidenavRoot";
import sidenavLogoLabel from "common/components/Sidenav/styles/sidenav";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import {navLogo} from "../../../config/images";
import IconButton from "@mui/material/IconButton";
import {navbarIconButton} from "../DashboardNavbar/styles";
import Typography from "@mui/material/Typography";
import {RemoveItem} from "../../utils/Storage/Storage";
import MDButton from "../MDButton";
import {InfoRounded, Logout} from "@mui/icons-material";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [windowDimensions]);

  function getWindowDimensions() {
    const {
      innerWidth: width,
      innerHeight: height
    } = window;
    return {
      width,
      height
    };
  }

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center" sx={{height: windowDimensions.width>=680?"20vh":"30vh"}}>
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox sx={{width:"100%",height:"100px"}} >
          <img src={navLogo} style={{"width": "100%"}}  alt=""/>
        </MDBox>
        {windowDimensions.width<=680? <MDBox sx={{display:"flex"}}><IconButton sx={navbarIconButton} size="large" disableRipple >
          <Icon  fontSize="large">account_circle</Icon>
        </IconButton>
          <MDBox sx={{paddingTop:"10px"}}>
            <Typography fontSize={"large"} fontWeight={700} lineHeight={0.8} sx={{marginTop:"8px"}}>Jeewantha</Typography>
            <Typography fontSize={"x-small"} color={"secondary"} sx={{textAlign:"left"}}>Admin</Typography>
          </MDBox></MDBox>:<></>
        }
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider sx={{height:"3px"}} />
      <List sx={{height:'60vh',overflow:"auto"}}>{renderRoutes}</List>
      <MDBox sx={{height:'20vh',display:'flex',flexDirection:"column",justifyContent:"end",alignItems:'center'}} pb={2}>
      <Divider sx={{height:"3px"}}/>
        <MDButton
            variant="text"
            color={"secondary"}
            sx={{background:'none',border:'none'}}
        >
          <InfoRounded/>
          Information
        </MDButton>
        <MDButton
            onClick={()=> {
              RemoveItem("login-token");
              RemoveItem("login-remember");
              window.location.reload();
            }}
            rel="noreferrer"
            variant="text"
            color={"error"}
            sx={{background:'none',border:'none'}}
        >
          <Logout/>
          Logout
        </MDButton>
      </MDBox>

    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default Sidenav;
