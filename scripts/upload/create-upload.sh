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
    -F upload[title]='pretty thing' \
    -F upload[description]="a picture of a pretty thing" \
    -F upload[file]=@
