const QuestionContent = ({ question, questionNumber }) => {
  const renderMCQOptions = (options) => {
    const optionLetters = ["a", "b", "c", "d"];
    return options.map((option, index) => (
      <div
        key={index}
        className={`option ${option.isCorrectAnswer ? "correct" : ""}`}
      >
        {optionLetters[index]}. {option.text}
      </div>
    ));
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "MCQ":
        return <div>{renderMCQOptions(question.options)}</div>;

      case "ANAGRAM":
        return (
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              {question.blocks
                .filter((block) => block.showInOption)
                .map((block, index) => {
                  const optionLetters = [
                    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
                  ];
                  return (
                    <div key={index} className="option">
                      {optionLetters[index]}. {block.text}
                    </div>
                  );
                })}
            </div>
            <div className="option correct" style={{ padding: "10px" }}>
              <strong>Solution:</strong> {question.solution}
            </div>
          </div>
        );

      case "READ_ALONG":
        return (
          <div>
            {question.blocks?.map((block, index) => (
              <div key={index}>{block.text}</div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        border: "8px  solid #139",
        borderRadius: "25px",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <h3>
        Q{questionNumber}. {question.title}
      </h3>
      {renderQuestionContent()}
    </div>
  );
};
export default QuestionContent;
