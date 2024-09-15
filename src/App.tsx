import "./bootstrap.css";
import "./style.css";
import { AreaDetailsComponent } from "./components/AreaDetailsComponent";
import { AreaDetailsClass } from "./classes/AreaDetailsClass";
import { useEffect, useState } from "react";

function App() 
{
  const [areas, setAreas] = useState<Array<AreaDetailsClass>>
  ([
    new AreaDetailsClass("אילת","",500,500,500,34.951925,29.557669),
    new AreaDetailsClass("אלסקה","",500,500,500,149.4937,64.2008),
    new AreaDetailsClass("לונדון","",500,500,500,0.1278,51.5074),
    new AreaDetailsClass("ניו יורק","",500,500,500,74.0060,40.7128),
  ]);

  async function ApiConnect(lat:any,lon:any) {
    try {
      const apiKey = 'abc79528bbc77eafa1af5743ad2318e1'; 

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric&lang=he`;

      let response = await fetch(url);
     
      let responseJson = await response.json();
     
      console.log(responseJson)
      
      return responseJson;
    } 
    catch (error) {
      console.error(error);
      alert("יש בעיה בטעינת המידע מהשרת, אנא נסה שוב מאוחר יותר")
    }
  }
  
  const updatedAreasByApi = async () => {
   
    const updatedAreas:Array<AreaDetailsClass> = await Promise.all(  
      areas.map(async (area) => {
        const responseJson = await ApiConnect(area.lat, area.lon);
      
        return new AreaDetailsClass(
          area.name,
          responseJson.weather[0].description,
          responseJson.main.temp,
          responseJson.main.feels_like,
          responseJson.main.humidity,
          area.lon,
          area.lat
        );
      })
    );
   
    setAreas(updatedAreas)
  }
 
 
  useEffect(() => {
    updatedAreasByApi() 
    
    const interval = setInterval(() => {
        updatedAreasByApi()   
    }, 900000);
   
  }, []);


  return (
    <div className="App" >
      {areas?.map((area:AreaDetailsClass)=>(
        <div key={area.name}>
        {area.temp!=500 && <AreaDetailsComponent area={area}></AreaDetailsComponent>}
        </div>
      ))}
    </div>
  );
}

export default App;
