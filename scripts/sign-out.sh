#!/bin/bash
# Local Curl

curl --include --request DELETE http://localhost:3000/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"

# Deployed Curl


curl --include --request DELETE https://desert-island-api.herokuapp.com/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
