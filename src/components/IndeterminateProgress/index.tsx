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
      <div className="origin-indeterminateOrigin animate-indeterminate h-full w-full bg-blue-400"></div>
    </div>
  );
}
