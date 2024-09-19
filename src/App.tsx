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

  //פונקציה אסינכרונית המקבלת קווי אורך ורוחב ומחזירה מידע מהשרת מהו מזג האוויר באזור זה
  async function ApiConnect(lat:any,lon:any) {
    try {
      const apiKey = 'abc79528bbc77eafa1af5743ad2318e1'; 

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric&lang=he`;
     
      //response המידע שחוזר הוא מסוג
      let response = await fetch(url);

      //null במידה והתגובה מהשרת נכשלה נחזיר 
      if(!response.ok){
        console.error(response.status);
        return null
      }

     //json המרת המידע שהתקבל מהשרת לאוביקט
      let responseJson = await response.json();
     
      console.log(responseJson)
      
      return responseJson;
    } 
    catch (error) {
      console.error(error);
      alert("יש בעיה בטעינת המידע מהשרת, אנא נסה שוב מאוחר יותר")
      return null
    }
  }
  
  //פונקציה אסינכרונית המעדכנת את מערך האזורים במידע המתקבל מהשרת
  async function updatedAreasByApi () {
   
    // יצירת מערך מקומי שיחזיק את כל האזורים המעודכנים
    // רק לאחר שיושלמו כל הקריאות לשרת יוחזר המערך בשלמותו promise.all מכיוון שאני משתמשת ב
    const updatedAreas:Array<AreaDetailsClass> = await Promise.all(  
      areas.map(async (area) => {
        //קבלת מידע מהשרת על האזור הנוכחי
        const responseJson = await ApiConnect(area.lat, area.lon);
      
        // היתה בעיה בשליפה מהשרת ולכן נחזיר את האזור הנוכחי כמו שהוא- שלא יוצג בגלל ההתניה null אם המידע הוא 
        if(responseJson==null)
          return area

        //יצירת אוביקט אזור מעודכן עפ"י המידע שהתקבל מהשרת והחזרתו למערך המקומי 
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
   
    //עדכון מערך האזורים במידע שהתקבל מהשרת
    setAreas(updatedAreas)
  }
 
 //פונקציה המתבצעת בעת טעינת הדף
  useEffect(() => {
    updatedAreasByApi() 

    //שיקרא לפונקציה המעדכת את מזג האויר בכל רבע שעה interval יצירת 
    const interval = setInterval(() => {
        updatedAreasByApi()   
    }, 900000);
   
  }, []);


  return (
    <div className="container">
      <div className="row">
      {areas?.map((area:AreaDetailsClass)=>(
        <div key={area.name} className="col-sm-6">
          {/* רק במידה וחזר מידע מהשרת ארצה להציג את נתוני מזג האויר 
          לכן אבדוק האם הנתונים שונים מהנתונים הראשוניים (והבלתי אפשריים) שאני הזנתי */}
        {area.temp!=500 && <AreaDetailsComponent area={area}></AreaDetailsComponent>}
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
