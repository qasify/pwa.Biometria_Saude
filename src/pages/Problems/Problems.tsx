import ProblemItem from "../../components/ProblemItem";
import PROBLEMS_LIST, { ProblemType } from "./utils/constants/ProblemsList";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const navigate = useNavigate();
  // const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 self-center justify-self-center gap-4">
      {/* <Search value={searchValue} onChange={setSearchValue} /> */}

      <div className="flex flex-col gap-2 self-start px-2 w-full pr-8">
        {PROBLEMS_LIST
          // .filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
          .map((p: ProblemType) => (
            <ProblemItem
              {...p}
              key={p.id}
              onClick={() => {
                navigate(`/problems/${p.id}`);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Problems;
