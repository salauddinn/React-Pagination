import { useState } from 'react'
import { User, UserProperties } from './AdminPanel'
import TableRow from './TableRow'

interface TableContainerProps {
  users: User[]
  isDeletePressed: boolean
  handleDelete(user: User): void
  handleEdit(user: User, propertyName: UserProperties, value: string): void
}
const TableContainer = ({
  users,
  isDeletePressed,
  handleDelete,
  handleEdit,
}: TableContainerProps) => {
  const [checkAll, setCheckAll] = useState(false)

  const handleCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckAll(e.target.checked)
  }
  return (
    <>
      {' '}
      <table className="admin-table">
        <thead>
          <tr>
            <th className="cell">
              <input
                type="checkbox"
                checked={checkAll}
                onChange={handleCheckAllChange}
              />
            </th>
            <th className="cell">Name</th>
            <th className="cell">Email</th>
            <th className="cell">Role</th>
            <th className="cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((currentUser) => (
            <TableRow
              key={currentUser.id}
              currentUser={currentUser}
              checkAll={checkAll}
              setCheckAll={setCheckAll}
              handleDelete={handleDelete}
              isDeletePressed={isDeletePressed}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TableContainer
