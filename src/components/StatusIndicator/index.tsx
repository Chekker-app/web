export function StatusIndicator() {
  return (
    <span className="relative flex h-4 w-4 rounded-full bg-green-600">
      <span className="absolute h-full w-full animate-pingSlow rounded-full bg-green-600 opacity-80"></span>
    </span>
  );
}
