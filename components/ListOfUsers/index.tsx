import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useGetUsersQuery } from "../../redux/baseApiSlice"
import { selectAllUsers, selectUserIdsFilteredByName } from "../../redux/usersSlice"
import SingleUserCard from "../SingleUserCard"

const ListOfUser = () => {
  // const {data: users= []} = useGetUsersQuery({});
  const searchQuery = useSelector(state => state.search.value)
  const userIds = useSelector(state => selectUserIdsFilteredByName(state.users, searchQuery))

  
  const [selectedUserId, setSelectedUserId] = useState(false)
  
  return (
    <div className="flex flex-col">
      {userIds.map((uId) => <SingleUserCard key={uId} uId={uId} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}  />)}
    </div>
  )
}

export default ListOfUser