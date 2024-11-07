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

        // Lấy tất cả các danh mục con có category = "Sản phẩm" và locale khớp
        const danhMucConsQuery = strapi.db
          .query("api::danh-muc-con.danh-muc-con")
          .findMany({
            where: { category: "Triết lý", locale },
            limit: limitDanhMuc !== -1 ? parseInt(limitDanhMuc, 10) : undefined,
          });

        const danhMucCons = await danhMucConsQuery;

        // Lấy tất cả các bài viết và populate danh_muc_cons
        const baiViets = await strapi.db
          .query("api::bai-viet.bai-viet")
          .findMany({
            where: { locale },
            populate: {
              danh_muc_cons: true,
              danh_muc_bai_viets: true,
              seo: true,
            },
          });

        const response = {
          name: sanPham.main ? sanPham.main.name : "No name provided",
          locale: sanPham.locale || "No locale provided",
          description: sanPham.main
            ? sanPham.main.description
            : "No description provided",
          danh_muc_cons: danhMucCons.map((dmc) => {
            const relatedBaiViets = baiViets
              .filter((bv) =>
                bv.danh_muc_cons.some((dm) => dm.name === dmc.name)
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, parseInt(limitBaiViet, 10)) // Sử dụng limitBaiViet từ query params
              .map((bv) => ({
                title: bv.title || "No title provided",
                slug: bv.slug || "No slug provided",
                description: bv.seo.description || "No description provided",
                locale: bv.locale || "No locale provided",
              }));

            return {
              name: dmc.name || "No name provided",
              description: dmc.description || "No description provided",
              locale: dmc.locale || "No locale provided",
              slug: dmc.slug || "No slug provided",
              bai_viet: relatedBaiViets,
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
