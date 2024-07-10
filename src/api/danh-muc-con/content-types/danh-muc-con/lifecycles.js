const slugify = require("slugify");

function customSlugify(input) {
  const accentsMap = {
    á: "a",
    à: "a",
    ả: "a",
    ã: "a",
    ạ: "a",
    ă: "a",
    ắ: "a",
    ặ: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    â: "a",
    ấ: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ậ: "a",
    đ: "d",
    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",
    ê: "e",
    ế: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ệ: "e",
    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",
    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",
    ô: "o",
    ố: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ộ: "o",
    ơ: "o",
    ớ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ợ: "o",
    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",
    ư: "u",
    ứ: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ự: "u",
    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };

  const from = Object.keys(accentsMap);
  const to = Object.values(accentsMap);

  for (let i = 0; i < from.length; i++) {
    input = input.replace(new RegExp(from[i], "gi"), to[i]);
  }

  return slugify(input, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.name) {
      const timestamp = Date.now();
      data.slug = customSlugify(`${data.name}-${timestamp}`);
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.name) {
      const timestamp = Date.now();
      data.slug = customSlugify(`${data.name}-${timestamp}`);
    }
  },
};
