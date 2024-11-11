import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navBar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import getDashboard from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
//import NavBar from "./_components/navBar";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();
  if (!userId) redirect("/login");
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) redirect("/?month=01");
  const getDataDashboard = await getDashboard(month);
  return (
    <>
      <NavBar />
      <section className="px-6 py-8">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards {...getDataDashboard} />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...getDataDashboard} />
              <ExpensesPerCategory
                expensesPerCategory={getDataDashboard.TotalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
