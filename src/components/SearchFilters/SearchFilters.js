function SearchFilters() {
  return (
    <div className="category-title-sp two">
      <p>
        <i className="fas fa-filter" style={{ color: "#050505" }}></i> Bộ Lọc
        Tìm Kiếm
      </p>
      <ul>
        <li>Thêm danh mục</li>

        <li>
          <label>
            <input type="checkbox" name="category" value="AoThun" id="aothun" />
            <span>Áo Thun (679k+)</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              name="category"
              value="AoKhoac"
              id="aokhoac"
            />
            <span>Áo Khoác (160k+)</span>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="category" value="AoSoMi" id="aosomi" />
            <span>Áo sơ mi (99k+)</span>
          </label>
        </li>
        <li className="themDm">
          Thêm <i className="fas fa-less-than fa-rotate-270"></i>
        </li>
        <div className="list-display-two">
          <li>
            <label>
              <input
                type="checkbox"
                name="category"
                value="AoPolo"
                id="aopolo"
              />
              <span>Áo Polo (679k+)</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="category" value="AoDui" id="aodui" />
              <span>Áo Đùi (160k+)</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="category" value="DoLot" id="dolot" />
              <span>Đồ Lót (99k+)</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="category" value="DoNgu" id="dongu" />
              <span>Đồ Ngủ (679k+)</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="category" value="DoBo" id="dobo" />
              <span>Đồ Bộ (160k+)</span>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="category"
                value="QuanJeans"
                id="quanjeans"
              />
              <span>Quần Jeans (99k+)</span>
            </label>
          </li>
        </div>
      </ul>
    </div>
  );
}
export default SearchFilters;
