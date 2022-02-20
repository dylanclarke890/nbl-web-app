export const entry = './index.tsx';
export const output = {
  filename: './[name].js'
};
export const resolve = {
  extensions: ['.ts', '.tsx', '.js']
};
export const module = {
  rules: [
    { test: /.tsx?$/, loader: 'ts-loader' }
  ]
};