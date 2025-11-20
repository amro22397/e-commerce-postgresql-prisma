import { NextRequest } from "next/server";

export default function handler(req: NextRequest, res: any) {
  console.log("PayTabs callback:", req.body);
  res.status(200).send("Callback received");
}
