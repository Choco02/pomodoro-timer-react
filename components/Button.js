export function Button({ text, outlineColor, className, ...rest }) {
  return (
    <button
      className={className}
      style={{
        outline: `solid ${outlineColor} medium`,
        borderRadius: '20px'
      }}
      {...rest}
    >
      {text}
    </button>
  );
}
