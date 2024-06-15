import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import clsx from "clsx";

const cardStyles = {
  card: {
    width: 300,
    height: 300,
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
  },
};

const AvgRatingStatsCard = ({ avgRating }) => {
  return (
    <Card className={clsx("avg-rating-stats-card", cardStyles.card)}>
      <CardContent
        className={clsx("avg-rating-stats-content", cardStyles.content)}
      >
        <Box
          className={clsx(
            "avg-rating-icon-container",
            cardStyles.iconContainer
          )}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <StarIcon style={{ fontSize: 50, color: "#3c6c43" }} />
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h6"
            component="h2"
            className={clsx("avg-rating-title", cardStyles.title)}
          >
            Promedio de Calificaciones
          </Typography>
          <Typography
            variant="body1"
            className={clsx("avg-rating-total", cardStyles.total)}
          >
            {avgRating.toFixed(2)} / 5
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvgRatingStatsCard;
