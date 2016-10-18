
#  Local Curl

curl --include --request POST http://localhost:3000/uploads \
--header "Authorization: Token token=9s48PmRKRhyq596FzbehBUOx9S516C8tD299f19eTBo=--CT0m748cBsxE3OjHA7c52FqaeWCV8wEgdlQ928J0afM="

# Deployed Curl

curl --include --request DELETE https://desert-island-api.herokuapp.com/uploads/5806586d16c54b0013ec6800 \
  --header "Authorization: Token token=9s48PmRKRhyq596FzbehBUOx9S516C8tD299f19eTBo=--CT0m748cBsxE3OjHA7c52FqaeWCV8wEgdlQ928J0afM="
