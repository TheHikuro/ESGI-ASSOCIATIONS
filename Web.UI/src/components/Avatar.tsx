interface IAvatarProps {
    initial: string
    large?: boolean
    color?: string
    subInfo?: string
}

export const Avatar = ({ initial, large, color, subInfo }: IAvatarProps) => {

    const getInitial = (initial: string) => {
        const initials = initial.match(/\b\w/g) || []
        return (
            (initials.shift() || '') + (initials.pop() || '')
        )
    }

    return (
        <>
            <div className="flex justify-start items-center ">
                <span className="flex rounded-full text-center justify-center avatar-text" style={{ background: color ? color : 'rgb(69, 154, 170)', width: large ? 66 : 49, height: large ? 66 : 49, fontSize: large ? 26 : 20 }}>{getInitial(initial)}</span>
                <div className="flex flex-col">
                    <span className="ml-2">{initial}</span>
                    {subInfo && <span className="text-sm ml-2">{subInfo}</span>}
                </div>
            </div>
        </>
    )
}