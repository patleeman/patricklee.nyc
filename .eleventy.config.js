module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("public");
  return {
    templateFormats: ["md", "html", "liquid"],
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
