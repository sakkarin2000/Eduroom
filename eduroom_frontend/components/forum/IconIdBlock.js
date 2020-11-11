import React, { Fragment, useState } from "react";

const IconIdBlock = ({ type }) => {
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  function toggle() {
    setClick(!click);
  }
  switch (type) {
    case "like":
      return (
        <Fragment>
          <div
            onClick={() => {
              setHover(!hover);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z"
                fill={hover ? "#FB9CCB" : "#5B5B5B"}
              />
            </svg>
          </div>
        </Fragment>
      );
    case "comment":
      return (
        <Fragment>
          <div
            onClick={() => {
              setClick(!click);
            }}
          >
              <div>
              <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z"
                fill={hover ? "#FB9CCB" : "#5B5B5B"}
              />
            </svg>
              </div>
            
          </div>
        </Fragment>
      );
  }
};
export default IconIdBlock;
