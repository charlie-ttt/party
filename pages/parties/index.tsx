import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "../../src/components/Card";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import NoAuth from "../../src/components/NoAuth";
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
  const { user } = useUser();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("parties").select(`
        id, name, capacity, parties_users ( user_id )
      `);
      console.log("🚀 ~ data", data);
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

  if (!user) return <NoAuth />;

  return (
    <Container maxWidth="lg">
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
