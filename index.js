const express = require('express')
const app = express()
const port = 3000
const packageJson = require('./package.json');
const multer = require('multer');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const upload = multer();

const defaultOptions = {
  paragraphLoop: true,
  linebreaks: true,
};

app.get('/', (req, res) => {
  const str = `
    <div>docxtemplater-server is running</div>
    <pre>server version: ${packageJson.version}</pre>
    <pre>${JSON.stringify(packageJson.dependencies, null, 2)}</pre>
  `;
  res.send(str);
});

app.post('/', upload.single('file'), (req, res) => {
  let dataJson = req.body.data;
  let options = req.body.options || '{}';
  if (!req.file) {
    res.status(400).send('please add docx in file field');
    return;
  }
  try {
    dataJson = JSON.parse(dataJson);
    options = JSON.parse(options);
  } catch (e) {
    res.status(400).send('can not parse data/options to json');
    return;
  }
  console.log(`file name: ${req.file.originalname}`);
  console.log(`options: ${JSON.stringify(options)}`);
  console.log(`data: ${JSON.stringify(dataJson)}`);
  try {
    const zip = new PizZip(req.file.buffer);
    const doc = new Docxtemplater(zip, { ...defaultOptions, options });
    doc.render(dataJson);
    const buf = doc.getZip().generate({ type: "nodebuffer" });
    res.set('Content-Disposition', "attachment; filename=\"response.docx\"");
    res.set('Content-Type', "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.end(buf);
  } catch (e) {
    res.status(400).send('can not parse file, please check file format: docx,pptx');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
