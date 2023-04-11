import { useEffect, useState } from 'react'
import { User } from '../AdminPanel'
interface CheckComponentProps {
  currentUser: User
  isDeletePressed: boolean
  handleDelete(users: User): void
  setCheckAll(checkAll: boolean): void
  checkAll: boolean
  setIsChecked(input: boolean): void
}
const CheckComponent = ({
  isDeletePressed,
  handleDelete,
  checkAll,
  currentUser,
  setCheckAll,
  setIsChecked,
}: CheckComponentProps) => {
  const [isChecked, setIsCheckedState] = useState(checkAll)
  useEffect(() => {
    if (isChecked) {
      handleDelete(currentUser)
      setCheckAll(false)
    }
  }, [isDeletePressed])
  useEffect(() => {
    setIsCheckedState(checkAll)
    setIsChecked(checkAll)
  }, [checkAll])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked
    setIsCheckedState(newCheckedState)
    setIsChecked(newCheckedState)
  }
  return (
    <>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
    </>
  )
}
export default CheckComponent
