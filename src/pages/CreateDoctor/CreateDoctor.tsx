import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateDoctorType } from "../../@type/featureInterface";
import { addDoctor } from "../../api/doctorApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/Store";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const formSchema = yup.object({
  name: yup.string().required("Enter your doctors name"),
  specialization: yup.string().required("enter your doctors specialization"),
  fees: yup.number().required("fees is required"),
  avilableSlots: yup
    .array(
      yup.object({
        date: yup
          .mixed<(typeof days)[number]>()
          .oneOf(days)
          .required("date are required"),
        time: yup.string().required(""),
      }),
    )
    .required("avilable slots"),
});

const CreateDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDoctorType>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<CreateDoctorType> = async (data) => {
    console.log(data);
    try {
      const response = await dispatch(addDoctor(data)).unwrap();
      console.log(response);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <form
          className="row justify-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-12 col-md-6 mb-3">
            <input
              className="w-100 h-100 rounded-3 px-2 py-2"
              placeholder="Type Your Name"
              type="text"
              {...register("name", { required: true })}
            />
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <input
              className="w-100 h-100 rounded-3 px-2 py-2"
              placeholder="Doctors Specialization"
              type="text"
              {...register("specialization", { required: true })}
            />
            <p className="text-danger">{errors.specialization?.message}</p>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <input
              className="w-100 h-100 rounded-3 px-2 py-2"
              placeholder="Type Fees"
              type="number"
              {...register("fees", { required: true, valueAsNumber: true })}
            />
            <p className="text-danger">{errors.fees?.message}</p>
          </div>
          {/* Date */}
          <div className="col-12 col-md-6 mb-3">
            <select
              className="w-100 h-100 rounded-3 px-2 py-2"
              {...register("avilableSlots.0.date")}
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <p className="text-danger">
              {errors.avilableSlots?.[0]?.date?.message
                ? "Fees is required"
                : ""}
            </p>
          </div>

          {/* Time */}
          <div className="col-12 col-md-6 mb-3">
            <input
              className="w-100 h-100 rounded-3 px-2 py-2"
              type="time"
              {...register("avilableSlots.0.time")}
            />
            <p className="text-danger">
              {errors.avilableSlots?.[0]?.time?.message}
            </p>
          </div>

          <div className="col-12 text-center mt-3">
            <button
              className="btn btn-primary py-2 px-3 fs-4"
              style={{ width: "fit-content" }}
              type="submit"
            >
              Create Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;
