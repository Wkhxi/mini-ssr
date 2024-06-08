// import React from "react";
// // import { createRoot } from "react-dom/client";
// import App from "./pages/index";

// // hydrateRoot 函数允许你在先前由 react-dom/server 生成的浏览器 HTML DOM 节点中展示 React 组件。
// // createRoot 会重新渲染，hydrateRoot 会复用已有的 DOM 节点（当然前提是服务端和客户端渲染一致，这样才能够复用）
// // hydrateRoot 通常就是搭配 React 的服务端 API react-dom/server 而使用的
// // react-dom/server 负责服务端渲染，hydrateRoot 负责复用 DOM 进行水合。
// import { hydrateRoot } from "react-dom/client";

// // const root = createRoot(document.getElementById("root"));
// // root.render(<App />);

// hydrateRoot(document.getElementById("root"), <App {...window.__DATA__} />);

import React from "react";
import { hydrateRoot } from "react-dom/client";

const { props, page } = window.__DATA__;

const importFile = async (path) => {
  return await import(`./pages/${path}.js`);
};
const data = await importFile(page);
const Component = data.default;

hydrateRoot(document.getElementById("root"), <Component {...props} />);
