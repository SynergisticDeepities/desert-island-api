# THIS ONE WORKS
curl --include --request PATCH http://localhost:3000/uploads/5804e986780d4d26415a5a2f \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=zoZSXT67Jy4IPaOPt+0jm/JbwNhbqI+RhQDXtA2XzBU=--b8MuU2ELpOsNgi7j4ZGsJQEeC3y4P7uB2YlxEgLDsRc=" \
  --data '{
    "upload": {
      "title": "2:17",
      "description": "ITS 2:17 PM"
    }
  }'

# DOESN'T WORK FOR UPDATES
# curl --include --request PATCH http://localhost:3000/uploads/5804eacbda441526787164d2 \
#   -F upload[title]='ZZZZZZZZZZZZ' \
#   -F upload[description]="a picture of some stuff"
