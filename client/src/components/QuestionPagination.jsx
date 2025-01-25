
const QuestionPagination = ({ page, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesShown = 5;
    const halfMax = Math.floor(maxPagesShown / 2);

    let startPage = Math.max(1, page - halfMax);
    let endPage = Math.min(totalPages, startPage + maxPagesShown - 1);

    if (endPage - startPage + 1 < maxPagesShown) {
      startPage = Math.max(1, endPage - maxPagesShown + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key="first" onClick={() => onPageChange(1)} className="pagination-button" style={buttonStyle}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className="pagination-ellipsis" style={ellipsisStyle}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className="pagination-button"
          style={i === page ? activeButtonStyle : buttonStyle}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className="pagination-ellipsis" style={ellipsisStyle}>...</span>);
      }
      pageNumbers.push(
        <button key="last" onClick={() => onPageChange(totalPages)} className="pagination-button" style={buttonStyle}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const buttonStyle = {
    padding: "10px 15px",
    margin: "0 5px",
    border: "2px solid #555",
    borderRadius: "8px",
    backgroundColor: "#222",
    color: "#fff",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    transition: "background-color 0.3s, box-shadow 0.3s",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6a11cb",
    borderColor: "#6a11cb",
  };

  const ellipsisStyle = {
    padding: "10px 15px",
    margin: "0 5px",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", backgroundColor: "#333", padding: "20px", borderRadius: "8px" }}>
      {renderPagination()}
    </div>
  );
};

export default QuestionPagination;
