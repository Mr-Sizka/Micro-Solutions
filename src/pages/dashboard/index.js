import Grid from "@mui/material/Grid";
import MDBox from "common/components/MDBox";

function Dashboard() {
  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <h1>Dashboard</h1>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Dashboard;
