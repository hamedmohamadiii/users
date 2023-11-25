const Input = ({name,value,lable,onChangee}) => {
    return ( <>
         <div className="mb-3">
            <label htmlFor="email">{lable}:</label>
            <input
            onChange={onChangee}
            value={value} 
            name={name}
              id={name}
              type="text"
              className="form-control"
            ></input>
          </div>
  
    </> );
}
 
export default Input;