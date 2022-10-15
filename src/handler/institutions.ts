import { readdirSync } from "fs";
import path from "path";
import { Data } from "../models";

export const loadInstitutions = async () => {
  const data: Data[] = [];
  const eventFolders = readdirSync(path.resolve(__dirname, "../institutions"));
  for (const folder of eventFolders) {
    const institution = await import(`../institutions/${folder}`);
    if (!institution.getData) continue;
    data.push(await institution.getData());
  }
  return data;
};
