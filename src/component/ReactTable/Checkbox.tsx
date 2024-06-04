import React from "react";
interface ICheckboxProps {
  indeterminate: boolean;
  checked: boolean;
  onChange: () => void;
}
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>(
  ({checked,onChange, indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      if (resolvedRef && "current" in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          ref={resolvedRef}
          {...rest}
        ></input>
      </>
    );
  }
);
