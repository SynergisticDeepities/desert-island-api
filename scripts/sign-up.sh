#!/bin/bash

# Local Curl

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'

# Deployed Curl

curl --include --request POST https://desert-island-api.herokuapp.com/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "1@1.com",
      "password": "1",
      "password_confirmation": "1"
    }
  }'
