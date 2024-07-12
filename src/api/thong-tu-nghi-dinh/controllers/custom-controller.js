// @ts-nocheck
// path: src/api/thong-tu-nghi-dinh/controllers/custom-controller.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::thong-tu-nghi-dinh.thong-tu-nghi-dinh",
  ({ strapi }) => ({
    async findThongTuNghiDinh(ctx) {
      console.log("findThongTuNghiDinh called");
      try {
        const {
          locale = "vi",
          limitDanhMuc = -1,
          limitBaiViet = 4,
        } = ctx.query; // Lấy locale, limitDanhMuc, limitBaiViet từ query params

        // Lấy thông tin Thông tư nghị định theo locale
        const ThongTuNghiDinh = await strapi.db
          .query("api::thong-tu-nghi-dinh.thong-tu-nghi-dinh")
          .findOne({
            where: { locale },
            populate: { main: true },
          });

        if (!ThongTuNghiDinh) {
          return ctx.send({ error: "No thong tu nghi dinh found" });
        }

        // Lấy tất cả các danh mục con có category = "Thông tư nghị định" và locale khớp
        const danhMucConsQuery = strapi.db
          .query("api::danh-muc-con.danh-muc-con")
          .findMany({
            where: { category: "Thông tư nghị định", locale },
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
          name: ThongTuNghiDinh.main
            ? ThongTuNghiDinh.main.name
            : "No name provided",
          locale: ThongTuNghiDinh.locale || "No locale provided",
          description: ThongTuNghiDinh.main
            ? ThongTuNghiDinh.main.description
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

        return ctx.send(response);
      } catch (err) {
        console.error("Error fetching thong tu nghi dinh:", err); // In ra chi tiết lỗi
        ctx.send({
          error: "An error occurred while fetching data",
          details: err.message,
        });
      }
    },
  })
);
