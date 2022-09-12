import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "../../src/components/Card";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import NoAuth from "../../src/components/NoAuth";
import SignOutButton from "../../src/components/SignOutButton";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

interface Party {
  id: string;
  name: string;
  maxCapacity: number;
  currentCapacity: number;
}

const Parties: NextPage = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const { user, isLoading } = useUser();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("parties").select(`
        id, name, capacity, parties_users ( user_id )
      `);
      if (data) {
        const formattedData: Party[] = data.map(
          ({ id, name, capacity, parties_users }) => ({
            id: id,
            name: name,
            maxCapacity: capacity,
            currentCapacity: parties_users.length,
          })
        );
        setParties(formattedData);
      }
    }
    if (user) {
      loadData();
    }
  }, [user]);

  if (isLoading) return <>Loading</>;
  if (!user) return <NoAuth />;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          component={Link}
          variant="outlined"
          noLinkStyle
          href="/parties/create"
        >
          Create New Party
        </Button>
        <SignOutButton />
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "row",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {parties.map((partydata) => (
          <Card key={partydata.name} userId={user.id} {...partydata} />
        ))}
      </Box>
    </Container>
  );
};

export default Parties;
