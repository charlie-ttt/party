import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";

interface Response {
  data: null | string;
  error: null | string;
}

async function joinParty(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== "POST") {
    return res.status(404).json({ data: null, error: "Not Found" });
  }
  const { user_id, party_id } = req.body;
  if (
    !user_id ||
    !party_id ||
    typeof user_id !== "string" ||
    typeof party_id !== "string"
  ) {
    return res.status(400).json({ data: null, error: "Invalid Input" });
  }

  const maxCap = await getMaxCapacity(party_id);
  const currentCap = await getCurrentCapacity(party_id);
  if (currentCap >= maxCap) {
    return res
      .status(400)
      .json({ data: null, error: "Party is at full capacity" });
  }

  const { data, error } = await supabaseClient
    .from("parties_users")
    .insert([{ user_id, party_id }]);

  if (error) {
    if (error.code === "23505") {
      // I added unique composite key violation on parties_users join table
      // this error code refers to this specific constraint
      return res
        .status(500)
        .json({ data: null, error: "You already joined this party" });
    }
    return res.status(500).json({ data: null, error: error.message });
  }

  res.status(200).json({
    data: `Join party successfully: (id: reference ${data[0]?.id})`,
    error: null,
  });
}

async function getCurrentCapacity(partyId: string): Promise<number> {
  const { error, count } = await supabaseClient
    .from("parties_users")
    .select("*", { count: "exact" })
    .eq("party_id", partyId);
  if (error) console.error(error);
  return count || 0;
}

async function getMaxCapacity(partyId: string): Promise<number> {
  const { data, error } = await supabaseClient
    .from("parties")
    .select("*")
    .eq("id", partyId)
    .single();
  if (error) console.error(error);
  return data.capacity;
}

export default joinParty;
