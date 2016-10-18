# Local Curl
curl --include --request PATCH http://localhost:3000/uploads/58065ab616c54b0013ec6801 \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=/zGpoz7lLBmFTNdjp5+5AlZUD2KNGfIKWusqgLy3NCg=--CfYY+jx9CcB8h8cMeZdfo2RjhKgQMf8jbYar/LH0zTI=" \
  --data '{
    "upload": {
      "title": "It Works!",
      "description": "It Works!"
    }
  }'


# Deployed Curl

curl --include --request PATCH https://desert-island-api.herokuapp.com/uploads/58065ab616c54b0013ec6801 \
--header "Content-Type: application/json" \
--header "Authorization: Token token=/zGpoz7lLBmFTNdjp5+5AlZUD2KNGfIKWusqgLy3NCg=--CfYY+jx9CcB8h8cMeZdfo2RjhKgQMf8jbYar/LH0zTI=" \
--data '{
  "upload": {
    "title": "It Works!",
    "description": "It Works!"
  }
}'
