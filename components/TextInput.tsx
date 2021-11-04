export default function TextInput({id,placeholder,onChange,value}) {
    return (
        <input
						className="appearance-none border-2 border-gray-300 rounded w-full py-1 px-3 focus:outline-none focus:bg-white focus:border-darkgreen
                         leading-10  font-poppins text-base font-normal"
						id={id}
						type="text"
						placeholder={placeholder}
                        onChange={onChange}
                        value={value}
					/>
    )
}