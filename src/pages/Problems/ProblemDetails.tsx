import React from "react";
import ProblemItem from "../../components/ProblemItem";
import PROBLEMS_LIST from "./utils/constants/ProblemsList";
import { useParams } from "react-router-dom";
import NavButton from "../../components/NavButton";

const ProblemDetails = () => {
  const { id } = useParams();
  const problem = PROBLEMS_LIST.find((item) => id && item.id.toString() === id);

  return (
    <div className="w-full flex flex-col items-center justify-center self-center justify-self-center gap-4 p-[-40px] my-10">
      <div className="flex flex-col self-start px-2 w-full pr-8">
        {problem && <ProblemItem {...problem} />}
      </div>
      {problem && problem.text && (
        <div className="w-full flex flex-col gap-4 mt-5 mb-12">
          {problem.text.split("<br/>").map((text, index) => (
            <p key={index} className="text-sm font-normal">{text}</p>
          ))}
        </div>
      )}
      <NavButton
        imageSrc="/assets/images/screen3.jpeg"
        altText="I still have a problem"
        text="Ainda tenho um problema"
      />
    </div>
  );
};

export default ProblemDetails;
