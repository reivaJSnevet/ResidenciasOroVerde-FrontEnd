import { Card, CardContent, Typography, Box } from "@mui/material";

function StatsCard({ icon, title, total }) {
  return (
    <Card style={{ width: 300, height: 285, margin: "10px" }}>
      <CardContent style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <Box style={{ fontSize: 100 }}>
            {icon}
          </Box>
        </Box>
        <Box textAlign="center" paddingY={2} borderTop="1px solid #e0e0e0">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            Total: {total}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
