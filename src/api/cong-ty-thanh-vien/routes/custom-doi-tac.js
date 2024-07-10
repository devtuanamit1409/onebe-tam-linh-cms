// src/api/cong-ty-thanh-vien/routes/custom-cong-ty-thanh-vien.js
"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/cong-ty-thanh-vien/:id/card-thanh-vien",
      handler: "custom-cong-ty-thanh-vien.findCardThanhVien",
      config: {
        auth: false,
      },
    },
  ],
};
