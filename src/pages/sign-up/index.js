import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "common/components/MDBox";
import MDTypography from "common/components/MDTypography";
import MDInput from "common/components/MDInput";
import MDButton from "common/components/MDButton";
import Grid from "@mui/material/Grid";

function Cover() {
  return (
    <MDBox mt={{ xs: 10, lg: 18 }} px={1} width="calc(100% - 2rem)" mx="auto">
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={-3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Join us today
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Enter your email and password to register
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="text" label="Name" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" variant="standard" fullWidth />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" variant="standard" fullWidth />
                </MDBox>
                <MDBox display="flex" alignItems="center" ml={-1}>
                  <Checkbox />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                  >
                    &nbsp;&nbsp;I agree the&nbsp;
                  </MDTypography>
                  <MDTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    color="info"
                    textGradient
                  >
                    Terms and Conditions
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="success" fullWidth>
                    sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
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

export default Cover;
