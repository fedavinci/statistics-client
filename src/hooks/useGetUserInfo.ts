import { useSelector } from "react-redux";
import { StateType } from "@/store";
import { UserStateType } from "@/store/userReducer";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType, UserStateType>(
    (state) => state.user,
  );
  return { username, nickname };
}

export default useGetUserInfo;
