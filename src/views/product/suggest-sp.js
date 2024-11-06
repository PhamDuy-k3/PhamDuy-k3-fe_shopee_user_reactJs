import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { fetchAllProducts } from "../../redux/action";
import Suggest from "../../components/suggest/suggest";
import { useCookies } from "react-cookie";

const SuggestSP = (props) => {
  const dispatch = useDispatch();
  const [sumPage, setSumPage] = useState(1);
  const [listProduct, setListProduct] = useState([]);
  const [cookies] = useCookies(["user_token"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(props.urlApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setListProduct(data.data);
          setSumPage(data.pagination || 1);
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchProducts();
  }, [
    props.urlApi,
    props.filter,
    props.currentPage,
    props.textSearch,
    props.sortOrder,
    props.productWithBrands,
    cookies.user_token,
  ]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const onPageChange = useCallback(
    (pageNumber) => {
      props.setCurrentPage(pageNumber);
    },
    [props.setCurrentPage]
  );

  return (
    <>
      <div className="suggest-sp">
        <div id="list__suggest-products">
          <div className="suggest-products">
            <Suggest list={listProduct} />
          </div>
        </div>
        <div style={{ marginLeft: "40%" }} id="Pagination">
          <Pagination
            defaultCurrent={1}
            total={sumPage * 10}
            onChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default SuggestSP;
