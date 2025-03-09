import React from "react";
import Search from "../../components/Search";
import ProblemItem from "../../components/ProblemItem";
import PROBLEMS_LIST, { ProblemType } from "./utils/constants/ProblemsList";

const Problems = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2 self-center justify-self-center gap-4">
      <Search />

      <div className="flex flex-col gap-2 self-start px-2">
        {PROBLEMS_LIST.map((p: ProblemType) => (
          <ProblemItem {...p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default Problems;
