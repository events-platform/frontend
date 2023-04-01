import { increment } from "../store/reducers/test";
import { store, useAppDispatch } from "../store/store";

export const VenchTest = () => {
  const dispatch = useAppDispatch();
  const val = store.getState().test.value;
  const addNumber = () => {
    dispatch(increment());
    // eslint-disable-next-line no-console
    console.log(store.getState());
  };
  return (
    <>
    Login {val}
      <button onClick={addNumber}>Add Number to store</button>
    </>
  );
};
