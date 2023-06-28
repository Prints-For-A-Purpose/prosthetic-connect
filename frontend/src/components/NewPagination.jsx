import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "@nextui-org/react";

export default function NewPaginationBox() {
  //   let { id } = useParams();
  //   let page = !!id ? Number(id) : 1;
  //   const navigate = useNavigate();

  //   const [n, setN] = useState(page);

  //   let l = Math.floor(page / 7) * 7 + 1;

  //   useEffect(() => {
  //     const loadRequest = async () => {
  //       return navigate(`/${n}`);
  //     };
  //     loadRequest();
  //   }, [n]);

  //   function setIsPageDown() {
  //     setN(n - 1);
  //     if (n <= 1) {
  //       setN(1);
  //     }
  //   }

  //   function setIsPageUp() {
  //     setN(n + 1);
  //     if (n >= 49) {
  //       setN(49);
  //     }
  //   }

  // const onClick = async (event) => {
  //   console.log(event.target.getAttribute("aria-label"));
  //   console.log(event.target.innerText);
  // };

  return (
    <Pagination
      onPress={onClick}
      total={20}
      initialPage={1}
      color="secondary"
      size="xl"
      shadow
      siblings={2}
    />
    // <div className="pagination">
    //   <a onClick={setIsPageDown}>«</a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l : l - 7}`}
    //     className={n % 7 === 1 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l : l - 7}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 1 : l - 6}`}
    //     className={n % 7 === 2 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 1 : l - 6}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 2 : l - 5}`}
    //     className={n % 7 === 3 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 2 : l - 5}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 3 : l - 4}`}
    //     className={n % 7 === 4 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 3 : l - 4}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 4 : l - 3}`}
    //     className={n % 7 === 5 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 4 : l - 3}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 5 : l - 2}`}
    //     className={n % 7 === 6 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 5 : l - 2}
    //   </a>
    //   <a
    //     href={`/${n % 7 !== 0 ? l + 6 : l - 1}`}
    //     className={n % 7 === 0 ? "active" : undefined}
    //   >
    //     {n % 7 !== 0 ? l + 6 : l - 1}
    //   </a>
    //   <a onClick={setIsPageUp}>»</a>
    // </div>
  );
}
