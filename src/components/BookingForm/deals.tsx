import { useNavigate } from "react-router-dom";
import { right } from "../assets/icons";
import { msunrise, shangai, sunrise, sydney, temple } from "../assets/images";
import FlightDealsCard from "../container/FlightDealsCard";
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FlightDeals = () => {

  const navigate = useNavigate()

  const handleSeeAllClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/packages')
  };

  return (
    <Box sx={{ px: 8, gap: 7, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="text.secondary">
          Find your next adventure with these <Typography component="span" color="primary">flight deals</Typography>
        </Typography>
        <Button endIcon={<ArrowForwardIosIcon />} onClick={handleSeeAllClick}>
          All
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'start' }}>
        <FlightDealsCard
          image={shangai}
          title="The Bund, "
          name="Shanghai"
          price="$598"
          des=" China’s most international city"
        />
        <FlightDealsCard
          image={sydney}
          title="Sydney Opera House, "
          name="Sydney"
          price="$981"
          des=" Take a stroll along the famous harbor"
        />
        <FlightDealsCard
          image={temple}
          title="Kōdaiji Temple,"
          name="Kyoto"
          price="$633"
          des=" Step back in time in the Gion district"
        />
      </Box>

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={sunrise}
          alt=""
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Tsavo East National Park, <Typography component="span" color="primary">Kenya</Typography>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            $1,248
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FlightDeals;
