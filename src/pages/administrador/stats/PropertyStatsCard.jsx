import { Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

function PropertyStatsCard({ title, rentalCount, saleCount }) {

  return (
    <Card style={{ width: 300, height: 285, margin: "10px" }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: rentalCount, label: "Alquiler" },
                    { id: 1, value: saleCount, label: "Venta" },
                  ],
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
          </div>
      </CardContent>
    </Card>
  );
}

export default PropertyStatsCard;
