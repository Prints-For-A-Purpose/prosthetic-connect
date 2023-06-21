import { useState, useEffect } from "react";
import { getComments } from "../adapters/comments-adapter";

export default function CommentPagination({ id, setComments }) {
  const [n, setN] = useState(1);

  let l = Math.floor(n / 7) * 7 + 1;

  useEffect(() => {
    const loadRequest = async () => {
      const newComments = await getComments(id, Number(n));
      setComments(newComments);
    };
    loadRequest();
  }, [n]);

  function setIsPageDown() {
    setN(n - 1);
    if (n <= 1) {
      setN(1);
    }
  }

  function setIsPageUp() {
    setN(n + 1);
    if (n >= 49) {
      setN(49);
    }
  }

  const handleChange = async (event) => {
    event.preventDefault();
    const page = event.target.firstChild.data;
    setN(Number(page));
  };

  return (
    <>
      <div className="pagination">
        <a onClick={setIsPageDown}>«</a>
        <a
          value={`${n % 7 !== 0 ? l : l - 7}`}
          onClick={handleChange}
          className={n % 7 === 1 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l : l - 7}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 1 : l - 6}`}
          onClick={handleChange}
          className={n % 7 === 2 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 1 : l - 6}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 2 : l - 5}`}
          onClick={handleChange}
          className={n % 7 === 3 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 2 : l - 5}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 3 : l - 4}`}
          onClick={handleChange}
          className={n % 7 === 4 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 3 : l - 4}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 4 : l - 3}`}
          onClick={handleChange}
          className={n % 7 === 5 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 4 : l - 3}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 5 : l - 2}`}
          onClick={handleChange}
          className={n % 7 === 6 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 5 : l - 2}
        </a>
        <a
          value={`${n % 7 !== 0 ? l + 6 : l - 1}`}
          onClick={handleChange}
          className={n % 7 === 0 ? "active" : undefined}
        >
          {n % 7 !== 0 ? l + 6 : l - 1}
        </a>
        <a onClick={setIsPageUp}>»</a>
      </div>
    </>
  );
}
