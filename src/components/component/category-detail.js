const slugify = require("slugify").default;

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      console.log("before create: ", data);
      if (data.params.data.title) {
        data.params.data.slug = slugify(data.params.data.title, {
          lower: true,
          strict: true,
        });
      }
    },
    async beforeUpdate(data) {
      console.log("before update: ", data);
      if (data.params.data.title && data.params.data.slug === null) {
        data.params.data.slug = slugify(data.params.data.title, {
          lower: true,
          strict: true,
        });
      }
    },
  },
};
