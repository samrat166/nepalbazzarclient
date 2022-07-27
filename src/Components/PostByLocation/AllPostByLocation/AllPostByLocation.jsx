import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../Posts/ItemCard/ItemCard";

const AllItemCardByLocation = () => {
  const { location } = useParams();
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-full w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover h-full w-full rounded "
              alt="hero"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2021/09/12/1631439748521-fef2e98073d6429fb3b26483301df70a.png"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-14 md:pl-10 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {location}
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              ullam quasi omnis qui ea. Nemo non similique modi a, eos vel
              consectetur. Asperiores necessitatibus ipsa culpa sequi odio
              possimus repellat!
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-yellow-600 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-lg">
                Learn more..
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-1">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-3 mx-auto">
            <div className="flex flex-wrap -m-4">
              <ItemCard
                category="Pets"
                date="27 June,2022"
                price="20,500"
                desc="Husky Puppies are on sale || High demand"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOA2kMRnA2jQDq7Y0SdKBEW1sBA8r72sJisw&usqp=CAU"
              />
              <ItemCard
                category="House and Land"
                date="23 March,2021"
                price="2,30,50,500"
                desc="Newly Built House on sale"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKWH7kDUdY1LQDMofsDXnzjPzYjtHRxwwDP-jxzCGD_6Y5NUm7IVe29Ja5CXypVfMtpc&usqp=CAU"
              />
              <ItemCard
                category="Automobile"
                date="3 April,2022"
                price="30,50,500"
                desc="Ferrari on sell||Brand New"
                image="https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg"
              />
              <ItemCard
                category="Automobile"
                date="30 July,2021"
                price="30,50,500"
                desc="Pulsar 150 in good condition on sale"
                image="https://gaadiwaadi.com/wp-content/uploads/2019/09/bajaj-pulsar-125-classic-side-1068x610.jpg"
              />
              <ItemCard
                category="Mobile Phones"
                date="12 December,2022"
                price="34,000"
                desc="Brand new Mi 11 lite on sale || Dharan"
                image="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202106/mi12.jpg?qpibktYCXd1QUlYKi_vbey0fhntevcqT&size=770:433"
              />{" "}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllItemCardByLocation;
