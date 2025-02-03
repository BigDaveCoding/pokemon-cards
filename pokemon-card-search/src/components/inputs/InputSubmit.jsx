

export default function InputSubmit({className = '', value = 'default value'}){
    return (
        <>
            <input type="submit" className = {className} value={value} />
        </>
    )
}