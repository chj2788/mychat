import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-room.context";
import EditRoomModal from "./EditRoomModal";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const Top = () => {
  const name = useCurrentRoom((v) => v.name);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);

  return (
    <div>
      <h2>{name}</h2>
      <span>{isAdmin && <EditRoomModal />}</span>
      <RoomInfoBtnModal />
    </div>
  );
};

export default memo(Top);
