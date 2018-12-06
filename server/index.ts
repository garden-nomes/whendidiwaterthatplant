import app from "./app";

app.listen(app.get("port"), () => {
  console.log(
    `* Listening at http://localhost:${app.get("port")} in ${app.get("env")}`
  );
  console.log("* Press ctrl+c to stop\n");
});
