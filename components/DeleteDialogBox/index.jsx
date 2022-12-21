import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/usersSlice";

const DeleteDialogBox = ({ uId, setShowDeleteDialogBox }) => {
  const dispatch = useDispatch();

  return (
    <div className="absolute z-10 top-0 left-0 flex flex-row justify-center items-center w-full h-full">
      <div className="bg-white border rounded-xl m-2 p-2 min-w-[500px] shadow-lg flex flex-col">
        <div className="flex flex-row justify-between">
          <div>Are you sure want to delete?</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={() => setShowDeleteDialogBox(false)}
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="self-end flex flex-row mt-5 ">
          <div
            onClick={() => setShowDeleteDialogBox(false)}
            className="m-1 p-1 px-7 cursor-pointer border rounded-lg"
          >
            Cancel
          </div>
          <div
            onClick={() => dispatch(removeUser(uId))}
            className="m-1 p-1 px-7 cursor-pointer bg-[#FFA500] rounded-lg text-white"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialogBox;
