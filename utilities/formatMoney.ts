const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export default function formatMoney(paisa: number): string {
  const rupees = paisa / 100;
  return formatter.format(rupees);
}
