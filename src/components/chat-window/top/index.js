import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
  const name = useCurrentRoom((v) => v.name);

  return (
    <div>
      <h2>{name}</h2>
      <span>todo</span>
      <RoomInfoBtnModal />
    </div>
  );
};

export default memo(Top);
