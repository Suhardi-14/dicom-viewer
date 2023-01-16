import { rest } from "msw";
import { sampleStudies } from "./studiesResult";

export const handlers = [
  rest.get("/api/studies", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleStudies));
  }),
];
