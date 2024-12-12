import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ProvincesDistrictTown = ({ selectedLocation, setSelectedLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cookies] = useCookies();
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [townList, setTownList] = useState([]);

  const [addressOptions, setAddressOptions] = useState();

  const [style, setStyle] = useState();

  // Fetch provinces
  const fetchProvinces = async () => {
    const response = await axios.get("http://localhost:5050/provinces", {
      headers: {
        Authorization: `Bearer ${cookies.user_token}`,
      },
    });
    setProvinceList(response.data.data);
  };

  const fetchDistricts = async () => {
    const response = await axios.get(
      `http://localhost:5050/districts?provinces_id=${selectedLocation.province._id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      }
    );
    setDistrictList(response.data.data);
  };

  const fetchTowns = async () => {
    const response = await axios.get(
      `http://localhost:5050/towns?provinces_id=${selectedLocation.province._id}&districts_id=${selectedLocation.district._id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.user_token}`,
        },
      }
    );
    setTownList(response.data.data);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedLocation.province._id) {
      fetchDistricts();
    }
  }, [selectedLocation.province]);

  useEffect(() => {
    if (selectedLocation.district._id) {
      fetchTowns();
    }
  }, [selectedLocation.district]);

  const handleSelection = (item) => {
    const { province, district, town } = selectedLocation;

    // Chọn tỉnh
    if (
      !province.name &&
      !item.name.includes("Quận") &&
      !item.name.includes("Phường")
    ) {
      setSelectedLocation((prev) => ({ ...prev, province: item }));
      return;
    }

    // Chọn quận
    if (
      !district.name &&
      province.name &&
      item.name.includes("Quận") &&
      !item.name.includes("Phường")
    ) {
      setSelectedLocation((prev) => ({ ...prev, district: item }));
      return;
    }

    // Chọn phường
    if (
      !town.name &&
      province.name &&
      district.name &&
      item.name.includes("Phường") &&
      !item.name.includes("Quận")
    ) {
      setSelectedLocation((prev) => ({ ...prev, town: item }));
      return;
    }

    // Thay đổi quận
    if (
      province.name &&
      district.name &&
      !town.name &&
      item.name.includes("Quận")
    ) {
      setSelectedLocation((prev) => ({ ...prev, district: item, town: {} }));
      return;
    }

    // Thay đổi tỉnh khi đã chọn quận và chưa chọn phường
    if (
      province.name &&
      district.name &&
      !town.name &&
      !item.name.includes("Quận") &&
      !item.name.includes("Phường")
    ) {
      setSelectedLocation({ province: item, district: {}, town: {} });
      return;
    }

    // Trường hợp đã chọn tỉnh, quận, và phường
    if (province.name && district.name && town.name) {
      if (item.name.includes("Quận")) {
        setSelectedLocation((prev) => ({ ...prev, district: item, town: {} }));
      } else if (item.name.includes("Phường")) {
        setSelectedLocation((prev) => ({ ...prev, town: item }));
      } else {
        setSelectedLocation({ province: item, district: {}, town: {} });
      }
    }
  };

  const displayAddress = `${selectedLocation.province.name ||
    ""} / ${selectedLocation.district.name || ""} / ${selectedLocation.town
    .name || ""}`;

  const displayAddress_text = displayAddress
    .split(" /")
    .map((item) => item.trim());

  const renderAddressOptions = (data) => {
    return data.map((item) => {
      const isMatch = displayAddress_text.includes(item.name);

      return (
        <p
          style={isMatch ? { color: "red" } : {}}
          onClick={() => handleSelection(item)}
          key={item._id}
        >
          {item.name}
        </p>
      );
    });
  };
  const handleAddressSelection = (data) => {
    const addressList = renderAddressOptions(data);
    setAddressOptions(addressList);
  };

  useEffect(() => {
    const provinceOptions = renderAddressOptions(provinceList);
    if (provinceOptions.length > 0) {
      setAddressOptions(provinceOptions);
    }
  }, [provinceList]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = (text) => {
    setStyle(text);
  };

  return (
    <div id="provinces-districts-towns">
      <div className="d-flex provinces-districts-towns__input">
        <div className="col-11">
          <input
            onClick={handleToggleDropdown}
            type="text"
            value={displayAddress}
            readOnly
          />
        </div>
        <div className="col-1">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="provinces-districts-towns__content">
          <div className="d-flex provinces-districts-towns__title">
            <div
              style={style === "Tỉnh" ? { borderBottom: "4px solid red" } : {}}
              onClick={() => {
                handleAddressSelection(provinceList);
                handleClick("Tỉnh");
              }}
              className="provinces col-4"
            >
              Tỉnh
            </div>
            <div
              style={style === "Quận" ? { borderBottom: "4px solid red" } : {}}
              onClick={() => {
                handleAddressSelection(districtList);
                handleClick("Quận");
              }}
              className={`districts col-4 ${
                !selectedLocation.province.name ? "no-click" : ""
              }`}
            >
              Quận
            </div>
            <div
              style={style === "Huyện" ? { borderBottom: "4px solid red" } : {}}
              onClick={() => {
                handleAddressSelection(townList);
                handleClick("Huyện");
              }}
              className={`towns col-4 ${
                !selectedLocation.province.name ||
                !selectedLocation.district.name
                  ? "no-click"
                  : ""
              }`}
            >
              Huyện
            </div>
          </div>
          <div className="slider">
            <div className="slider__item"></div>
          </div>
          <div className="provinces-districts-towns__list">
            {addressOptions}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvincesDistrictTown;
