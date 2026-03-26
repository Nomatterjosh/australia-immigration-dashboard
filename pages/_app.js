import '../styles/globals.css';
// 多语言通过组件内直接引用实现

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
