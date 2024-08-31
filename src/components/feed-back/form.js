import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

function FormComment({ productID, userID, fetchDataComment }) {
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies();
  const [user, setUser] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: "1",
    },
  });
  const imageInputRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`http://localhost:5050/users?phone=${cookies.phone_user}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data[0]);
      });
  }, [cookies.phone_user]);

  let name = user?.name || "";
  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (productID) {
        formData.append("productId", productID);
      }
      if (name) {
        formData.append("name_user", name);
      }
      if (userID) {
        formData.append("userId", userID);
      }
      if (data.material) {
        formData.append("material", data.material);
      }
      if (data.color) {
        formData.append("color", data.color);
      }
      if (data.describe) {
        formData.append("describe", data.describe);
      }
      if (data.content) {
        formData.append("content", data.content);
      }
      if (data.rating) {
        formData.append("rating", data.rating);
      }
      if (imageInputRef.current.files[0]) {
        formData.append("image", imageInputRef.current.files[0]);
      }

      await axios.post("http://localhost:5050/comments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleClose();
      fetchDataComment();
      reset();
      imageInputRef.current.value = "";
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <Button
        style={{
          marginLeft: "70%",
          marginTop: "1rem",
          backgroundColor: "#FC5A31",
          border: "none",
        }}
        onClick={handleShow}
      >
        Bình luận
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bình luận sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="material">
              <Form.Label>Chất liệu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập chất liệu"
                {...register("material")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="color">
              <Form.Label>Màu sắc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập màu sắc"
                {...register("color")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="describe">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                {...register("describe")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nội dung bình luận"
                {...register("content", { required: true })}
              />
              {errors.content && (
                <p style={{ color: "red" }}>Nội dung là bắt buộc</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Đánh giá (1-5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                {...register("rating", { required: true })}
              />
              {errors.rating && (
                <p style={{ color: "red" }}>Đánh giá là bắt buộc</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Ảnh</Form.Label>
              <Form.Control type="file" accept="image/*" ref={imageInputRef} />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#FC5A31", border: "none" }}
              type="submit"
            >
              Gửi bình luận
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormComment;
