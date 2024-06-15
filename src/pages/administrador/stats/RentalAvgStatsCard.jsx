import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import clsx from "clsx";

const cardStyles = {
  card: {
    width: 250,
    height: 250,
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  content: {
    padding: "16px",
    borderTop: "1px solid #e0e0e0",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: "8px",
    color: "#212121",
  },
  total: {
    color: "#757575",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  icon: {
    fontSize: 50,
    color: "#3f51b5",
  },
};

const RentalAvgStatsCard = ({ icon, title, rentalAvg }) => {
  return (
    <Card className={clsx("rental-avg-stats-card", cardStyles.card)}>
      <CardContent
        className={clsx("rental-avg-stats-content", cardStyles.content)}
      >
        <Box
          className={clsx(
            "rental-avg-stats-icon-container",
            cardStyles.iconContainer
          )}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Box className={clsx("rental-avg-stats-icon", cardStyles.icon)}>
                {icon}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h6"
            component="h2"
            className={clsx("rental-avg-stats-title", cardStyles.title)}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className={clsx("rental-avg-stats-total", cardStyles.total)}
          >
            Promedio de Alquiler: ${rentalAvg.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RentalAvgStatsCard;
