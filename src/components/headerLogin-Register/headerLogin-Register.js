import logo from "..//..//assets/images/img/imgDn/logo.jpg";
function HeaderLoginRegister(props) {
  return (
    <div id="header" className=" d-flex ">
      <div className="title col-10">
        <div className="logo d-flex">
          <img src={logo} alt="" />
          <p>{props.titleHeader}</p>
        </div>
      </div>
      <div className="help">
        <p>Bạn cần giúp đỡ ?</p>
      </div>
    </div>
  );
}
export default HeaderLoginRegister;
