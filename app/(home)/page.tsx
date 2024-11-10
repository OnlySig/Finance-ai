import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "../_components/navBar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
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
  return (
    <>
      <NavBar />
      <section className="px-6 py-8">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </section>
    </>
  );
};

export default Home;
