/*
var host = '172.2.50.5'
var port = 8081
*/
var host = 'localhost'
var port = 8081

module.exports =
  {
    lintOnSave: false,
    publicPath: `http://${host}:${port}/`,
    devServer:
      {
        headers:
          {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
          },

        port, // This will take care of desktop machine
        public: `${host}:${port}`, // This will take care of mobile device
        disableHostCheck: true,
      }
  }
