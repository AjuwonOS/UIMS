import express, { json } from "express";
import "./connect.js"
import router from "./route/router.js";

const app = express();
app.use(json());
/* app.post("/", async (req, res) => {
  console.log(req.body);
  res.status(200);
  try {
        const response = await fetch(
          "https://api.paystack.co/transaction/initialize",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer sk_test_1ba1c556b580cf0098b8f02ea99ac1136ee5627f`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: "ajuwon@email.com",
              amount: "200000",
            }),
          },
        );

        const data = await response.json();

        console.log("Status:", response.status);
        console.log(data.data);
        res.send({ url: data.data.authorization_url }).status(200);
    } catch (error) {
        console.error(error);
    }  
}); */
app.use(router)

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
