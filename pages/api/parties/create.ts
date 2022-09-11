import type { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@supabase/auth-helpers-nextjs";

type Data = {
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not Found" });
  }
  const { name, capacity } = req.body;
  if (
    !name ||
    !capacity ||
    typeof name !== "string" ||
    typeof capacity !== "number"
  ) {
    return res.status(400).json({ message: "Invalid Input" });
  }

  const { data, error } = await supabaseClient
    .from("parties")
    .insert([{ name, capacity }]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res
    .status(200)
    .json({ message: `Successfully created party id: ${data[0]?.id}` });
};
