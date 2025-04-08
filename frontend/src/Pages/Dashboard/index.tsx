import AddResume from "./components/AddResume"

function DashboardPage() {
    return (
        <div className="p-10 md:px-20 lg:px-32">
            <h2 className="front-bold text-3xl">My Resumme</h2>
            <p>Start creating AI resume to your next job role</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10">
                <AddResume/>
            </div>
        </div>
    )
}

export default DashboardPage