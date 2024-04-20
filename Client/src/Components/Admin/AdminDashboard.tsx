import Chart from "./Chart"
import Statistics from "./Statistics"

function AdminDashboard() {
  return (
    <div className="flex flex-col">
      <Statistics />

      <div>
        <Chart />
      </div>

    </div>
  )
}

export default AdminDashboard