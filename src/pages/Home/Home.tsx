import { useEffect, useState } from "react";
import { doctorCall } from "../../api/doctorApi";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/Store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<RootState | null>();

  useEffect(() => {
    const getAllDoctor = async () => {
      try {
        const doctor = await dispatch(doctorCall()).unwrap();
        setData(doctor);
        return doctor;
      } catch (error) {
        return error;
      }
    };
    getAllDoctor();
  }, [dispatch]);

  return (
    <section className="py-4">
      <div className="container">
        <div className="row">
          {data &&
            data?.map((elm: any, index: number) => {
              return (
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="card mb-3 p-2 text-center" key={index}>
                    <h2>{elm.name}</h2>
                    <div>{elm.specialization}</div>
                    <div>{elm.fees}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Home;
