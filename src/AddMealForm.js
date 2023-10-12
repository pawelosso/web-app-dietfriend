
const AddMealForm = ({handleShowForm, handleAddMeal, foodToAddName, foodToAddCalories, handleInputChange}) => {
    
    const submitForm = e => {
        e.preventDefault()
        if(foodToAddName && foodToAddCalories) handleShowForm()
        handleAddMeal()
    }

    return(    
        <div className='addMeal'>
            <form onSubmit={submitForm}>
                <h2>Dodaj posiłek</h2>
                <input type='text' placeholder='Nazwa posiłku' name='foodToAddName' value={foodToAddName} onChange={handleInputChange}/>
                <input type='number' placeholder='Liczba kalorii' name='foodToAddCalories' value={foodToAddCalories} onChange={handleInputChange}/>
                    <div>
                        <input type='submit' value='Dodaj'/>
                        <input type='button' value='Anuluj' onClick={handleShowForm}/>
                    </div>
            </form>
        </div>
    )
}

export default AddMealForm