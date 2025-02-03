

export default function Grid({className="grid grid-cols-1", children }){
    return (
        <div className={className}>
            {children}
        </div>
    )
}