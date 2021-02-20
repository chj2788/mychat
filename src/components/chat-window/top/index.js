import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import EditRoomModal from "./EditRoomModal";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
  const name = useCurrentRoom((v) => v.name);

  return (
    <div>
      <h2>{name}</h2>
      <span>
        <EditRoomModal />
      </span>
      <RoomInfoBtnModal />
    </div>
  );
};

export default memo(Top);
