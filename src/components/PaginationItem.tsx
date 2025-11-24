import type { PaginationProps } from "antd";
import React from "react";

const PaginationItem: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement,
): React.ReactNode => {
  if (type === "prev") {
    return <a>Назад</a>;
  }
  if (type === "next") {
    return <a>Вперед</a>;
  }
  return originalElement;
};

export default PaginationItem;
