# Local Curl

curl --include --request POST http://localhost:3000/uploads \
  --header "Authorization: Token token=HyKjqTR7b0jxel1v0EGEsBREZKXel3snwVj0q7KfpeI=--KMJXRSyy3b7u7S4I5UlCRtZeTY3gARP3LNS0mT/Mr5I=" \
  -F upload[title]='a thing' \
  -F upload[description]="it is a very nice thing" \
  -F upload[file]=@

# Deployed Curl

curl --include --request POST https://desert-island-api.herokuapp.com/uploads \
  --header "Authorization: Token token=/zGpoz7lLBmFTNdjp5+5AlZUD2KNGfIKWusqgLy3NCg=--CfYY+jx9CcB8h8cMeZdfo2RjhKgQMf8jbYar/LH0zTI=" \
  -F upload[title]='1:10' \
  -F upload[description]="1:10 description" \
  -F upload[file]=@
