interface InderteminateProgressProps {
  className: string;
}

export function InderteminateProgress({
  className,
}: InderteminateProgressProps) {
  return (
    <div
      className={`h-1 w-full overflow-hidden rounded-lg bg-blue-100 ${className}`}
    >
      <div className="h-full w-full origin-indeterminateOrigin animate-indeterminate bg-blue-400"></div>
    </div>
  );
}
