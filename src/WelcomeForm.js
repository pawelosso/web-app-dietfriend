
const WelcomeForm = ({handleInputChange, welcomeFormWeight, welcomeFormActive, welcomeFormFat, errorMessage, handleConfirmWelcomeForm}) =>{
    return(
        <form className="welcomeForm" onSubmit={handleConfirmWelcomeForm}>
           <p>Uzupełnij formularz, a my wyliczymy twój bilans kaloryczny</p>
           <input type='number' name='welcomeFormWeight' value={welcomeFormWeight} placeholder='waga (kg)' onChange={handleInputChange}/> 
           <div className="welcomFormRadio">
                <div>
                    <label>
                        Siedzący
                        <input type='radio' name='welcomeFormActive' value='1.3' checked={welcomeFormActive === '1.3'} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Umiarkowanie aktywny
                        <input type='radio' name='welcomeFormActive' value='1.5' checked={welcomeFormActive === '1.5'} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Aktywny
                        <input type='radio' name='welcomeFormActive' value='1.7' checked={welcomeFormActive === '1.7'} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Bardzo aktywny
                    <input type='radio' name='welcomeFormActive' value='1.9' checked={welcomeFormActive === '1.9'} onChange={handleInputChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        Chcę schudnąć
                        <input type='radio' value={'-300'} name='welcomeFormFat' checked={welcomeFormFat === '-300'} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Chcę utrzymać obecną masę ciała
                        <input type='radio' value={'0'} name='welcomeFormFat' checked={welcomeFormFat === '0'} onChange={handleInputChange}/>
                    </label>
                    <label>
                        Chcę nabyć więcej masy ciała
                        <input type='radio' value={'+300'} name='welcomeFormFat' checked={welcomeFormFat === '+300'} onChange={handleInputChange}/>
                    </label>
                </div>
            </div>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <input type='submit' value='zatwierdź'/>
        </form>
    )
}

export default WelcomeForm