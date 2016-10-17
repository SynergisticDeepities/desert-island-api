# THIS ONE WORKS
curl --include --request PATCH http://localhost:3000/uploads/5804eacbda441526787164d2 \
  --header "Content-Type: application/json" \
  --data '{
    "upload": {
      "title": "ZZZZZZ",
      "description": "a picture of some stuff"
    }
  }'

# DOESN'T WORK FOR UPDATES
# curl --include --request PATCH http://localhost:3000/uploads/5804eacbda441526787164d2 \
#   -F upload[title]='ZZZZZZZZZZZZ' \
#   -F upload[description]="a picture of some stuff"
