
#  Local Curl

curl --include --request DELETE http://localhost:3000/uploads/$ID \
--header "Authorization: Token token=$TOKEN"

# Deployed Curl

curl --include --request DELETE https://desert-island-api.herokuapp.com/uploads/$ID \
  --header "Authorization: Token token=$TOKEN"
