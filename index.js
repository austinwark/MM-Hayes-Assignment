const express = require('express'),
      app = express();
    
app.use(express.json());
app.use(express.static(__dirname + "/public"));      
      
/* Sends index.html to browser */
app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

/* Receives and validates JSON data from form POST request */
app.post("/submit", (req, res) => {
   const isDataJson = isJson(req.body);
   if (isDataJson)
      res.status(200).send();
   else
      res.status(406).send();
})

/* Helper method to check if String is in JSON format. Returns boolean value */
function isJson(item) {
   item = typeof item !== "string"
       ? JSON.stringify(item)
       : item;

   try {
       item = JSON.parse(item);
   } catch (e) {
       return false;
   }

   if (typeof item === "object" && item !== null) {
       return true;
   }

   return false;
}

app.listen(3000,()=>console.log('Express server started at port 3000'));