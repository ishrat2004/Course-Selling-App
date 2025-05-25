import React from 'react'
import "./Firstbox.css"
const Firstbox = () => {
  return (
    <div>
        <div> 
            <Image_and_content /> 
        </div>
        <div> 

        </div>
    </div>
  )
}
export function Image_and_content(){ 
    return <div> 
        <div className="first_div"> 
              <img src="./assets/first_image.jpg"  />
        </div>
        <div class="overlay">
    <h1>Your Heading Text</h1>
  </div>

    </div>
}
export default Firstbox