import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

const Parties: NextPage = () => {
  const { user, error } = useUser();
  console.log(user);
  if (!user)
    return (
      <Container maxWidth="lg">
        Please log in first
        <>
          <Button
            variant="contained"
            component={Link}
            noLinkStyle
            href="/login"
          >
            Log In
          </Button>
        </>
      </Container>
    );

  useEffect(() => {
    if (user) {
      //doaction
    }
  }, [user]);

  return <Container maxWidth="lg">Hello</Container>;
};

export default Parties;
