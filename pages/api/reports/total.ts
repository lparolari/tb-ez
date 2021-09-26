import type { NextApiRequest, NextApiResponse } from "next";

import { reportsRepo } from "helpers/reports-repo";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ n: reportsRepo.find().length });
}
