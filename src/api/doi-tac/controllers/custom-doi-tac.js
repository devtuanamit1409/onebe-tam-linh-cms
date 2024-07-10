// src/api/doi-tac/controllers/custom-doi-tac.js
"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::doi-tac.doi-tac", ({ strapi }) => ({
  async findCardThanhVien(ctx) {
    try {
      const { id } = ctx.params;
      const { page = 1, pageSize = 10, locale = "vi" } = ctx.query;

      const pageNumber = parseInt(page, 10);
      const limit = parseInt(pageSize, 10);
      const start = (pageNumber - 1) * limit;

      // Ensure the locale is properly handled in the query
      ctx.query.locale = locale; // Set the locale for the query context

      const entity = await strapi.entityService.findOne(
        "api::doi-tac.doi-tac",
        id,
        {
          locale: locale, // Apply the locale in the query
          populate: {
            cardThanhVien: {
              populate: { logo: true },
              start,
              limit,
              locale: locale, // Make sure to pass the locale to the nested population as well
            },
          },
        }
      );

      const totalItems = entity.cardThanhVien.length;
      const totalPages = Math.ceil(totalItems / limit);

      ctx.body = {
        data: entity.cardThanhVien,
        meta: {
          pagination: {
            page: pageNumber,
            pageSize: limit,
            pageCount: totalPages,
            total: totalItems,
          },
        },
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
