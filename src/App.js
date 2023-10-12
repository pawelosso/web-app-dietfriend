import './App.css';
import React from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, update, remove} from "firebase/database";
import firebaseConfig from './firebaseConfig';

import UserAccount from './UserAccount';
import LoginForm from './LoginForm';

import background from './background.png'

class App extends React.Component{
  
  state = {
    email:'',
    password:'',
    registerEmail:'',
    registerPassword:'',
    secondRegisterPassword:'',
    isUserLogged:null,
    currentUser:'',
    userdata: '',
    welcomeFormWeight:'',
    welcomeFormActive:'',
    welcomeFormFat:'',
    errorMessage:'',
    foodToAddName:'',
    foodToAddCalories:'',
    foodTodayList:[],
  }


  handleSingIn = e => {
    e.preventDefault()
    const auth = getAuth()
    const {email, password} = this.state
    
    if(email && password){
      signInWithEmailAndPassword(auth, email, password)
      .then(res => this.setState({
        currentUser: res.user.uid,
        registerEmail:'',
        registerPassword:'',
        email:'',
        password:'',
        errorMessage:'',
      }))
      .catch(err=> {
        this.setState( prevstate => {
          return {errorMessage: {...prevstate.errorMessage, errorMessageLogin:'Nieprawidłowe dane!'}}
        })
        console.log(err.code)
      })
    } else this.setState( prevstate => {
        return {errorMessage: {...prevstate.errorMessage, errorMessageLogin:'Uzupełnij formularz!'}}
      })  
  }


  handleSingout = () => {
    const auth = getAuth()
    signOut(auth)
  }
  

