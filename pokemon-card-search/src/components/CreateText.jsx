

export default function CreateText({tag = 'p', className = '', text = ''}) {
    const Tag = tag
    return <Tag className={className}>{text}</Tag>
}