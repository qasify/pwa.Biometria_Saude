import React from "react";
import { ImportantNoteProps } from "./ImportantNote.types";

const ImportantNote: React.FC<ImportantNoteProps> = ({ note }) => {
  return (
    <div className="px-4 w-[296px] h-[78px] bg-gray-5 rounded-[18px] rounded-tl-[4px] flex justify-center items-center">
      <h1 className="text-center text-[17px] font-bolder">
        <b className="mr-2">Importante:</b>
        {note}
      </h1>
    </div>
  );
};

export default ImportantNote;
