// src/api/doi-tac/routes/custom-doi-tac.js
"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/doi-tac/:id/card-thanh-vien",
      handler: "custom-doi-tac.findCardThanhVien",
      config: {
        auth: false,
      },
    },
  ],
};
