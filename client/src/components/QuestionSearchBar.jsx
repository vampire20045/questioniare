

const QuestionSearchBar = ({
  searchQuery,
  selectedType,
  onSearchChange,
  onTypeChange,
  onReset,
}) => {
  const questionTypes = [
    { value: "", label: "All Types" },
    { value: "MCQ", label: "Multiple Choice" },
    { value: "READ_ALONG", label: "Read Along" },
    { value: "ANAGRAM", label: "Anagram" },
  ];

  return (
    <div style={{ marginBottom: "20px", backgroundColor: "#4DA1A9", padding: "20px", borderRadius: "8px" }}>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: "12px 20px",
          marginRight: "10px",
          border: "2px solid #213555",
          borderRadius: "10px",
          boxShadow: "0 2px 4px #213555",
          width: "300px",
          transition: "border-color 0.3s, box-shadow 0.3s",
          backgroundColor: "#",
          color: "#DA498D",
          fontFamily: "Arial, sans-serif",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#6a11cb";
          e.target.style.boxShadow = "0 0 0 3px rgba(106, 17, 203, 0.5)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#213555";
          e.target.style.boxShadow = "0 2px 4px #213555";
        }}
      />
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        style={{
          padding: "12px 20px",
          marginRight: "10px",
          border: "2px solid #555",
          borderRadius: "8px",
          backgroundColor: "#2973B2",
          color: "#FCE7C8",
          boxShadow: "0 2px 4px rgba(28, 89, 234, 0.5)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {questionTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <button
        onClick={onReset}
        style={{
          padding: "12px 20px",
          backgroundColor: "#B82132",
          color: "white",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          cursor: "pointer",
          transition: "background-color 0.3s, box-shadow 0.3s",
          fontFamily: "Arial, sans-serif",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.7)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#B82132";
          e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.5)";
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default QuestionSearchBar;
