import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import Spinner from "../components/Spinner"
import GoalItem from '../components/GoalItem'



function Dashboard() {

  // Data from Redux - authSlice state
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isError) {
      console.log(message);
    }

    if(!user) {
      navigate("/login")
    } else {
      dispatch(getGoals())
    }

    return () => dispatch(reset())
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p> Goals Dashboard</p>
      </section>

      <GoalForm />
      
      <section className='content'>
        {goals.length > 0 ? (
              <div>
                  {goals.map(goal => (
                    <GoalItem key={goal._id} goal={goal} />
                  ) )}
              </div>
          )
        : (
          <h3>You haven't set any goals. Add one!</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard