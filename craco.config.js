const path = require("path");

module.exports = {
  babel: {
    loaderOptions: {
      ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
    },
  },
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/component/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@graphQl": path.resolve(__dirname, "src/graphQl/"),
      "@images": path.resolve(__dirname, "src/images/"),
      "@reducers": path.resolve(__dirname, "src/reducers/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@utilities": path.resolve(__dirname, "src/utilities/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
};
