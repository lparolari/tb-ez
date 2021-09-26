import { reportsRepo } from "helpers/reports-repo";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default function handler(
  req: NextApiRequest & { query: { id: string } },
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    if (!!req.query.id) {
      res.status(200).json(reportsRepo.findById(req.query.id));
    }
  }
}
