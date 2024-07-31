import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingHome = () => {
  return (
    <main className="container ">
      <div className=" mx-auto my-4 max-w-screen-lg border-l border-r border-border">
        <div className=" flex flex-col gap-4 px-4 lg:flex-row">
          <section className="  flex-1 rounded-lg border  border-border px-4 py-4">
            <Skeleton className=" h-[400px] w-full" />
          </section>
          <section className="  flex-1 rounded-lg border  border-border px-4 py-4">
            <Skeleton className=" h-[400px] w-full" />
          </section>
        </div>
        <Skeleton className=" mx-auto mt-8 h-10 w-full lg:w-1/2" />
        <section className=" my-4">
          <Skeleton className=" h-20  rounded-md" />
          <div className=" flex h-[80vh] flex-col items-center gap-4 border-b border-border py-2 pb-2 lg:h-[40vh] lg:flex-row">
            <Skeleton className=" h-1/2 w-full p-2 lg:h-full lg:w-2/5" />
            <div className=" h-full w-full border-t border-border lg:w-3/5 lg:border-l">
              <Skeleton className=" h-12 w-full" />
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
              <div className=" h-[70px] w-full py-4 ">
                <Skeleton className=" h-full w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoadingHome;
