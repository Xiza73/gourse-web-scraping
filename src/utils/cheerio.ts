import req from "request-promise";
import { load } from "cheerio";

export const log = (text: string | number) => {
  console.log(text);
  console.log("------------------");
};

export const scrapedData = async (url: string) => {
  return await req({
    url,
    transform: (body) => load(body),
  });
};
