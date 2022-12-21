import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchQuery } from "../../redux/searchSlice"

const SearchBar = () => {

  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.search.value)
  
  
  
  return (
    <div className="flex flex-row p-2 gap-x-3 m-2 min-w-[400px] ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <input type={"text"} value={searchQuery} onChange={(e) => dispatch(changeSearchQuery(e.target.value))} placeholder="Search User" className="focus:outline-0" />
    </div>
  )
}

export default SearchBar