import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  // const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#050BE6",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80px",
      }}
    >
      {/* <div onClick={() => navigate("/")}> */}
      <Typography style={{ fontSize: "30px", fontWeight: 700 }}>
        Angelcam
      </Typography>
      {/* </div> */}
    </Box>
  );
};

export default Header;
