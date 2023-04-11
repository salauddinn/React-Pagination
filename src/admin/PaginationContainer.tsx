import { useEffect, useState } from 'react'
import { User } from './AdminPanel'
import './PaginationContainer.css'

interface PaginationContainerProps {
  totalSize: number
  totalPages: number
  setIsDeletePressed: (input: boolean) => void
  setUsers(users: User[]): void
  allUsers: User[]
}
const PaginationContainer = ({
  totalSize,
  totalPages,
  setIsDeletePressed,
  setUsers,
  allUsers,
}: PaginationContainerProps) => {
  const [startFrom, setStartFrom] = useState(0)
  useEffect(() => {
    const currentPages = startFrom + 10
    if (currentPages <= allUsers.length) {  
      setUsers(allUsers.slice(startFrom, startFrom + 10))
    }
  }, [startFrom, totalSize])

  const handleNext = () => {
    const currentPage = (startFrom + 10) / 10
    if (currentPage <= totalPages) {
      setStartFrom(startFrom + 10)
    }
  }

  const handlePrev = () => {
    setStartFrom(startFrom - 10)
  }

  const handleDelete = () => {
    setIsDeletePressed(true)
  }
  const handleStart = () => {
    setStartFrom(0)
  }
  const handleEnd = () => {
    setStartFrom(totalSize - 10)
  }

  return (
    <div className="pagination-container">
      <div>
        <button
          className="button"
          disabled={startFrom === 0}
          onClick={handleStart}
        >
          {'<<'}
        </button>
        <button
          className="button"
          disabled={startFrom === 0}
          onClick={handlePrev}
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }).map((_, index) => {
          console.log(index*10 === startFrom,index,startFrom)
          return <button
            key={index}
            className={index*10 === startFrom?"current-button":"button"}
            onClick={() => {

              console.log({startFrom})
              setStartFrom(index * 10)
            }}
          >
            {index + 1}
          </button>
})}
        <button
          className="button"
          disabled={startFrom + 10 >= totalSize}
          onClick={handleNext}
        >
          {'>'}
        </button>
        <button
          className="button"
          disabled={startFrom + 10 >= totalSize}
          onClick={handleEnd}
        >
          {'>>'}
        </button>
      </div>
      <div>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer
