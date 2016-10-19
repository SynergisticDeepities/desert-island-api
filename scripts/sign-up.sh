#!/bin/bash

# Local Curl

curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "userName": "example",
      "email": "an@example.com",
      "password": "1",
      "password_confirmation": "1"
    }
  }'

# Deployed Curl

curl --include --request POST https://desert-island-api.herokuapp.com/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "userName": "example",
      "email": "an@example.com",
      "password": "1",
      "password_confirmation": "1"
    }
  }'
