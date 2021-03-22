/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#F4743B",
              "@secondary-color": "#04A777",
              "@info-color": "#e5cb7a",
              "@success-color": "#32c704",
              "@error-color": "#ec3521",
              "@warning-color": "#F4743B",
              "@white": "#fff",
              "@black": "#450101",
              "@link-color": "#232323",
              "@font-family": "Montserrat, sans-serif",
              "@card-actions-background": "#F4743B",
              "@card-shadow": "-1px 5px 5px 0px rgba(36,34,34,0.31)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
