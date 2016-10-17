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
    -F upload[title]='1:30' \
    -F upload[description]="1:30" \
    -F upload[file]=@
