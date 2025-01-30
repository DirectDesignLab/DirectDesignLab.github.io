const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 진입점 설정
  output: {
    path: path.resolve(__dirname, 'dist'), // 출력 디렉토리
    filename: 'bundle.js', // 출력 파일명
  },
  module: {
    rules: [
      {
        test: /\.css$/, // CSS 파일 처리
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/, // JS와 JSX 파일 처리
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 처리
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 확장자 처리
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 템플릿 설정
      filename: 'index.html', // 출력 HTML 파일명
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // 정적 파일 제공 경로
    compress: true,
    port: 3000, // 개발 서버 포트
  },
};