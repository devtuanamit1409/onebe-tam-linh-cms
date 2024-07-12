// path: src/api/dich-vu/routes/custom-router.js
"use strict";

console.log("Custom router loaded");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-dich-vu",
      handler: "api::dich-vu.custom-controller.findDichVu",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
