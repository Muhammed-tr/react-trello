import React, { useState } from "react";
import Logo from "../assets/logoForsico.png";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className="flex items-center justify-between dark:text-white">
        {/* Left Side  */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={Logo} alt=" Logo " className="w-6 h-6 " />
          <h3 className="hidden font-sans font-bold md:text-4xl md:inline-block">
            Forsico
          </h3>
          <div className="flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {board.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className="w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            className="hidden button md:block"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className="px-3 py-1 button md:hidden"
          >
            +
          </button>

          <img
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false)
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className="h-6 cursor-pointer "
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
