import express from 'express'
const App = express();

App.listen(8080, (err) => {
  if (err) console.log(err);

  console.log("Server started");
})