import { Institution } from "../../models";
import { Label, Text } from "../../models/cheerio";

export const institution = ($: any, uri = ""): Institution => {
  /* Get Name */
  const name = "Academia Móviles";

  /* Get Description */
  let data: string[] = [];
  $(".heading-block.nobottomborder.my-4.center")[1]?.children.forEach(
    (element: Label) => {
      if (["h3", "h4"].includes(element.name)) {
        data.push((element.children[0] as Text).data.trim());
      }
    }
  );
  const description = data.join("\n");

  /* Get Url */
  const url = `${uri}/index.php`;

  /* Get Social */
  const social = {
    facebook: ($(".si-facebook")[0] as Label)?.attribs.href!.trim(),
    twitter: ($(".si-twitter")[0] as Label)?.attribs.href!.trim(),
    instagram: ($(".si-instagram")[0] as Label)?.attribs.href!.trim(),
  };

  /* Get Email */
  const email = ($(".si-email3")[0] as Label)?.attribs.href!.trim();

  /* Get Logo */
  const logo = `${uri}/${(
    $("#logo").find("img")[0] as Label
  ).attribs.src!.trim()}`;

  return {
    name,
    description,
    url,
    social,
    email,
    logo,
    status: 1,
  };
};
