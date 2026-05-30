export function calculateFinancing(vehiclePrice: number, downPayment: number, installments: number, monthlyRate: number) {
  const financed = Math.max(vehiclePrice - downPayment, 0);
  const rate = monthlyRate / 100;
  const installmentValue =
    rate === 0
      ? financed / installments
      : (financed * rate) / (1 - Math.pow(1 + rate, -installments));
  const totalValue = installmentValue * installments + downPayment;

  return {
    installmentValue: Number(installmentValue.toFixed(2)),
    totalValue: Number(totalValue.toFixed(2))
  };
}
