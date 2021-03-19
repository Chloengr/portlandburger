/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#32c704",
              "@secondary-color": "#ec3521",
              "@info-color": "#e5cb7a",
              "@success-color": "#32c704",
              "@error-color": "#ec3521",
              "@warning-color": "#ec3521",
              "@white": "#fff",
              "@black": "#450101",
              '@link-color': '#232323',
              '@font-family': 'Montserrat, sans-serif',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
