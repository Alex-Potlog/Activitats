import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props },
  ref,
) {
  const localRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        'rounded-none border-gris-ceniza/30 dark:border-gris-ceniza/20 bg-transparent text-azul-medianoche dark:text-blanco-crema transition-colors duration-500 focus:border-principal dark:focus:border-secundario focus:ring-principal dark:focus:ring-secundario shadow-sm ' +
        className
      }
      ref={localRef}
    />
  );
});
