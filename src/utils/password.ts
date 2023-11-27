export function generatePassword() {
  const chars = 'abcdefgbhijklmnopqrstuvwxyzABCDEFGHYJKLMNIPQRSWXYZ1234567890';
  let password = '';

  while (password.length < 8) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}
