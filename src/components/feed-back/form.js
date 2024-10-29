import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

function FormComment({
  productID,
  setEditCommentData,
  fetchDataComment,
  setComments,
  editCommentData,
}) {
  const [show, setShow] = useState(false);
  const [cookies] = useCookies(["user_token"]);
  const [user, setUser] = useState(null);
  const socketRef = useRef(null);
  const imageInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: "5",
    },
  });

  const handleClose = () => {
    setEditCommentData("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("comments", (cmt) => {
      setComments((prevComments) => [
        ...prevComments,
        { ...cmt, sender: "server" },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [setComments]);

  useEffect(() => {
    if (cookies.user_token) {
      fetch("http://localhost:5050/users/profile/user", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) setUser(res.data);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [cookies.user_token]);

  const handler = async (data, method, url) => {
    try {
      const formData = new FormData();

      formData.append("productId", productID);
      if (user?.name) formData.append("name_user", user?.name);
      if (data.material) formData.append("material", data.material);
      if (data.color) formData.append("color", data.color);
      if (data.describe) formData.append("describe", data.describe);
      if (data.content) formData.append("content", data.content);
      formData.append("rating", data.rating || "5");

      if (imageInputRef.current?.files[0]) {
        formData.append("image", imageInputRef.current.files[0]);
      }

      const commentData = {
        ...data,
        productId: productID,
        image: imageInputRef.current?.files[0]
          ? await convertFileToBase64(imageInputRef.current.files[0])
          : null,
      };

      socketRef.current.emit("comments", commentData);

      await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });

      handleClose();
      fetchDataComment();
      reset();
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const onSubmit = async (data) => {
    if (editCommentData) {
      handler(
        data,
        "put",
        `http://localhost:5050/comments/${editCommentData._id}`
      );
    } else {
      handler(data, "post", "http://localhost:5050/comments");
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (editCommentData) {
      handleShow();
      setValue("material", editCommentData.material);
      setValue("color", editCommentData.color);
      setValue("describe", editCommentData.describe);
      setValue("content", editCommentData.content);
      setValue("rating", editCommentData.rating);
    }
  }, [editCommentData, setValue]);

  return (
    <>
      <Button
        style={{
          marginLeft: "70%",
          marginTop: "1rem",
          marginBottom: "1rem",
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
