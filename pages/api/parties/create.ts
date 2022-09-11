import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";

interface Response {
  data: null | string;
  error: null | string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
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
};
