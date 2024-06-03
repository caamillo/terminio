import { useEffect, useRef, useState } from "react"
import commands from "../terminio/commands"

const preCmd = "user@Terminio ~ "

export default function Terminio({ label }) {

    const [ cmd, setCmd ] = useState("")
    const [ text, setText ] = useState([])
    const contentRef = useRef()

    const exec = commands(setText)

    const handleInput = ({ key }) => {
        if (key === 'Enter') {
            const out = exec(cmd)
            setText(txt => [
                ...txt,
                {
                    message: `${ preCmd }${ cmd }`,
                    error: false
                },
                {
                    message: out.message,
                    error: out.error
                }
            ])
            setCmd("")
            contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' })
            return
        }
        if (key === 'Backspace' && key.length > 0) return setCmd(txt => txt.slice(0, -1))
        if (key.length > 1) return
        setCmd(txt => txt + key)
    }

    useEffect(() => {
        document.addEventListener('keydown', handleInput)
        return () => document.removeEventListener('keydown', handleInput)
    })

    return (
        <div className="w-[800px] font-rubik bg-[#00000080] backdrop-blur-md rounded-lg absolute top-5 left-5 z-50 overflow-hidden">
            <div className="w-full h-7 bg-black relative">
                <p className="text-slate-200 font-medium text-xs absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">{ label }</p>
                <div className="flex items-center gap-2 absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="size-2.5 rounded-full bg-red-500"></div>
                    <div className="size-2.5 rounded-full bg-yellow-500"></div>
                    <div className="size-2.5 rounded-full bg-green-500"></div>
                </div>
            </div>
            <div className="text-white">
                <div ref={ contentRef }  className="overflow-y-auto overflow-hidden h-[350px] relative">
                    <div className="content-text w-full text-gray-600 space-y-1 absolute top-0 left-0 h-full p-3">
                        {
                            text.map(({ message, error }, i) =>
                                <p className={`break-all ${ error ? 'i-error': '' }`} key={ i }>{ message }</p>
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-2 px-3 py-2">
                    <p className="break-all font-medium">{ preCmd }<span className="text-slate-300 font-normal">{ cmd }</span></p>
                </div>
            </div>
        </div>
    )
}