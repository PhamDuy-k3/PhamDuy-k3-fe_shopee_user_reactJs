import pc1 from "..//../assets/images/img/qc-1.jpg";
import pc2 from "..//../assets/images/img/qc-2.jpg";
import pc3 from "..//../assets/images/img/qc-3.jpg";

function Advertisements() {
  return (
    <section className="advertisements d-flex">
      <div className="advertisement col-4">
        <img src={pc1} alt="" />
      </div>
      <div className="advertisement col-4">
        <img src={pc3} alt="" />
      </div>
      <div className="advertisement col-4">
        <img src={pc2} alt="" />
      </div>
    </section>
  );
}
export default Advertisements;
