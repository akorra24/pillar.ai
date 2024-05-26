import { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import LogoutContainer from "../components/LogoutContainer";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/left.svg";
import EditIcon from "../assets/edit.svg";
import SubmitIcon from "../assets/submit.svg";

const FormOverview = () => {
  const [currentForm, setCurrentForm] = useState();
  const [editData, setEditData] = useState();

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("currentForm"));
    setCurrentForm(form);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col h-[80%] w-[90%] bg-black bg-opacity-75 rounded-3xl text-white">
          <div className="flex flex-row items-start justify-between p-4 flex-wrap">
            <div className="flex flex-row">
              <img
                src={BackIcon}
                className="w-10 mr-2 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              />
              <div className="flex flex-col ml-5">
                <h3 className="text-3xl">OpenAsphalt</h3>
                <p className="text-sm">Calendar 1 April</p>
              </div>
            </div>
            <div className="flex flex-row space-x-5 justify-between w-full mt-2 md:w-auto">
              <IconButton
                icon={SubmitIcon}
                text="Submit"
                textColor="text-green-500"
              />
              <LogoutContainer />
            </div>
          </div>
          <div className="flex flex-col items-start w-full p-2 overflow-scroll hide-scrollbar px-10">
            {currentForm &&
              currentForm.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {answer.categoryTitle}
                  </h3>
                  {answer.fields.map((field, fieldIndex) => (
                    <div
                      key={`${answerIndex}_${fieldIndex}`}
                      className="flex items-center my-3 ml-10"
                    >
                      <img
                        src={EditIcon}
                        className="w-5 mr-2 cursor-pointer"
                        onClick={() =>
                          setEditData({
                            categoryIndex: answerIndex,
                            fieldIndex: fieldIndex,
                            categoryTitle: answer.categoryTitle,
                            fieldTitle: field.fieldTitle,
                            fieldValue: field.fieldValue,
                          })
                        }
                      />
                      <p className="text-lg">
                        <span className="font-semibold">
                          {field.fieldTitle}:
                        </span>{" "}
                        {field.fieldValue}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {}
    </>
  );
};

export default FormOverview;
