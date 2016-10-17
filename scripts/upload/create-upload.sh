# curl --include --request POST http://localhost:3000/uploads \
#   --header "Content-Type: application/json" \
#   --data '{
#     "upload": {
#       "title": "best-picture-ever",
#       "description": "beach"
#     }
#   }'

# this one works
curl --include --request POST http://localhost:3000/uploads \
  --header "Authorization: Token token=zoZSXT67Jy4IPaOPt+0jm/JbwNhbqI+RhQDXtA2XzBU=--b8MuU2ELpOsNgi7j4ZGsJQEeC3y4P7uB2YlxEgLDsRc=" \
  -F upload[title]='hooplaaaa' \
  -F upload[description]="dum ditty dee ditty doo" \
  -F upload[file]=@
