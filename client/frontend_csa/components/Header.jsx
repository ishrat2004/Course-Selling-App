import React, { useEffect, useState } from 'react'
import './Header.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import About from '../components/About'
import Careers from '../components/Careers'
import Testimonials from '../components/Testimonials'
import { set } from 'mongoose';
const Header = () => { 
  return ( 
    <div > 
        <BrowserRouter> 
          <Routes>  
            <Route index element={ <Top/>} /> 
            <Route path="about" element={ <About/> } /> 
            <Route path="careers" element={<Careers/> } /> 
            <Route path="testimonials" element={<Testimonials/> } />
          </Routes> 

        </BrowserRouter> 
    </div>
  )
}
export function Top(){
     const [visible, setVisible] = useState(false); 
     const navigate=useNavigate(); 
      const changes = ["courses", "teachers", "skills", "more..."];
  const [index, setIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("Search for courses");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % changes.length;
        setPlaceholder("Search for " + changes[newIndex]);
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);
  return ( 

    <div className="header"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header_image">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg> 
        <h1 >LearnHub</h1>
        <a className="browse_anchor" onClick={()=>{setVisible(temp=>!temp)}}>    
            <span style={{color:visible?"blue":"black" }}>Browse</span>
            <div> 
            <img src="https://static.thenounproject.com/png/1123247-200.png" width="25" height="25" style={{paddingLeft:"5px" }} /> 
            </div>
        </a> 
        {visible && <div >Hello Hey there </div> }
        <div className="search_box"> 
           <img src="https://img.icons8.com/ios7/512/search.png" width="25" height="25" style={{marginTop:"10px"}}/> 
           <input type="text" placeholder={placeholder} className="search_input_box" /> 
        </div>  
        {/*  */}
        <a className="top_anchors" onClick={()=>{navigate("/about")}}>
            <span> About </span> </a> 
        <a className="top_anchors" onClick={()=>{navigate("/careers")}}>
            <span> Careers </span> </a> 
        <a className="top_anchors" onClick={()=>{navigate("/testimonials")}}>
            <span> Testimonials </span> </a> 
    </div>
  )
}
export default Header