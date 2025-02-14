import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../../assets/images/weather.png";
import guideImg from "../../assets/images/guide.png";
import customatizationImg from "../../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: customatizationImg,
    title: "Save Memories",
    desc: "We provide you a place where you can save your memories",
  },
  {
    imgUrl: weatherImg,
    title: "Storage Usage",
    desc: "We provide you an exclusive storage limit of 25MB to use",
  },
  {
    imgUrl: guideImg,
    title: "Network Usage",
    desc: "We provide you an exclusive daily network usage limit of 50MB",
  },
  
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
