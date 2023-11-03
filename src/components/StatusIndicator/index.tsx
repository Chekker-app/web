interface StatusIndicatorProps {
  status: 'up' | 'down' | null;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const isUp = status === 'up';
  const bgColor = isUp ? 'bg-green-600' : 'bg-red-600';
  return (
    <span className={`relative flex h-4 w-4 rounded-full ${bgColor}`}>
      <span
        className={`${bgColor} absolute h-full w-full animate-pingSlow rounded-full opacity-80`}
      ></span>
    </span>
  );
}
