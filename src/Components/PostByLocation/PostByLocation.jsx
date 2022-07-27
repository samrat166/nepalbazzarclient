import React from "react";
import { useState } from "react";
import PostsByLocation from "../Common/PostsByLocation";
import TypeWriterEffect from "../Common/TypeWriterEffect";
import "./PostByLocation.css";
const PostByLocation = () => {
  const [location, setLocation] = useState([
    {
      location: "Dharan",
      image:
        "https://www.nepaltrekking.com/wp-content/uploads/2019/04/99999-975x540.jpg",
      province: "Province 1",
      city: "Dharan",
    },
    {
      location: "Kathmandu",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjXRPyH64cmT7LSCApLPno8VF5rFjzZZtf6R7WqR0ZhHB_soz-7DK-Cl-DdE6HkaIaUzQ&usqp=CAU",
      province: "Bagmati Pradesh",
      city: "Kathmandu",
    },
    {
      location: "Pokhara",
      image:
        "https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/things-to-do-in-pokhara-1581667474-785X440.jpg",
      province: "Gandaki Pradesh",
      city: "Pokhara",
    },
    {
      location: "Butwal",
      image: "https://pbs.twimg.com/media/EyJFC1iVIA48FmG.jpg",
      province: "Lumbini Pradesh",
      city: "Butwal",
    },
  ]);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <TypeWriterEffect
            staticTitle={"We are now available,"}
            dynamicTitle={"All over Nepal"}
          />
          <div className="flex mt-5 justify-center flex-wrap -m-4">
            {location.map(({ location, image, province, city }) => {
              return (
                <PostsByLocation
                  location={location}
                  image={image}
                  province={province}
                  city={city}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostByLocation;
