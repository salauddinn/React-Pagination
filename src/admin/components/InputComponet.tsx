import { User, UserProperties } from "../AdminPanel";

interface InputComponentProps {
    currentUser: User,
    properyName: UserProperties,
    handleEdit(user: User, properyName: UserProperties,value:string): void;

}


const InputComponent = ({ currentUser, properyName ,handleEdit}: InputComponentProps) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleEdit(currentUser, properyName,e.target.value )
     
    }
    return <input type="text" value={currentUser[properyName]} onChange={(e) => handleOnChange(e)}></input>;


}
export default InputComponent;