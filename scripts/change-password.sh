
# Local Curl

curl --include --request PATCH http://localhost:3000/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "1",
      "new": "2"
    }
  }'


# Deployed Curl

curl --include --request PATCH https://desert-island-api.herokuapp.com/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "1",
      "new": "2"
    }
  }'
