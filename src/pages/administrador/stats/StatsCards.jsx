import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import clsx from "clsx";

const cardStyles = {
  card: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
    borderRadius: "16px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "24px",
  },
  icon: {
    fontSize: 64,
    color: "#3f51b5",
  },
  content: {
    padding: "16px",
    borderTop: "1px solid #e0e0e0",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  title: {
    marginBottom: "8px",
    color: "#212121",
  },
  total: {
    color: "#757575",
  },
};

function StatsCard({ icon, title, total }) {
  return (
    <Card className={clsx("stats-card", cardStyles.card)}>
      <CardContent className={clsx("stats-card-content", cardStyles.content)}>
        <Box className={clsx("stats-icon-container", cardStyles.iconContainer)}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Grid item>
              <Box className={clsx("stats-icon", cardStyles.icon)}>{icon}</Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h5"
            component="h2"
            className={clsx("stats-title", cardStyles.title)}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className={clsx("stats-total", cardStyles.total)}
          >
            Total: {total}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
