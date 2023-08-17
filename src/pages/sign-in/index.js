import { useState } from "react";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "common/components/MDBox";
import MDTypography from "common/components/MDTypography";
import MDInput from "common/components/MDInput";
import MDButton from "common/components/MDButton";
import Swal from "sweetalert2";
import {setItem} from "common/utils/Storage/Storage";
import instance from "common/axios/AxiosOrders";

// Toast sweetalert message
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function Basic() {

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const loginAction = () => {
    instance.post('/login', {
      "email": email,
      "password": password,
    }, {
      headers: {
        'Content-Type': 'application/json;'
      }
    }).then(function (res) {
        if(rememberMe){
          setItem("login-remember", "login");
        }else {
          setItem("login-remember", "login-fail");
        }
      setItem("login-token", res.data.token);
      window.location.reload();
    })
        .catch(function (error) {
          Toast.fire({
            icon: 'error',
            title: 'Invalid username or password'
          });
        });
  }

  return (
    <MDBox px={1} width="100%" height="100vh" mx="auto">
      <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign in
              </MDTypography>
              <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <FacebookIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <GitHubIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <GoogleIcon color="inherit" />
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                      type="email"
                      label="Email"
                      fullWidth
                      onChange={(val)=> {setEmail(val.target.value)}}
                      value={email}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                      type="password"
                      label="Password"
                      fullWidth
                      onChange={(val)=> {setPassword(val.target.value)}}
                      value={password}
                  />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="success" fullWidth
                            onClick={()=> {loginAction()}}>
                    sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Basic;
