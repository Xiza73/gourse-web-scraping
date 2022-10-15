import { Course, Data } from "../../models";
import { Child, Label } from "../../models/cheerio";
import { scrapedData } from "../../utils/cheerio";
import { course } from "./courses";
import { institution } from "./institution";

export const getData = async (): Promise<Data> => {
  const uriBase = "https://www.academiamoviles.com/view";
  const instituteHtml = await scrapedData(`${uriBase}/index.php`);
  const newInstitution = institution(instituteHtml, uriBase);
  const courses: Course[] = [];
  await Promise.all(
    (instituteHtml(".dropdown-menu")[0].children as Child[])
      .filter((child) => child.type === "tag")
      .map((child: Child) => (child as Label).attribs.href)
      .filter((href) => !!href)
      .map(async (courseUrl) => {
        const courseHtml = await scrapedData(courseUrl!);
        const newCourse = course(courseHtml);
        if (!newCourse) return;
        courses.push(
          Object.assign(newCourse, {
            institutionName: newInstitution.name,
            url: courseUrl,
          })
        );
      })
  );
  return {
    institution: newInstitution,
    courses,
  };
};