  handleRegister = e => {
    e.preventDefault()
    const {registerEmail, registerPassword} = this.state
    if(registerEmail && registerPassword){
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then(result => {
          const userid = result.user.uid
          const db = getDatabase()
          set((ref(db, userid)), {
            isWelcomeFormConfirmed:false,
          })
          this.setState({
            registerEmail:'',
            registerPassword:'',
            email:'',
            password:'',
            errorMessage:'',
          })
        })
        .catch(err => {
          this.setState( prevstate => {
            return {errorMessage: {...prevstate.errorMessage, errorMessageRegister:'Nieprawidłowe dane!'}}
          })
          console.log(err.code)
        })
    } else this.setState( prevstate => {
        return {errorMessage: {...prevstate.errorMessage, errorMessageRegister:'Uzupełnij formularz!'}}
      })  
  }


  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }


  checkCurrentUser = () => {
    const auth = getAuth()
      onAuthStateChanged(auth, user => { 
      const isUserLogged = user ? true : false;
      const currentUser = user? user.uid : ''
      this.setState({
        isUserLogged,
        currentUser,
      })
      if(user) {
        this.checkActualDate(currentUser)
        this.downloadData(currentUser)
      }
      else this.setState({currentUser, userdata:''})
    })
  }


  checkActualDate = (currentUser) => {
    const date = new Date()
    const fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    const db = getDatabase()
    const refDbData = ref(db, currentUser)
    
    onValue(refDbData, result => {
      const date = result.val().date
      if(!date) console.log('brak daty')
      else if(date !== fullDate) {
        const updates = {}
        updates[currentUser + '/foodToday'] = '';
        updates[currentUser + '/date'] = fullDate;
        updates[currentUser + '/caloriesToday'] = 0;
        return update(ref(db), updates)
      }
    })
  }


  downloadData = userid => {
    const db = getDatabase();
    const refDb = ref(db, userid )
    onValue(refDb, data => {
      const userdata = data.val()
      this.setState({
        userdata
      })
    })

    const refDbFoodToday = ref(db, userid + '/foodToday')
    onValue(refDbFoodToday, data=> {
      this.setState({foodTodayList:[]})
        const foodTodayList = []
        data.forEach(item => {
          foodTodayList.push({
            key:item.key,
            name:item.val().name,
            calories:item.val().calories,
          })
        })
        this.setState({foodTodayList})
      })
    }


  handleConfirmWelcomeForm = e => {
    e.preventDefault()
    const {
      welcomeFormWeight, 
      welcomeFormActive, 
      welcomeFormFat,
      currentUser
    } = this.state
    
    if(welcomeFormWeight, welcomeFormActive, welcomeFormFat){  
      const caloriesBilans = (welcomeFormWeight * 22) * welcomeFormActive + parseInt(welcomeFormFat)
      const db = getDatabase()
      const date = new Date()
      
      set(ref(db, currentUser),{
        caloriesBilans,
        date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
        isWelcomeFormConfirmed: true,
        caloriesToday:0,
        foodToday:'',
      })
      this.setState({errorMessage: ''})
    }
    else this.setState({errorMessage: 'Uzupełnij formularz!'})
  }


  handleAddMeal = e => {
    const {foodToAddName, foodToAddCalories, currentUser, userdata} = this.state
    
    if(foodToAddName && foodToAddCalories){
      const db = getDatabase()
      const foodToAddRef = ref(db, currentUser + '/foodToday')

      const foodToAddNameFormat = foodToAddName.toLowerCase()

      set(push(foodToAddRef), {
        name:foodToAddNameFormat,
        calories: foodToAddCalories,
      })

      const updateCalories = {}
      updateCalories[currentUser + '/caloriesToday'] = userdata.caloriesToday + parseFloat(foodToAddCalories)
      
      update(ref(db), updateCalories)
      this.setState({foodToAddName:'', foodToAddCalories:''})
    }
  }


  handleRemoveMeal = e => {
    const key = e.target.parentNode.id
    const calories = e.target.parentNode.getAttribute('data-calories')
    const { currentUser, userdata } = this.state

    const db = getDatabase()
    const refDb = ref(db, currentUser + '/foodToday' + `/${key}`)
    remove(refDb)

    const updates = {}
    updates[currentUser + '/caloriesToday'] = userdata.caloriesToday - calories 
    return update(ref(db), updates)
  }


  componentDidMount() {
    initializeApp(firebaseConfig)
    this.checkCurrentUser()
  }


  render() {
    const {isUserLogged} = this.state
    const titleContent = !isUserLogged? 
    {content:'Wejdź na wyższy poziom z ', spancontent:'DietFriend'} : 
    {content:'Witaj ', spancontent:'user'}
    
    return(
      <section className='app'>
        <img src={background} alt={'background'}/>
        {isUserLogged === null && <h1>Wczytywanie...</h1>}
        {isUserLogged === true && 
          <UserAccount 
            titleContent={titleContent}
            userdata={this.state.userdata} 
            currentUser={this.state.currentUser}
            handleSingout={this.handleSingout}
            handleInputChange={this.handleInputChange}
            handleConfirmWelcomeForm={this.handleConfirmWelcomeForm}
            handleAddMeal={this.handleAddMeal}
            handleRemoveMeal={this.handleRemoveMeal}
            welcomeFormWeight={this.state.welcomeFormWeight}
            welcomeFormActive={this.state.welcomeFormActive}
            welcomeFormFat={this.state.welcomeFormFat}
            errorMessage={this.state.errorMessage}
            foodToAddName={this.state.foodToAddName}
            foodToAddCalories={this.state.foodToAddCalories}
            foodTodayList={this.state.foodTodayList}
          />}
        {isUserLogged === false && 
          <LoginForm 
            titleContent={titleContent}
            handleSingIn={this.handleSingIn} 
            handleRegister={this.handleRegister}
            handleInputChange={this.handleInputChange}
            email = {this.state.email}
            password = {this.state.password}
            registerEmail={this.state.registerEmail}
            registerPassword={this.state.registerPassword}
            secondRegisterPassword={this.state.secondRegisterPassword}
            errorMessage={this.state.errorMessage}
          />}
      </section>
    )
  }
}

export default App;
