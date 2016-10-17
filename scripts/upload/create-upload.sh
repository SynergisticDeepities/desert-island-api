curl --include --request POST http://localhost:3000/uploads \
-F upload[comment]="Hello from curl" -F upload[file]=@<filename>

curl --include --request POST http://localhost:3000/uploads -F upload[comment]="Hello from curl" -F upload[file]=@<filename>


curl --include --request POST http://localhost:3000/uploads \
  --header "Content-Type: application/json" \
  --data '{
    "upload": {
      "title": "best-picture-ever",
      "description": "beach"
    }
  }'

  curl --include --request POST http://localhost:3000/uploads \
    -F upload[title]='TEST' \
    -F upload[description]="a test file" \
    -F upload[file]=@
