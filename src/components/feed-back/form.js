import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

function FormComment({ productID, fetchDataComment, setComments }) {
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies();
  const [user, setUser] = useState();
  const socketRef = useRef(null);

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
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("comments", (cmt) => {
      setComments((prevCommnets) => [
        ...prevCommnets,
        { ...cmt, sender: "server" },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!cookies.user_token) {
      return;
    }
    fetch(`http://localhost:5050/users/profile/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.user_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      });
  }, [cookies.user_token]);
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (productID) formData.append("productId", productID);
      if (user?.name) formData.append("name_user", user?.name);
      if (data.material) formData.append("material", data.material);
      if (data.color) formData.append("color", data.color);
      if (data.describe) formData.append("describe", data.describe);
      if (data.content) formData.append("content", data.content);
      if (data.rating) formData.append("rating", data.rating);
      if (imageInputRef.current?.files[0]) {
        formData.append("image", imageInputRef.current.files[0]);
      }
      // Kiểm tra và thêm ảnh vào formData nếu có
      let imageBase64 = null;
      if (imageInputRef.current?.files[0]) {
        const file = imageInputRef.current.files[0];
        imageBase64 = await convertFileToBase64(file); // Chuyển đổi ảnh sang base64
      }

      // Tạo dữ liệu comment và bao gồm chuỗi base64 của ảnh
      const commentData = {
        ...data,
        productId: productID,
        image: imageBase64, // Thêm ảnh vào dữ liệu gửi qua socket
      };

      // Gửi dữ liệu qua socket bao gồm cả ảnh dưới dạng base64
      socketRef.current.emit("comments", commentData);

      // Gửi dữ liệu (không bao gồm ảnh) tới API
      await axios.post("http://localhost:5050/comments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.user_token}`,
        },
      });

      handleClose();
      fetchDataComment();
      reset();

      // Đặt lại giá trị của input ảnh sau khi gửi
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Hàm chuyển file thành chuỗi base64

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

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
