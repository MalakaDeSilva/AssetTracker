import express from 'express';
import ParcelBundler from 'parcel-bundler';

const app = express();
const bundler = new ParcelBundler('./public/index.html', {});

const PORT = 5000;

app.use(bundler.middleware());

app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile('./dist/index.html');
});

app.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log("Server is up and listening in PORT : " + PORT);
})