import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDBox from "common/components/MDBox";
import {
  navbar,
  navbarButtonContainer,
  navbarContainer,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
  navbarSearchField,
} from "common/components/DashboardNavbar/styles";
import {setMiniSidenav, setTransparentNavbar, useMaterialUIController} from "context";
import MDButton from "common/components/MDButton";
import {RemoveItem} from "common/utils/Storage/Storage";
import Typography from "@mui/material/Typography";
import {MailOutlined, NotificationsOutlined, Search} from "@mui/icons-material";
import {Input} from "@mui/material";
import Badge from "@mui/material/Badge";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

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
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <MDButton
        component="a"
        onClick={()=> {
          RemoveItem("login-token");
          RemoveItem("login-remember");
          window.location.reload();
        }}
        rel="noreferrer"
        variant="gradient"
        color="error"
        fullWidth
      >
        Logout
      </MDButton>
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text, micro }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="info"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                size="large"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
            </MDBox>{windowDimensions.width>680? <><IconButton sx={navbarIconButton} size="large" disableRipple onClick={handleOpenMenu}>
            <Icon sx={iconsStyle} fontSize="large">account_circle</Icon>
          </IconButton>
            <MDBox>
              <Typography fontSize={"large"} fontWeight={700} lineHeight={0.8} sx={{marginTop:"8px"}}>Jeewantha</Typography>
              <Typography fontSize={"small"} color={"secondary"}>Admin</Typography>
            </MDBox></>:<></>
          }
          <MDBox sx={navbarButtonContainer}>
            {windowDimensions.width>680? <MDBox sx={navbarSearchField}>
              <Search fontSize={"medium"}/>
              <Input
                  sx={{'&:after': {
                      borderBottom: `2px solid #8EB53E`,
                    }}}
                  placeholder={"Search"}
                  variant={"standard"}
              ></Input>
            </MDBox>:<></>}
            <IconButton sx={navbarIconButton} size={windowDimensions.width>680? "large":"medium"}>
              <Badge color="error" overlap="circular" badgeContent="1"><NotificationsOutlined/></Badge>
            </IconButton>
            <IconButton sx={navbarIconButton} size={windowDimensions.width>680? "large":"medium"}>
              <Badge color="error" size={"small"} overlap="circular" badgeContent="1"><MailOutlined /></Badge>
            </IconButton>
          </MDBox>
          </MDBox>
        )}


      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
