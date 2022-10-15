import { Course } from "../../models";
import { Label, Text } from "../../models/cheerio";

export const course = ($: any): Course | undefined => {
  if ($("h4").find("span").text().trim() || !$(".entry-title h1").text().trim())
    return;

  /* Get Name */
  const name = $(".entry-title h1")?.text()?.trim();

  /* Get Description */
  const description = $(".entry-content h4 p")?.text()?.trim();

  /* Get Image */
  const image = ($(".entry-image a img")[0] as Label)?.attribs.src?.trim()!;

  /* Get Price */
  const price = parseFloat(
    (($('strong:contains("inversión")')[0] as Label)?.next as Text)?.data
      ?.split(")")[0]
      ?.split(" ")[2]
      ?.trim()
  );

  /* Get Currency */
  const currency = "PEN";

  /* Get Start */
  const start = (($(".icon-calendar3")[0] as Label)?.next as Text)?.data
    ?.split(": ")[1]
    ?.trim();

  /* Get Duration */
  const duration =
    (($('strong:contains("Duración")')[0] as Label)?.next as Text)?.data?.split(
      ": "
    )[1] || "indefinido";

  /* Get Schedule */
  const schedule = (
    ($("span .icon-folder-open")[0] as Label)?.next as Text
  )?.data?.trim();

  return {
    institutionName: "",
    name,
    description,
    image,
    price,
    currency,
    start,
    duration,
    schedule,
    url: "",
  };
};
