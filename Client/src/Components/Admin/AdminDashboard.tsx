import Statistics from "./Statistics"

function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">

      <div className="items-center p-2">
        <p className="text-3xl font-light">Dashboard</p>
      </div>

      <Statistics />
    </div>
  )
}

export default AdminDashboard