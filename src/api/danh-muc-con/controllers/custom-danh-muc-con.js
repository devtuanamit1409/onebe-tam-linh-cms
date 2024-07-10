module.exports = {
  async customQuery(ctx) {
    const { query } = ctx;

    const pageSize = query.pageSize || 10;
    const page = query.page || 1;

    const entities = await strapi.entityService.findMany(
      "api::danh-muc-con.danh-muc-con",
      {
        filters: { slug: query.slug },
        populate: {
          bai_viets: {
            populate: { seo: true, thumbnail: true },
            pagination: { pageSize, page },
          },
        },
      }
    );

    return entities;
  },
};
