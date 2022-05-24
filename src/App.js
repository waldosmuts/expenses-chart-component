import { useEffect, useState } from "react"
import data from "./data.json"

const Logo = () => {
  return (
    <a className="hover:rotate-180 transition duration-300" href=".">
      <svg className="h-10 md:h-12" width="72" height="48" viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle fill="#382314" cx="48" cy="24" r="24" /><circle stroke="#FFF" strokeWidth="2" cx="24" cy="24" r="23" /></g></svg>
    </a>
  )
}

const App = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    setChartData(data)
  }, [])

  function getHighestExpense() {
    if (!chartData.length) return
    return chartData.reduce((highestExpense, currentExpense) => (highestExpense > currentExpense.amount) ? highestExpense : currentExpense.amount)
  }

  const chartElements = chartData.map(item => {
    const highestExpense = getHighestExpense()
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const currentDay = weekdays[new Date().getDay()]

    return (
      <div key={item.day} className="flex flex-col">
        <div className="flex flex-col justify-end h-36 md:h-40">
          <div
            className={`${currentDay === item.day ? "bg-cyan" : "bg-soft-red"} chart--bar w-full rounded relative flex justify-center hover:bg-opacity-60 cursor-pointer transition-all duration-300`}
            style={{ height: `${(item.amount / highestExpense) * 100}%` }}>
            <aside
              className="bg-dark-brown text-pale-orange absolute -top-[52px] font-dm-sans text-lg p-2 rounded z-10 opacity-0 transition duration-300"
            >${item.amount}</aside>
          </div>
        </div>
        <span
          className="font-dm-sans text-xs md:text-base text-medium-brown text-center mt-3 md:mt-2"
        >{item.day}</span>
      </div>
    )
  })

  return (
    <div className="bg-cream py-16 md:py-44 px-4 flex flex-col min-h-screen">
      <header className="bg-soft-red p-5 md:px-10 md:py-6 rounded-xl md:rounded-3xl flex justify-between items-center w-full max-w-[550px] mx-auto">
        <div className="font-dm-sans text-pale-orange">
          <h2 className="font-normal text-[15px] md:text-lg">My balance</h2>
          <h3 className="font-bold text-2xl md:text-3xl md:mt-3">$921.48</h3>
        </div>
        <Logo />
      </header>
      <main className="bg-pale-orange mt-4 md:mt-6 p-5 md:p-10 rounded-xl md:rounded-3xl w-full max-w-[550px] mx-auto">
        <h2 className="font-dm-sans font-bold text-2xl md:text-[32px] text-dark-brown">Spending - Last 7 days</h2>
        <div className="grid grid-cols-7 place-content-end gap-3 md:gap-5 mt-16">
          {chartElements}
        </div>
        <div className="h-0 w-full border-y border-cream mt-6" />
        <section className="font-dm-sans flex justify-between mt-6">
          <div>
            <h2 className="text-medium-brown md:text-lg">Total this month</h2>
            <h3 className="text-3xl font-bold text-dark-brown md:text-5xl md:mt-2">$478.33</h3>
          </div>
          <div className="flex flex-col items-end justify-end mt-6">
            <h3 className="font-bold text-dark-brown md:text-xl">+2.4%</h3>
            <h2 className="text-medium-brown md:text-lg">from last month</h2>
          </div>
        </section>
      </main>
      <footer className="flex flex-col items-center bg-cyan hover:bg-dark-brown text-pale-orange text-sm py-4 rounded-xl mt-4 transition duration-300 w-full max-w-[550px] mx-auto">
        <span>Challenge By <a className="font-bold hover:text-soft-red" href="https://www.frontendmentor.io/" target="_blank" rel="noreferrer">Frontend Mentor</a>.</span>
        <span>Coded By <a className="font-bold hover:text-soft-red" href="https://github.com/waldosmuts" target="_blank" rel="noreferrer">Waldo Smuts</a>.</span>
      </footer>
    </div>
  )
}
export default App