import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListOfUser from "../components/ListOfUsers";
import SearchBar from "../components/SearchBar";
import {baseApiSlice, useGetUsersQuery} from "../redux/baseApiSlice";
import { addManyUser } from "../redux/usersSlice";

export default function Home() {
  const dispatch = useDispatch()
  const {data:users} = useGetUsersQuery({}) 

  useEffect(() => {
    if (users) {
      dispatch(addManyUser(users))
    }
  }, [users])
  
  
  return (
    // app container 
    <div className="w-full flex justify-center">
    <div className="flex flex-col mt-1 ">
      {/* SearchBar component */}
      <SearchBar />
        
      {/* list of User component */}
        <ListOfUser />
    </div>
  </div>
  )
}


