import { useEffect, useState } from 'react'
import { User } from '../AdminPanel'
interface CheckComponentProps {
  currentUser: User
  isDeletePressed: boolean
  handledelete(users: User): void
  setCheckAll(checkAll: boolean): void
  checkAll: boolean
  setIsChecked(input: boolean): void
}
const CheckComponent = ({
  isDeletePressed,
  handledelete,
  checkAll,
  currentUser,
  setCheckAll,
  setIsChecked,
}: CheckComponentProps) => {
  const [check, setCheck] = useState(checkAll)
  useEffect(() => {
    if (check) {
      handledelete(currentUser)
      setCheckAll(false)
    }
  }, [isDeletePressed])
  useEffect(() => {
    setCheck(checkAll)
    setIsChecked(checkAll)
  }, [checkAll])
  return (
    <>
      <input
        type="checkbox"
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked)
          setIsChecked(e.target.checked)
        }}
      />
    </>
  )
}
export default CheckComponent
