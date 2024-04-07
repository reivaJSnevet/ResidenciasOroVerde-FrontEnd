import RolesTable from "./components/RolesTable"
import AddRole from "./components/AddRol"
import { useState } from "react"


function Roles() {
    const [reset, setReset] = useState(false)

  return (
    <>
      <div className="m-10 shadow-lg">
        <div className="mb-2">
          <AddRole reset={reset} setReset={setReset} />
        </div>
        <div className="">
            <RolesTable reset={reset} setReset={setReset} />
        </div>
      </div>
    </>
  )
}

export default Roles