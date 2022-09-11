import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";

interface Response {
  data: null | string;
  error: null | string;
}

async function createParty(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ data: null, error: "Not Found" });
  }
  const { name, capacity } = req.body;
  if (
    !name ||
    !capacity ||
    typeof name !== "string" ||
    typeof capacity !== "number"
  ) {
    return res.status(400).json({ data: null, error: "Invalid Input" });
  }
  if (name.length > 15) {
    return res
      .status(400)
      .json({ data: null, error: "name should not exceed 15 characters" });
  }
  if (capacity > 20) {
    return res
      .status(400)
      .json({ data: null, error: "capacity should not exceed 20 seats" });
  }
  if (capacity <= 0) {
    return res
      .status(400)
      .json({ data: null, error: "capacity should be more than 1 seat" });
  }

  const { data, error } = await supabaseClient
    .from("parties")
    .insert([{ name, capacity }]);

  if (error) {
    return res.status(500).json({ data: null, error: error.message });
  }

  res.status(200).json({
    data: `Successfully created party id: ${data[0]?.id}`,
    error: null,
  });
}

export default createParty;
