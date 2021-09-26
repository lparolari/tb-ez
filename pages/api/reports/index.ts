import { reportsRepo } from "helpers/reports-repo";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default function handler(
  req: { query: { page?: string; limit?: string } },
  res: NextApiResponse<Data>
) {
  const page = Number.parseInt(req.query.page || "0");
  const limit = Number.parseInt(req.query.limit || "10");

  res.status(200).json(reportsRepo.find(page, limit));
}
