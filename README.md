1. npm i
2. cd ./backend-rest -> npx json-server -p 3500 -w data/db.json
3. cd ./backend-graphql -> run npm dev
4. cd ./fronend -> run npm dev

open browser should see output like (http://localhost:3000)
```
{"data":{"books":[{"__typename":"Book","title":"The Awakening","author":"Kate Chopin"},{"__typename":"Book","title":"City of Glass","author":"Paul Auster"}]},"loading":false,"networkStatus":7}
```