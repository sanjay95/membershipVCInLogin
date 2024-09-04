import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BenefitCard: React.FC<{ title: string; description: string; imageUrl: string }> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Card sx={{ width: 200, height: 350 }}>
      <CardMedia component="img" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BenefitCard;
