import React from "react";
import { AreaDetailsClass } from "../classes/AreaDetailsClass";
import "./AreaDetailsComponent.css"

export const AreaDetailsComponent = (props:any) =>
{
  //שליפת המידע שנשלח מקומפוננטת האבא
  let area=props.area; 

  return( 
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading custom-panel-heading">
            <div className="panel-title-container">
              <div className="text-container">
                <h2 className="panel-title">{area.name}</h2>
                <p className="description-text">{area.description}</p>
              </div>
              <span className="weather-icon">
                {area.feelsLike<20?"🥶":(area.feelsLike>30?"🥵":"😎")}
              </span>
            </div>
          </div>
          <div className="panel-body">
            <table className="table">
              <thead>
                <tr>
                  <th> לחות</th>
                  <th>טמפ' מורגשת</th>
                  <th>טמפ' נמדדת</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{area.humidity}%</td>
                  <td>{area.feelsLike}°C</td>
                  <td>{area.temp}°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
       )
};