import app, { init } from "@/app";

const port = 4000;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});