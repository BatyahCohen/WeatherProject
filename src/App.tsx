import "./bootstrap.css";
import "./style.css";
import { AreaDetailsComponent } from "./components/AreaDetailsComponent";
import { AreaDetailsClass } from "./classes/AreaDetailsClass";
import { useState } from "react";

function App() 
{
  const [areas, setAreas] = useState<Array<AreaDetailsClass>>
  ([
    new AreaDetailsClass("אילת","",0,50,0,34.951925,29.557669),
    new AreaDetailsClass("אלסקה","",0,-5,0,149.4937,64.2008),
    new AreaDetailsClass("לונדון","",0,10,0,0.1278,51.5074),
    new AreaDetailsClass("ניו יורק","",0,25,0,74.0060,40.7128),
  ]);

  return (
    <div className="App" >
      {areas?.map((area:AreaDetailsClass)=>(
        <div key={area.name}>
          <AreaDetailsComponent area={area}></AreaDetailsComponent>
        </div>
      ))}
    </div>
  );
}

export default App;
