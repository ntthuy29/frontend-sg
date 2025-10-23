import React, { ComponentType } from "react";

// So sánh nông (shallow) dựa trên Object.is
function shallowEqual(objA: any, objB: any) {
  if (Object.is(objA, objB)) return true;
  if (
    typeof objA !== "object" || objA === null ||
    typeof objB !== "object" || objB === null
  ) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const k of keysA) {
    // dùng Object.is để phân biệt -0/+0 và NaN
    if (!Object.prototype.hasOwnProperty.call(objB, k) || !Object.is(objA[k], objB[k])) {
      return false;
    }
  }
  return true;
}

type AreEqual<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;

export function memoLite<P>(Wrapped: ComponentType<P>, areEqual?: AreEqual<P>) {
  let lastProps: P | undefined;
  let lastVNode: React.ReactElement | null = null;

  // Đây **không** tương đương reconciler nội bộ của React,
  // chỉ để minh họa cơ chế ghi nhớ dựa vào props.
  function Memoized(props: P) {
    const equal = lastProps && (areEqual ? areEqual(lastProps, props) : shallowEqual(lastProps, props));
    if (equal && lastVNode) {
      return lastVNode;
    }
    lastProps = props;
    lastVNode = <Wrapped {...props} />;
    return lastVNode;
  }

  // set displayName dễ debug
  (Memoized as any).displayName = `memoLite(${Wrapped.displayName || Wrapped.name || "Component"})`;
  return Memoized;
}
