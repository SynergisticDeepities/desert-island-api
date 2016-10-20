# Local Curl
curl --include --request PATCH http://localhost:3000/uploads/$ID \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "upload": {
      "title": "New Title",
      "description": "It Works!"
    }
  }'


# Deployed Curl

curl --include --request PATCH https://desert-island-api.herokuapp.com/uploads/$ID \
--header "Content-Type: application/json" \
--header "Authorization: Token token=/$TOKEN" \
--data '{
  "upload": {
    "title": "New Title",
    "description": "It Works!"
  }
}'
