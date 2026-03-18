import { Router, type IRouter } from "express";
import { db, rsvpsTable } from "@workspace/db";
import { SubmitRsvpBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/rsvp", async (req, res) => {
  try {
    const body = SubmitRsvpBody.parse(req.body);
    const [rsvp] = await db
      .insert(rsvpsTable)
      .values({
        guestName: body.guestName,
        whatsapp: body.whatsapp,
        companions: body.companions ?? null,
      })
      .returning();
    res.status(201).json(rsvp);
  } catch (err) {
    res.status(400).json({ error: "Dados inválidos" });
  }
});

router.get("/rsvp", async (_req, res) => {
  try {
    const rsvps = await db.select().from(rsvpsTable).orderBy(rsvpsTable.createdAt);
    res.json(rsvps);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar confirmações" });
  }
});

export default router;
