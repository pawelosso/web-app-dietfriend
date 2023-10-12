import { useState } from "react";
import AddMealForm from "./AddMealForm";

const UserAccountData = ({userdata, handleInputChange, foodToAddName, foodToAddCalories, handleAddMeal, currentUser, handleRemoveMeal, foodTodayList}) => {

    const {caloriesBilans, caloriesToday} = userdata
    const percent = Math.floor(caloriesToday/caloriesBilans * 100)  
    const caloriesToEat = caloriesBilans - caloriesToday
    const [addMealShow, setAddMealShow] = useState(false)
    const color = percent < 50 ? 'green' : percent < 70? 'yellow' : 'red'    

    return(
        <section className='userAccountDataContainer'>
            <section className='info-bar'>
                <p className='caloriesToday'>{caloriesToday} z {caloriesBilans} kcal</p>
                <div className='statusContainer'>
                    <div className={`${color}`}>
                        <p>{percent} %</p>
                        <div className='statusBar'>
                            <span className={color} style={{width:percent}}></span>
                        </div>
                    </div>
                    {percent < 100 && <div className={color}>Zostało ci {caloriesToEat} kcal</div> }
                    {percent === 100 && <div className={color}>Osiągnięto bilans kaloryczny</div> }
                    {percent > 100 && <div className={color}>Przekroczono bilans kaloryczny</div> }
                </div>
            </section> 
            <section className='foodTodayContainer'>
            {foodTodayList.map((item, index) => 
                <div className='list-part' key={index} id={item.key} data-calories={item.calories}>
                    <p>{item.name}</p>
                    <p className='calories'>{item.calories} kcal</p>
                    <div onClick={handleRemoveMeal}></div>
                </div>
            )}
            </section>
            <button onClick={()=> setAddMealShow(!addMealShow)}>Dodaj</button>
            {addMealShow ? 
                <AddMealForm
                    handleShowForm={()=> setAddMealShow(!addMealShow)}
                    handleInputChange={handleInputChange}
                    foodToAddName={foodToAddName}
                    foodToAddCalories={foodToAddCalories}
                    handleAddMeal={handleAddMeal}
                /> 
            : null}
        </section>
    )
}

export default UserAccountData