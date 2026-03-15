import React, { useEffect } from "react";
import { doctorCall } from "../../api/doctorApi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/Store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((data) => data?.doctor);

  const getAllDoctor = async () => {
    try {
      const doctor = await dispatch(doctorCall()).unwrap();
      console.log(doctor);
      return doctor;
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    const response = getAllDoctor();
    
  }, []);


  return <div>Home Page</div>;
};

export default Home;
