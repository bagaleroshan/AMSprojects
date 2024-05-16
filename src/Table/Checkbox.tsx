import React from "react";

export const Checkbox: React.FC<{
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: () => void;
}> = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    if (resolvedRef && resolvedRef.current) {
      resolvedRef.current.indeterminate = !!indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={resolvedRef as React.RefObject<HTMLInputElement>}
      {...rest}
    />
  );
});
