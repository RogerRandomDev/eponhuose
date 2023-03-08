import React,{useState,useEffect} from 'react'
import '../AdminPage.module.css'
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";

const AdminPage=() => {
  const [isChecked,setIsChecked]=useState(false);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#808" : "#fff",
    borderColor: isChecked ? "#808" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );
  
  const [clicked,setClicked]=useState(false);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <div className={windowWidth<640?`grid sm:grid-cols-[6fr_4fr] grid-rows-1 min-h-screen`:`grid  lg:${clicked?'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen':'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'} `}>
      <div className={windowWidth<640? `${clicked? '':'flex text-center justify-center min-w-full font-extrabold text-2xl '} bg-pink-400 `:`bg-pink-400 w-full`}>
        Map
      </div>
      <div className={windowWidth<640? ` text-white fixed sm:static sm:block bg-blue-600 w-full min-h-screen w-auto top-1/4 p-4 duration-500 transition ${clicked? 'translate-y-[33rem]':'translate-y-[-8rem]'}`:`static bg-blue-600 min-h-screen w-full p-4 duration-500 transform text-white`} >
        
        <form>
         <label className='align-center'>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
              }}
              className="inline-block"
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`inline-block mr-1 checkbox ${isChecked ? "checkbox--active" : ""} w-5 h-5 rounded-sm`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
            </animated.svg>
              Don't you dare to check me!
    </label>
        </form>

      </div>
    </div>
  )
}

export default AdminPage