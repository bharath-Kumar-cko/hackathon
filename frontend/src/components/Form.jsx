import { useState } from "react";

export const Form = () => {
  const [step, setStep] = useState(0); // Track the current question index
  const [formData, setFormData] = useState({}); // Track form data (answers)

  const questions = [
    {
      question: "How are you feeling today?",
      name: "mood",
      options: ["Happy", "Sad", "Angry"],
    },
    {
      question: "How productive were you today?",
      name: "productivity",
      options: ["Very", "Moderate", "Low"],
    },
    {
      question: "How was your sleep last night?",
      name: "sleep",
      options: ["Good", "Average", "Bad"],
    },
    {
      question: "How was your diet today?",
      name: "diet",
      options: ["Good", "Average", "Bad"],
    },
    {
      question: "How was your exercise today?",
      name: "exercise",
      options: ["Good", "Average", "Bad"],
    },
    {
      question: "How was your social interaction today?",
      name: "social",
      options: ["Good", "Average", "Bad"],
    },
    {
      question: "How was your screen time today?",
      name: "screen",
      options: ["Good", "Average", "Bad"],
    },
    {
      question: "How was your stress level today?",
      name: "stress",
      options: ["Good", "Average", "Bad"],
    },
  ];

  const nextStep = () => {
    if (step < questions.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Handle form data change
  const handleOptionChange = (e) => {
    setFormData({
      ...formData,
      [questions[step].name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., logging the answers
    console.log("Form submitted with data: ", formData);
  };

  return (
    // align in page center
    <div className="flex justify-center items-center h-screen  bg-gray-100 mt-7 ">
      <div className="w-96">
        <form
          className="flex flex-col backgr p-4 rounded"
          onSubmit={handleSubmit}
        >
          {/* Display one question at a time */}
          <div className="flex flex-col gap-2">
            <label className="font-extrabold text-2xl">
              {questions[step].question}
            </label>
            <div className="flex flex-col gap-4">
              {questions[step].options.map((option, index) => {
                const inputId = `${
                  questions[step].name
                }-${option.toLowerCase()}`;
                return (
                  <div key={index} className="space-x-2">
                    <input
                      id={inputId}
                      type="radio"
                      name={questions[step].name}
                      value={option.toLowerCase()}
                      onChange={handleOptionChange}
                      checked={
                        formData[questions[step].name] === option.toLowerCase()
                      }
                    />
                    <label htmlFor={inputId}>{option}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-row gap-10 mt-4">
            {/* Previous button */}
            {step > 0 && (
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={prevStep}
              >
                Previous
              </button>
            )}

            {/* Next button */}
            {step < questions.length - 1 && (
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={nextStep}
              >
                Next
              </button>
            )}

            {/* Submit button appears only on the last step */}
            {step === questions.length - 1 && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
