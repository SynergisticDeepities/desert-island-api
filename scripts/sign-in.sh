# Local Curl

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "1@1.com",
      "password": "1"
    }
  }'


  curl --include --request POST https://desert-island-api.herokuapp.com/sign-in \
    --header "Content-Type: application/json" \
    --data '{
      "credentials": {
        "email": "1@1.com",
        "password": "1"
      }
    }'
