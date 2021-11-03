export default function TextInput({id,placeholder,onChange}) {
    return (
        <input
						className="appearance-none border-2 border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:bg-white focus:border-darkgreen
                         leading-10  font-poppins text-lg font-normal"
						id={id}
						type="text"
						placeholder={placeholder}
                        onChange={onChange}
					/>
    )
}