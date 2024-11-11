// @ts-nocheck
// path: src/api/du-an/controllers/custom-controller.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::du-an.du-an", ({ strapi }) => ({
  async findDuAn(ctx) {
    console.log("findDuAn called");
    try {
      const { locale = "vi", limitDanhMuc = -1, limitBaiViet = 4 } = ctx.query; // Lấy locale, limitDanhMuc, limitBaiViet từ query params

      // Lấy thông tin Dự án theo locale
      const DuAn = await strapi.db.query("api::du-an.du-an").findOne({
        where: { locale },
        populate: { main: true },
      });

      if (!DuAn) {
        return ctx.send({ error: "No du an found" });
      }

      // Lấy tất cả các danh mục con có category = "Dự án" và locale khớp
      const danhMucConsQuery = strapi.db
        .query("api::danh-muc-con.danh-muc-con")
        .findMany({
          where: { category: "Dự án", locale },
          limit: limitDanhMuc !== -1 ? parseInt(limitDanhMuc, 10) : undefined,
          populate: { list_mega_menu: true }, // Populate mối quan hệ list_mega_menu
        });

      const danhMucCons = await danhMucConsQuery;

      const response = {
        name: DuAn.main ? DuAn.main.name : "No name provided",
        locale: DuAn.locale || "No locale provided",
        description: DuAn.main
          ? DuAn.main.description
          : "No description provided",
        danh_muc_cons: danhMucCons.map((dmc) => {
          const relatedBaiViets = (dmc.list_mega_menu || []).slice(
            0,
            parseInt(limitBaiViet, 10)
          ); // Giới hạn số lượng bài viết từ list_mega_menu

          return {
            name: dmc.name || "No name provided",
            description: dmc.description || "No description provided",
            locale: dmc.locale || "No locale provided",
            slug: dmc.slug || "No slug provided",
            bai_viet: relatedBaiViets.map((bv) => ({
              title: bv.title || "No title provided",
              slug: bv.slug || "No slug provided",
              description: bv.seo
                ? bv.seo.description
                : "No description provided",
              locale: bv.locale || "No locale provided",
            })),
          };
        }),
      };

      return ctx.send(response);
    } catch (err) {
      console.error("Error fetching du an:", err); // In ra chi tiết lỗi
      ctx.send({
        error: "An error occurred while fetching data",
        details: err.message,
      });
    }
  },
}));
