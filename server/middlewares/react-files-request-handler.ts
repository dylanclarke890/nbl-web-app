import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import ErrnoException = NodeJS.ErrnoException;

import { pageTitlesAndDescriptions } from "../routes/title-and-desc-routes";

export default function reactFilesRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    const filePath = path.resolve(
      __dirname,
      "../../client/build",
      "index.html"
    );
    fs.readFile(
      filePath,
      "utf8",
      (err: ErrnoException | null, data: string) => {
        let title =
          pageTitlesAndDescriptions[req.path]?.title || "Page not found";
        let description =
          pageTitlesAndDescriptions[req.path]?.description ||
          "404 - Page not found.";

        data = data.replace(/\$NBL By Tanya/g, title);
        data = data.replace(/\$OG_DESCRIPTION/g, description);

        res.header(
          "Cache-Control",
          "private, no-cache, no-store, must-revalidate"
        );
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        res.send(data);
      }
    );
  }
}
