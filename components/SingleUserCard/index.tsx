import Image from "next/image";
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {  selectUserById, updateUser } from "../../redux/usersSlice";
import DeleteDialogBox from "../DeleteDialogBox";

const SingleUserCard = ({uId, selectedUserId, setSelectedUserId}) => {

  const dispatch = useDispatch()
  const reduxUser = useSelector(state => selectUserById(state.users, uId))

  // this user State is used as buffer state editing purpose so 
  // if user wants to clicks cancel then i reset this to redux store state user.
  const [tempUser, setTempUser] = useState(() => {
    if (reduxUser) {
      const tu = {...reduxUser}
      const b = new Date(tu.dob) 
      const today = new Date()
      const age = today.getFullYear() - b.getFullYear()
      tu.age = age
      return tu
    }
    return {}
  })
  const [isDataActuallyChanged, setIsDataActuallyChanged] = useState(false)
  const genderOption = [
    "male",
    "female",
    "transgender",
    "rather not say",
    "other"
  ]
  
  useEffect(() => {
    if (reduxUser) {
      const tu = {...reduxUser}
      const b = new Date(tu.dob) 
      const today = new Date()
      const age = today.getFullYear() - b.getFullYear()
      tu.age = age
      tu.name = `${tu.first} ${tu.last}`
      setTempUser(tu)
    }
  }, [reduxUser])

  // state for editable mode
  const [isEditableMode, setIsEditableMode] = useState(false)
  useEffect(() => {
    const keys = Object.keys(reduxUser)
    let key;
    let flag = false
    for (key of keys) {
      console.log("asd", key, reduxUser[key], tempUser[key])
      if (reduxUser[key] !== tempUser[key]) {
        if ( tempUser[key] === "") {
          flag = false
          break
        }
        flag = true
        break
      }
    }
    const d = new Date(reduxUser.dob)
    const t = new Date()
    const age = t.getFullYear() - d.getFullYear()
    flag =  flag || tempUser.age !== "" && age !== tempUser.age 
    setIsDataActuallyChanged(flag)
  }, [tempUser, reduxUser])

  // useEffect for user clicks on other user 
  useEffect(() => {
    if (selectedUserId !== uId) {
      setIsEditableMode(false)
      setIsDataActuallyChanged(false)
      const tu = {...reduxUser}
      const b = new Date(tu.dob) 
      const today = new Date()
      const age = today.getFullYear() - b.getFullYear()
      tu.age = age
      tu.name = `${tu.first} ${tu.last}`
      setTempUser(tu)
    }
  }, [selectedUserId])

  const descriptionTextAreaRef = useRef(null)
  useEffect(() => {
    if (descriptionTextAreaRef.current) {
      descriptionTextAreaRef.current.style.height = "0px";
      const scrollHeight = descriptionTextAreaRef.current.scrollHeight;
      descriptionTextAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [ descriptionTextAreaRef.current, tempUser?.description, selectedUserId])


  useEffect(() => {
    if (isEditableMode) {
    const userNameInput = document.getElementById("user-name-input")
    userNameInput.style.width = (tempUser.name.length + 1) + "ch"
    }
  }, [tempUser.name, isEditableMode])

  
  const toggleStateHandler = () => {
    if (!isEditableMode){
      if (tempUser.id === selectedUserId) {
        setSelectedUserId(false)
      }else  {
        setSelectedUserId(tempUser.id)
      }
    }
  }

  const userNameInputRef = useRef(null)

  // state for showing delete dialog box
  const [showDeleteDialogBox, setShowDeleteDialogBox] = useState(false)
  // useEffect to make show delete dialogbox closes just incase the selecteduid changes
  useEffect(() => {
    setShowDeleteDialogBox(false)
  }, [selectedUserId])
  
  return (
    <div className="flex flex-col border p-1 m-1 my-2 rounded-md w-[400px]" >
      {/* top bar section */}
      <div onClick={toggleStateHandler} className="flex flex-row justify-between" >
        <div className="flex flex-row">
          <Image src={tempUser.picture} width={50} height={50} className="rounded-full" alt={`${tempUser.first + tempUser.last} profile image`} />
          {
            !isEditableMode? (
              <span className="pl-3 self-center">{tempUser.first} {tempUser.last}</span>
            ): (
              <input ref={userNameInputRef} id="user-name-input" className={`pl-1 ml-2 self-center border  focus:outline-none rounded-md `} type={"text"} value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name:e.target.value, first: e.target.value.split(" ")[0], last: e.target.value.split(" ")[1]})} />
            )
          }
        </div>
        <div className="self-center">
          {
            selectedUserId === tempUser.id ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            ): (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            )
          }
        </div>
      </div>


      {/* extra details section */}
      {
        tempUser.id === selectedUserId ? (
          <div className="flex flex-col">
            {/* firs row details  */}
            <div className="flex flex-row  mt-2 place-content-around">
              {/* age */}
              <div className="flex flex-col mx-2 w-full">
                <div>Age</div>
                <div className="border rounded-md pl-1">
                  <input type={"number"} disabled={!isEditableMode} value={tempUser.age} onChange={(e) => setTempUser({...tempUser, age: e.target.value ? parseInt(e.target.value): e.target.value})} className="w-10" /> Years
                </div>
              </div>
              {/* gender */}
              <div className="flex flex-col mx-2 w-full">
                <div>Gender</div>
                {
                  !isEditableMode ? (
                <div className="border rounded-md pl-1">{tempUser.gender}</div> 
                  ): (
                    <div className="w-full" >
                      <select className="bg:none active:outline-0" value={tempUser.gender} onChange={(e) => setTempUser({...tempUser, gender: e.target.value})} >
                        {
                          genderOption.map(gender => (
                            <option key={gender} value={gender} >{gender[0].toUpperCase()}{gender.slice(1,gender.length)}</option>
                          ))
                        }
                      </select>
                    </div>
                  )
                }
              </div>
              {/* Country */}
              <div className="flex flex-col mx-2 w-full">
                <div>Country</div>
                <div className="border rounded-md pl-1">
                  <input type={"text"} disabled={!isEditableMode} value={tempUser.country} onChange={(e) => !(/[0-9]/).test(e.target.value) ?  setTempUser({...tempUser, country: e.target.value}) : null} className="w-full"  />
                </div>
              </div>
            </div>

            {/* description  */}
            <div className="mt-2 mx-2">
              <span>Description</span>
              <div>
                <textarea ref={descriptionTextAreaRef} disabled={!isEditableMode} value={tempUser.description} onChange={(e) => setTempUser({...tempUser, description: e.target.value})} className="w-full " />
              </div>
            </div>

            {/* extra section delete and edit icons and accept and cancel icons for edit mode */}
            <div className="flex flex-row self-end	m-2	">
              {
                !isEditableMode ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6 m-1 cursor-pointer" onClick={() => setShowDeleteDialogBox(true)}>
                      <path strokeLinecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={tempUser.age >= 18 ? "blue": "black"} className="w-6 h-6 m-1 cursor-pointer" onClick={() => tempUser.age >= 18 ?  setIsEditableMode(true) : null}>
                      <path strokeLinecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </>
                ): (
                  <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-6 h-6 m-1 cursor-pointer" onClick={() => {
                    setIsEditableMode(false)
                    
                    const tu = {...reduxUser}
                    const b = new Date(tu.dob) 
                    const today = new Date()
                    const age = today.getFullYear() - b.getFullYear()
                    tu.age = age
                    tu.name = `${tu.first} ${tu.last}`
                    setTempUser(tu)
                  }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={isDataActuallyChanged ? `green` : 'black'} className="w-6 h-6 m-1 cursor-pointer" onClick={() => {
                    if (isDataActuallyChanged) {
                      // update user
                      const updatedUser = {...tempUser}
                      delete updatedUser['name']
                      const d = new Date(updatedUser.dob)
                      const today  = new Date()
                      d.setFullYear(today.getFullYear()-updatedUser.age)
                      updatedUser.dob = `${d.getFullYear()}-${`0${d.getMonth()+1}`.slice(-2)}-${`0${d.getDate()}`.slice(-2)}`
                      delete updatedUser['age']

                      dispatch(updateUser(updatedUser))
                      
                      setIsEditableMode(false)
                    }
                  }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </>
                )
              }


            </div>
          </div>
        ): null
      }

      {
        showDeleteDialogBox ? <DeleteDialogBox uId={uId} setShowDeleteDialogBox={setShowDeleteDialogBox} /> : null
      }
      
    </div>
  )
}

export default SingleUserCard;

