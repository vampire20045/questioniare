import  { useState, useEffect, useCallback, useRef } from "react";
import QuestionSearchBar from "./QuestionSearchBar";
import QuestionPagination from "./QuestionPagination";
import QuestionContent from "./QuestionContent";
import { fetchQuestions, searchQuestions } from "../services/api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const searchTimeoutRef = useRef(null);

  const questionsPerPage = 10;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        pageSize: questionsPerPage,
        type: selectedType || undefined,
        query: searchQuery || undefined,
      };

      const data = searchQuery || selectedType
        ? await searchQuestions(params)
        : await fetchQuestions(params);

      setQuestions(data.questions || []);
      setTotalQuestions(data.total || 0);
      setError(null);
    } catch (err) {
      console.error("Questions load error:", err);
      setError(err.response?.data?.message || "Failed to load questions");
      setQuestions([]);
      setTotalQuestions(0);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedType]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      loadQuestions();
    }, 700);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, selectedType, page, loadQuestions]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("");
    setPage(1);
  };

  if (loading) return <div>Loading questions...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <QuestionSearchBar
        searchQuery={searchQuery}
        selectedType={selectedType}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onReset={handleReset}
      />

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <div>
        {questions.map((question, index) => (
          <QuestionContent
            key={question._id}
            question={question}
            questionNumber={(page - 1) * questionsPerPage + index + 1}
          />
        ))}
      </div>

      {questions.length === 0 && (
        <div style={{ textAlign: "center", color: "gray" }}>No questions found</div>
      )}

      <QuestionPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default QuestionList;