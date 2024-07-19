module.exports = ({ env }) => ({
  tinymce: {
    enabled: true,
    config: {
      editor: {
        outputFormat: "html",
        editorConfig: {
          language: "vi",
          height: 500,
          menubar: false,
          branding: false,
          forced_root_block: "",
          convert_urls: false,
          entity_encoding: "raw",
          plugins:
            "advlist autolink lists link image charmap preview anchor " +
            "searchreplace visualblocks code fullscreen table emoticons nonbreaking " +
            "insertdatetime media table code help wordcount textcolor",
          toolbar:
            "undo redo | styles | bold italic forecolor backcolor fontsizeinput  | " +
            "alignleft aligncenter alignright alignjustify | " +
            "media table emoticons visualblocks code | " +
            "nonbreaking bullist numlist outdent indent | removeformat | help",
          fontsize_formats: "8px 10px 12px 14px 16px 18px 24px 36px",
          formats: {
            bold: { inline: "strong" }, // sử dụng thẻ strong thay vì span
            italic: { inline: "em" }, // sử dụng thẻ em thay vì span
            underline: { inline: "u" }, // sử dụng thẻ u thay vì span
            fontSize: {
              inline: "span",
              styles: { "font-size": "%value" },
              remove: "all",
            },
          },
          style_formats: [
            {
              title: "Headings",
              items: [
                { title: "h1", block: "h1" },
                { title: "h2", block: "h2" },
                { title: "h3", block: "h3" },
                { title: "h4", block: "h4" },
                { title: "h5", block: "h5" },
                { title: "h6", block: "h6" },
              ],
            },
            {
              title: "Text",
              items: [
                { title: "Paragraph", block: "p" },
                { title: "Paragraph with small letters", block: "small" },
              ],
            },
          ],
        },
      },
    },
  },

  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        "bai-viet": {
          field: "slug",
          references: "title",
        },
        "danh-muc": {
          field: "slug",
          references: "name",
        },
      },
    },
  },
});
