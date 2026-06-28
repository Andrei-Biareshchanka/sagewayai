export function formatCountdown(msLeft: number): string {
  const hoursLeft = Math.floor(msLeft / 3_600_000);
  const minutesLeft = Math.floor((msLeft % 3_600_000) / 60_000);
  return `${hoursLeft}ч ${minutesLeft}м`;
}
