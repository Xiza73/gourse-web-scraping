import "./institutions/academia-moviles";
import express, { Application } from "express";
import { loadInstitutions } from "./handler/institutions";
import { Data } from "./models";
import { writeFile } from "fs";
import dotenv from "dotenv";
import fetch from "cross-fetch";

const main = async () => {
  dotenv.config();
  const instData: Data[] = await loadInstitutions();
  writeFile("data.json", JSON.stringify(instData), "utf8", () => {});

  const app: Application = express();

  app.get("/go", async (_, res) => {
    const deleteCoursesResponse = await fetch(
      `${process.env.API_URL}/api/course/all`,
      {
        method: "DELETE",
      }
    );
    const deleteCoursesResponseJson = await deleteCoursesResponse.json();
    if (deleteCoursesResponseJson.statusCode !== 200)
      return res.status(500).send(deleteCoursesResponseJson);

    const deleteInstitutionsResponse = await fetch(
      `${process.env.API_URL}/api/institution/all`,
      {
        method: "DELETE",
      }
    );
    const deleteInstitutionsResponseJson =
      await deleteInstitutionsResponse.json();
    if (deleteInstitutionsResponseJson.statusCode !== 200)
      return res.status(500).send(deleteInstitutionsResponseJson);

    let errors = 0;
    await Promise.all(
      instData.map(async (data) => {
        const institutionResponse = await fetch(
          `${process.env.API_URL}/api/institution`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data.institution),
          }
        );
        const institutionResponseJson = await institutionResponse.json();
        if (institutionResponseJson.statusCode !== 200) return errors++;

        await Promise.all(
          data.courses.map(async (course) => {
            const courseResponse = await fetch(
              `${process.env.API_URL}/api/course`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(course),
              }
            );
            const courseResponseJson = await courseResponse.json();
            if (courseResponseJson.statusCode !== 200) return errors++;
          })
        );
      })
    );

    if (errors > 0)
      return res
        .status(500)
        .send({ statusCode: 500, message: "There were errors" });

    res.json({ message: "Cursos e Instituciones cargados correctamente" });
  });

  app.listen(3100, () => {
    console.log("App is up and running on http://localhost:3100");
  });
};

main();
