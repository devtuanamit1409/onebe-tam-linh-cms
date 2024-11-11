// @ts-nocheck
// path: src/api/san-pham/controllers/custom-controller.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::san-pham.san-pham",
  ({ strapi }) => ({
    async findSanPham(ctx) {
      console.log("findSanPham called");
      try {
        const {
          locale = "vi",
          limitDanhMuc = -1,
          limitBaiViet = 4,
        } = ctx.query; // Lấy locale, limitDanhMuc, limitBaiViet từ query params

        // Lấy thông tin sản phẩm theo locale
        const sanPham = await strapi.db
          .query("api::san-pham.san-pham")
          .findOne({
            where: { locale },
            populate: { main: true },
          });

        if (!sanPham) {
          return ctx.send({ error: "No san pham found" });
        }

        // Lấy tất cả các danh mục con có category = "Triết lý" và locale khớp
        const danhMucConsQuery = strapi.db
          .query("api::danh-muc-con.danh-muc-con")
          .findMany({
            where: { category: "Triết lý", locale },
            limit: limitDanhMuc !== -1 ? parseInt(limitDanhMuc, 10) : undefined,
            populate: { list_mega_menu: true }, // Populate mối quan hệ list_mega_menu
          });

        const danhMucCons = await danhMucConsQuery;

        const response = {
          name: sanPham.main ? sanPham.main.name : "No name provided",
          locale: sanPham.locale || "No locale provided",
          description: sanPham.main
            ? sanPham.main.description
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
        console.log("Response Data:", response);
        return ctx.send(response);
      } catch (err) {
        console.error("Error fetching san pham:", err); // In ra chi tiết lỗi
        ctx.send({
          error: "An error occurred while fetching data",
          details: err.message,
        });
      }
    },
  })
);
