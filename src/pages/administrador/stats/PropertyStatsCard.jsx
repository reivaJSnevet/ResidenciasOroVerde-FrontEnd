import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import clsx from "clsx";

const cardStyles = {
  card: {


    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    borderRadius: "16px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  content: {
    padding: "16px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: "16px",
    color: "#212121",
    textAlign: "center",
  },
  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200, 
  },
};

const PropertyStatsCard = ({ title, rentalCount, saleCount }) => {
  return (
    <Card className={clsx("property-stats-card", cardStyles.card)}>
      <CardContent
        className={clsx("property-stats-content", cardStyles.content)}
      >
        <Typography
          variant="h5"
          component="h2"
          className={clsx("property-stats-title", cardStyles.title)}
        >
          {title}
        </Typography>
        <Box
          className={clsx(
            "property-stats-chart-container",
            cardStyles.chartContainer
          )}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: rentalCount, label: "Alquiler" },
                  { id: 1, value: saleCount, label: "Venta" },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={200} // Ajustado para mejorar la visualización del gráfico
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyStatsCard;
