curl --include --request POST http://localhost:3000/uploads \
  --header "Authorization: Token token=HyKjqTR7b0jxel1v0EGEsBREZKXel3snwVj0q7KfpeI=--KMJXRSyy3b7u7S4I5UlCRtZeTY3gARP3LNS0mT/Mr5I=" \
  -F upload[title]='a thing' \
  -F upload[description]="it is a very nice thing" \
  -F upload[file]=@
