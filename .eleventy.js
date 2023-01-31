const fs = require("fs");
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const eleventySass = require("eleventy-sass");

const NOT_FOUND_PATH = "_site/404.html";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://patricklee.nyc",
    },
  });
  eleventyConfig.addPlugin(pluginRss);
  const eleventySassOptions = {
    compileOptions: {
      permalink: function (contents, inputPath) {
        return (data) => {
          return `public/styles/${data.page.filePathStem}.css`;
        };
      },
    },
  };
  eleventyConfig.addPlugin(eleventySass, eleventySassOptions);

  // Add 404 page
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(
              `Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
            );
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  // Static asset folder
  eleventyConfig.addPassthroughCopy("public");

  // Shortcodes
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("date", function (date, dateFormat) {
    return format(date, dateFormat);
  });

  eleventyConfig.addShortcode("openGraphScreenshotURL", function () {
    const encodedURL = encodeURIComponent(
      `https://patricklee.nyc/social${this.page.url}`
    );
    const cacheKey = `_${new Date().valueOf()}`;
    return `https://v1.screenshot.11ty.dev/${encodedURL}/opengraph/${cacheKey}`;
  });

  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map((item) => {
      if (item.data.tags) {
        // handle pages that don't have tags
        item.data.tags.forEach((tag) => {
          if (tag !== "post") {
            tagsList.add(tag);
          }
        });
      }
    });
    return [...tagsList];
  });

  return {
    templateFormats: ["md", "html", "liquid", "njk", "txt"],
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
