# Local Curl

curl --include --request POST http://localhost:3000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.com",
      "password": "1"
    }
  }'


  curl --include --request POST https://desert-island-api.herokuapp.com/sign-in \
    --header "Content-Type: application/json" \
    --data '{
      "credentials": {
        "email": "an@example.com",
        "password": "1"
      }
    }'
