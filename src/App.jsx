import Terminio from "./components/Terminio"

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-neutral-800">
      <Terminio
        label='pisellino.sh'
      />
    </div>
  )
}