export function getStatusColorByScore(score: number) {
  if (score > 90) {
    return {
      50: 'bg-green-50',
      500: 'text-green-500',
      border: '#04D361',
      background: 'bg-green-500',
    };
  }

  if (score <= 49) {
    return {
      50: 'bg-red-50',
      500: 'text-red-500',
      border: '#EF4444',
      background: 'bg-red-500',
    };
  }

  return {
    50: 'bg-orange-50',
    500: 'text-orange-500',
    border: '#FB923C',
    background: 'bg-orange-500',
  };
}
