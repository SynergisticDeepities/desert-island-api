# Local Curl

curl --include --request POST http://localhost:3000/uploads \
  --header "Authorization: Token token=$TOKEN" \
  -F upload[title]='a thing' \
  -F upload[description]="it is a very nice thing" \
  -F upload[file]=@

# Deployed Curl

curl --include --request POST https://desert-island-api.herokuapp.com/uploads \
  --header "Authorization: Token token=$TOKEN" \
  -F upload[title]='a thing' \
  -F upload[description]="it is a very nice thing" \
  -F upload[file]=@
