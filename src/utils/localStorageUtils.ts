const speedKey = 'speed';

export function saveSpeed(speed: string): void {
  localStorage.setItem(speedKey, speed);
}

export function getSpeed(): string | null {
  return localStorage.getItem(speedKey);
}

export function removeSpeed(): void {
  localStorage.removeItem(speedKey);
}
