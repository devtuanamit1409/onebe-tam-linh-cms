// path: src/api/du-an/routes/custom-router.js
"use strict";

console.log("Custom router loaded");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-du-an",
      handler: "api::du-an.custom-controller.findDuAn",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
