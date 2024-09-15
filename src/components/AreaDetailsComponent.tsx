import React from "react";
import { AreaDetailsClass } from "../classes/AreaDetailsClass";

export const AreaDetailsComponent = (props:any) =>
{

  let area=props.area; 

 return( 
      <div>
      <h2>{area.name}</h2>
      <p>{area.description}</p> 
      <span>{area.feelsLike<20?"🥶":(area.feelsLike>30?"🥵":"😎")}</span>
      <ul>
        <li>{area.temp}°C</li>
        <li>{area.feelsLike}°C</li>
        <li>{area.humidity}%</li>
      </ul>
    </div>
       )
};