import { User, UserProperties } from './AdminPanel'
import CheckComponent from './components/CheckComponent'
import InputComponent from './components/InputComponet'
import deleteIcon from './assets/delete.png'
import editIcon from './assets/edit.png'
import { useEffect, useState } from 'react'
import './TableRow.css'

interface TableRowProps {
  currentUser: User
  checkAll: boolean
  setCheckAll(input: boolean): void
  handleDelete: (user: User) => void
  isDeletePressed: boolean
  handleEdit: (user: User, properyName: UserProperties, value: string) => void
}
const TableRow = ({
  currentUser,
  checkAll,
  setCheckAll,
  handleDelete,
  isDeletePressed,
  handleEdit,
}: TableRowProps) => {
  const [editMode, setEditMode] = useState(false)
  const [isChecked, setIsChecked] = useState(checkAll)

  const handleEditMode = () => {
    setEditMode(!editMode)
  }
  return (
    <tr key={currentUser.id} className={isChecked?"checked-row":'un-checked'}>
      <td className="cell">
        <CheckComponent
        checkAll={checkAll}
          setIsChecked={setIsChecked}
          setCheckAll={setCheckAll}
          currentUser={currentUser}
          handledelete={handleDelete}
          isDeletePressed={isDeletePressed}
        />
      </td>
      <td className="cell">
        {editMode ? (
          <>
            <InputComponent
              currentUser={currentUser}
              handleEdit={handleEdit}
              properyName={UserProperties.NAME}
            />
          </>
        ) : (
          currentUser.name
        )}
      </td>
      <td className="cell">
        {editMode ? (
          <>
            <InputComponent
              currentUser={currentUser}
              handleEdit={handleEdit}
              properyName={UserProperties.EMAIL}
            />
          </>
        ) : (
          currentUser.email
        )}
      </td>
      <td className="cell">
        {editMode ? (
          <>
            <InputComponent
              currentUser={currentUser}
              handleEdit={handleEdit}
              properyName={UserProperties.ROLE}
            />
          </>
        ) : (
          currentUser.role
        )}
      </td>
      <td className="cell">
        <img
          src={editIcon}
          onClick={() => handleEditMode()}
          width={44}
          height={44}
          alt="delte"
        />

        <img
          src={deleteIcon}
          onClick={() => handleDelete(currentUser)}
          width={44}
          height={44}
          alt="delte"
        />
      </td>
    </tr>
  )
}
export default TableRow;