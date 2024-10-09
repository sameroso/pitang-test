"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { decrement, increment } from "../counter-slice";

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => dispatch(decrement())}>-</button>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};
