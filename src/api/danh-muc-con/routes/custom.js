"use strict";

/**
 * Custom router for danh-muc-con
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/danh-muc-cons/detail-bai-viet-by-pagesize",
      handler: "custom-danh-muc-con.customQuery",
      config: {
        auth: false,
      },
    },
  ],
};
