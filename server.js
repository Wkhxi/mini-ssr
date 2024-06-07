const express = require("express");

// --- ssr
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./pages/index";
// ---

const app = express();

const content = renderToString(<App />);

app.use(express.static("public")); // public 为静态文件目录

app.get("/", (req, res) => {
  // res.send(`
  //   <html>
  //     <head>
  //         <title>mini React SSR</title>
  //     </head>
  //     <body>
  //     <div id='root'>
  //       Counters 0 times
  //     </div>
  //     </body>
  //   </html>
  // `);

  res.send(`
    <html>
      <head>
          <title>mini React SSR</title>
      </head>
      <body>
        <div id='root'>${content}</div>
        <!-- 水合-->
        <script src="/client.bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => console.log("Listening on port 3000"));
