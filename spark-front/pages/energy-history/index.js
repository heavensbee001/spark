import { JsonRpcBatchProvider } from "@ethersproject/providers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "../../utils/abi/WHVendor.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function EnergyHistory() {
  const { address, isConnected } = useAccount();
  const [dataBalance, setDataBalance] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);

  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading,
    isSuccess: balanceIsSuccess,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getUserBalanceHistory",
    args: [address],
    watch: true,
  });

  const balanceDataMapped =
    dataBalance && dataBalance.length > 0
      ? dataBalance.map((item) => item.map((_item) => Number(_item)))
      : [];

  const labels = weekDays();

  const data = {
    labels,
    datasets: [
      {
        label: "kWh consumed",
        data: [[0], [0], [0], [0], [0], [0], [0], ...balanceDataMapped]
          .slice(-7)
          .map((item) => item[0]),
        backgroundColor: "#1ee103",
      },
    ],
  };

  function weekDays() {
    const _weekDays = [];
    var curr = new Date(); // get current date

    for (let i = 0; i <= 6; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first))
        .toISOString()
        .slice(0, 10)
        .split("-")
        .splice(1)
        .join("/");
      _weekDays.push(day);
    }

    return _weekDays;
  }

  const totalDebtMap = balanceDataMapped.map(
    (item) => (item[0] * item[1]) / 1000000
  );

  const _totalDebt =
    Math.floor(totalDebtMap.reduce((debt, item) => (debt += item), 0) * 100) /
    100;

  useEffect(() => {
    if (balanceData) {
      setTotalDebt(_totalDebt);
      setDataBalance(balanceData);
    }
  }, [balanceData]);
  return (
    <div>
      {dataBalance && dataBalance.length > 0 && (
        <>
          <section className="mb-4">
            <h2 className="mb-2">Your energy consumption last 7 days</h2>
            <Bar options={options} data={data} />
          </section>
          <section>
            <p className="text-lg text-center">
              Your total debt is{" "}
              <span className="font-semibold">${_totalDebt}</span>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
