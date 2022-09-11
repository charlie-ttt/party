import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

interface CardProps {
  id: string;
  userId: string;
  name: string;
  maxCapacity: number;
  currentCapacity: number;
}

export default function Card({
  id,
  name,
  maxCapacity,
  currentCapacity,
  userId,
}: CardProps) {
  const router = useRouter();

  const handleJoin = async (partyId: string) => {
    const rawResponse = await fetch("/api/parties/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, party_id: partyId }),
    });
    const { data, error } = await rawResponse.json();
    if (error) {
      alert(error);
    }
    if (data) {
      alert("Joined party successfully");
      router.reload();
    }
  };
  return (
    <MuiCard sx={{ width: 170 }}>
      <CardMedia
        component="img"
        height="300"
        image="/partyimage.jpeg"
        alt="partyimage"
      />
      <CardContent>
        <Typography noWrap gutterBottom component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>{`${currentCapacity || 0}/${maxCapacity || 0}`}</div>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleJoin(id)}
          >
            Join
          </Button>
        </Box>
      </CardActions>
    </MuiCard>
  );
}
