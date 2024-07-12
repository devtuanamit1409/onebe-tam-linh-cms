// path: src/api/san-pham/routes/custom-router.js
"use strict";

console.log("Custom router loaded");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-san-pham",
      handler: "api::san-pham.custom-controller.findSanPham",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
