import UserAccountData from "./UserAccountData"
import WelcomeForm from "./WelcomeForm"

import './UserAccount.css'
import React from "react"

const UserAccount = ({handleSingout, handleInputChange, userdata, welcomeFormWeight, welcomeFormActive, welcomeFormFat, errorMessage, handleConfirmWelcomeForm, foodToAddName, foodToAddCalories, handleAddMeal, currentUser, handleRemoveMeal, foodTodayList}) => {
    
    const isFormConfirmed = userdata ? userdata.isWelcomeFormConfirmed : null
    
    return (
            <section className="userAccountContainer">
                <button onClick={handleSingout} className='singout'>Wyloguj się</button>
                {!userdata && <h1>Waiting...</h1>}
                {isFormConfirmed === false && 
                <WelcomeForm 
                    handleInputChange={handleInputChange} 
                    welcomeFormWeight={welcomeFormWeight}
                    welcomeFormActive={welcomeFormActive}
                    welcomeFormFat={welcomeFormFat}
                    errorMessage={errorMessage}
                    handleConfirmWelcomeForm={handleConfirmWelcomeForm}
                />}
                {isFormConfirmed === true && 
                <UserAccountData
                    userdata={userdata}
                    handleInputChange={handleInputChange}
                    handleAddMeal={handleAddMeal}
                    foodToAddName={foodToAddName}
                    foodToAddCalories={foodToAddCalories}
                    currentUser={currentUser}
                    handleRemoveMeal={handleRemoveMeal}
                    foodTodayList={foodTodayList}
                />}
            </section>
    )
}

export default UserAccount