# docxtemplater-server

Upload template and data, get formatted docx in return
```
curl \
  -F "data={}" \
  -F "file=@test/data/testdoc.docx" \
  -F "options={}" \
  http://localhost:3000 > converted.docx
```

dependencies
```
{
  "docxtemplater": "^3.29.4",
  "express": "^4.18.1",
  "multer": "^1.4.4",
  "pizzip": "^3.1.1"
}
```

docker-compose
```
git clone https://github.com/chnbohwr/docxtemplater-server.git
cd docxtemplater-server
docker-compose up
```