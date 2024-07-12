// path: src/api/thong-tu-nghi-dinh/routes/custom-router.js
"use strict";

console.log("Custom router loaded");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom-thong-tu-nghi-dinh",
      handler: "api::thong-tu-nghi-dinh.custom-controller.findThongTuNghiDinh",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
