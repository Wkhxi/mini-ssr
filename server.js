const express = require("express");

// --- ssr
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./pages/index";
// ---

// --- pages router
import { readdirSync } from "fs";
import { join } from "path";
// ---

const app = express();

// const content = renderToString(<App />);

app.use(express.static("public")); // public 为静态文件目录
const pagesDir = join(process.cwd(), "/pages");
const pages = readdirSync(pagesDir).map((page) => page.split(".")[0]);

console.log("pagesDir", pagesDir); //  D:\coding\project\next\react-ssr\pages
console.log("pages", pages); // [ 'about', 'index' ]

// app.get("/", async (req, res) => {
//   // res.send(`
//   //   <html>
//   //     <head>
//   //         <title>mini React SSR</title>
//   //     </head>
//   //     <body>
//   //     <div id='root'>
//   //       Counters 0 times
//   //     </div>
//   //     </body>
//   //   </html>
//   // `);

//   const file = await import(`./pages/index.js`);
//   let propsObj = {};
//   if (file.getServerSideProps) {
//     const { props } = await file.getServerSideProps({ query: req.query }); // return 的是 { props: { xxx: yyy }
//     propsObj = props;
//   }

//   const Component = file.default;
//   const content = renderToString(<Component {...propsObj} />);

//   res.send(`
//     <html>
//       <head>
//           <title>mini React SSR</title>
//       </head>
//       <body>
//         <div id='root'>${content}</div>
//         <!-- 水合 -->
//         <!-- 客户端也要获取 拿到prop 保证 客户端与服务端dom相同 -->
//         <!-- 将数据放到 window.__DATA__变量中,然后在 JS 文件中就可以直接获取 -->
//         <script>
//           window.__DATA__ = ${JSON.stringify(propsObj)}
//         </script>
//         <script src="/client.bundle.js"></script>
//       </body>
//     </html>
//   `);
// });

app.get(/.*$/, async (req, res) => {
  const path = req.path.split("/")[1];
  const page = path ? path : "index";

  if (pages.includes(page)) {
    const file = await import(`./pages/${page}.js`);
    const Component = file.default;

    let propsObj = {};
    if (file.getServerSideProps) {
      const { props } = await file.getServerSideProps({ query: req.query });
      propsObj = props;
    }

    const content = renderToString(<Component {...propsObj} />);
    res.send(`
      <html>
         <head>
             <title>mini React SSR</title>
         </head>
         <body>
          <div id='root'>${content}</div>
          <script>
            window.__DATA__ = ${JSON.stringify({
              props: propsObj,
              page: page,
            })}
          </script>
          <script src="/client.bundle.js"></script>
         </body>
      </html>
    `);
  } else {
    return res.status(200).json({ message: `${page} not found in ${pages}` });
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
