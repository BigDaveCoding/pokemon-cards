

export default function InputText({onChange, className = '', id='', placeholder='text input', label_text = ''}) {
    return (
        <>
            <label htmlFor={id}>{label_text}</label>
            <input onChange={onChange} type="text" id={id} name={id} placeholder={placeholder} className={className} />
        </>
        
    )

}