import { jsx, jsxs, Fragment } from "react/jsx-runtime";

export { Fragment, jsx, jsxs };

export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: boolean,
  _source?: any,
  _self?: any
) {
  if (isStaticChildren) {
    return jsxs(type, props, key);
  }
  return jsx(type, props, key);
}

export default {
  Fragment,
  jsx,
  jsxs,
  jsxDEV,
};
