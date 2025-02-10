/* eslint-disable jsx-a11y/aria-role */
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { IListBoxProps } from "./types";

const ListBox = forwardRef(({ children, ...props }: IListBoxProps, ref) => {
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  return (
    <ul {...props} ref={innerRef} role="list-box">
      {children}
    </ul>
  );
});

export default ListBox;
