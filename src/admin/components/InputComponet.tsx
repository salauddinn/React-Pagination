import { User, UserProperties } from '../AdminPanel'

interface InputComponentProps {
  currentUser: User
  propertyName: UserProperties
  handleEdit(user: User, propertyName: UserProperties, value: string): void
}

const InputComponent = ({
  currentUser,
  propertyName,
  handleEdit,
}: InputComponentProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEdit(currentUser, propertyName, e.target.value)
  }
  return (
    <input
      type="text"
      value={currentUser[propertyName]}
      onChange={(e) => handleOnChange(e)}
    ></input>
  )
}
export default InputComponent
