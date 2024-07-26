import React from "react";
import DoughnutChart from "./Doughnut";
import WeeklyExpenses from "./WeeklyExpenses";

const SummarySection = () => {
  return (
    <section className=" my-4  px-4 py-4">
      <div className="  mb-4 flex items-center justify-between rounded-md border border-border bg-muted/40 px-8 py-4 text-4xl font-light ">
        <h2 className=" text-foreground/50">This week</h2>
        <h3 className=" text-2xl text-foreground">Rs. 4000</h3>
      </div>
      <div className=" flex h-[80vh] flex-col items-center gap-4 border-b border-border pb-4 lg:h-[40vh] lg:flex-row">
        <DoughnutChart />
        <div className="  no-scrollbar h-full flex-grow overflow-y-scroll border-t border-border lg:border-l lg:px-4">
          <WeeklyExpenses />
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
