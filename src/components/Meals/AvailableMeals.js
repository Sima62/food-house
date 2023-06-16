import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [loading,setIsloading]=useState(true);
  const[error,setError]=useState();

  useEffect(() => {
   
    const fetchMeals = async () => {

      const response = await fetch(
        "https://react-http-2247f-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsloading(false);
    };
  
      fetchMeals().catch((error)=>{
         setIsloading(false);
         setError(error.message);
      });

  }, []);

  return (
    <section className="meals">
    {loading && <section>
      <p>Loading....</p>
    </section>}
    {error && <section>
      <p>Hello</p>
    </section>}
       
      <ul>
        <Card>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </Card>
      </ul>
    </section>
  );
};
export default AvailableMeals;
