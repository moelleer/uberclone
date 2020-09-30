import { useState, useEffect } from "react"

function App() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    async function getRestaurants() {
      const response = await fetch("api/restaurants")
      const json = await response.json()
      setRestaurants(json.restaurants)
    }

    getRestaurants()
  }, [])

  return (
    <>
      <div className="container px-6 mx-auto">
        <header className="flex items-center justify-between py-10">
          <div className="flex">
            <Hamburger className="w-5 h-5" />
            <Logo className="ml-6" />
            <Marker className="w-6 h-6 ml-16" />
            <span className="ml-2 font-semibold">Nacka</span>
            <Clock className="w-6 h-6 ml-12" />
            <span className="ml-2 font-semibold">Leverera nu</span>
          </div>
          <div className="flex items-center">
            <Search className="w-6 h-6" />
            <span className="ml-2 font-semibold">Sök</span>
            <span className="ml-12 font-semibold">Logga in</span>
          </div>
        </header>

        <div className="flex">
          <div className="flex px-3 py-2 font-semibold bg-gray-500 rounded-full cursor-pointer">
            <Person className="w-6 h-6 mr-1" />
            Avhämtning
          </div>

          <div className="flex px-3 py-2 ml-3 font-semibold bg-gray-500 rounded-full cursor-pointer">
            Sortera
            <ArrowDown className="w-6 h-6 ml-2" />
          </div>
          <div className="flex px-3 py-2 ml-3 font-semibold bg-gray-500 rounded-full cursor-pointer">
            Prisintervall
            <ArrowDown className="w-6 h-6 ml-2" />
          </div>
          <div className="flex px-3 py-2 ml-3 font-semibold bg-gray-500 rounded-full cursor-pointer">
            Maximal leveransavgift
            <ArrowDown className="w-6 h-6 ml-2" />
          </div>
          <div className="flex px-3 py-2 ml-3 font-semibold bg-gray-500 rounded-full cursor-pointer">
            Kost
            <ArrowDown className="w-6 h-6 ml-2" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <h2 className="text-4xl font-semibold ">
            Populärt i närheten av dig
          </h2>
          <span className="font-semibold underline cursor-pointer">
            Visa alla
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {restaurants.length ? (
            restaurants.map((restaurant, index) => (
              <Card key={index} restaurant={restaurant} />
            ))
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-10">
          <h2 className="text-4xl font-semibold ">När du är hungrig just nu</h2>
          <span className="font-semibold underline cursor-pointer">
            Visa alla
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {restaurants.length ? (
            restaurants
              .reverse()
              .map((restaurant, index) => (
                <Card key={index} restaurant={restaurant} />
              ))
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-10">
          <h2 className="text-4xl font-semibold ">Nytt på Über Eats</h2>
          <span className="font-semibold underline cursor-pointer">
            Visa alla
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {restaurants.length ? (
            restaurants
              .sort((a, b) => (a.rating < b.rating ? 1 : -1))
              .map((restaurant, index) => (
                <Card key={index} restaurant={restaurant} />
              ))
          ) : (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
        </div>
      </div>
      <footer className="p-12 mt-10 text-white bg-black">Über Eats</footer>
    </>
  )
}

function CardSkeleton() {
  return (
    <div>
      <div className="w-full h-64 bg-gray-500 rounded animate-pulse"></div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col">
          <span className="w-64 h-6 text-lg bg-gray-500 rounded animate-pulse" />
          <span className="w-32 h-3 mt-3 text-sm bg-gray-500 rounded animate-pulse" />
        </div>
        <span className="flex items-center justify-center text-sm font-semibold bg-gray-500 rounded-full h-9 w-9 animate-pulse" />
      </div>
      <div className="w-24 pt-3 mt-3 text-xs bg-gray-500 rounded animate-pulse" />
    </div>
  )
}

function Card({ restaurant }) {
  return (
    <div className="cursor-pointer">
      <img src={restaurant.img} className="object-cover w-full h-64" />
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{restaurant.title}</span>
          <span className="text-sm">49.00 kr i avgift • 10-20 min • $</span>
        </div>
        <span
          className={`flex items-center justify-center text-sm font-semibold rounded-full h-9 w-9 ${
            restaurant.rating >= 4.5
              ? "bg-green-200 text-green-600"
              : "bg-gray-500"
          } `}>
          {restaurant.rating}
        </span>
      </div>
      <div className="pt-3 mt-3 text-xs text-gray-800 border-t border-gray-500">
        Amerikanskt • Hamburgare
      </div>
    </div>
  )
}

function Hamburger({ className = "" }) {
  return (
    <svg
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}>
      <path d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z"></path>
    </svg>
  )
}

function Logo({ className = "" }) {
  return (
    <img
      className={className}
      src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg"
    />
  )
}

function Marker({ className = "" }) {
  return (
    <svg
      fill="none"
      aria-label="Leverera till"
      role="img"
      focusable="false"
      className={className}>
      <path
        d="M17.5834 5.16602C14.5001 2.08268 9.50008 2.08268 6.41675 5.16602C3.33341 8.24935 3.33341 13.3327 6.41675 16.416L12.0001 21.9993L17.5834 16.3327C20.6667 13.3327 20.6667 8.24935 17.5834 5.16602ZM12.0001 12.416C11.0834 12.416 10.3334 11.666 10.3334 10.7493C10.3334 9.83268 11.0834 9.08268 12.0001 9.08268C12.9167 9.08268 13.6667 9.83268 13.6667 10.7493C13.6667 11.666 12.9167 12.416 12.0001 12.416Z"
        fill="#000000"></path>
    </svg>
  )
}

function Clock({ className = "" }) {
  return (
    <svg
      fill="none"
      aria-label="När"
      role="img"
      focusable="false"
      className={className}>
      <path
        d="M12 2.83398C6.91671 2.83398 2.83337 6.91732 2.83337 12.0007C2.83337 17.084 6.91671 21.1673 12 21.1673C17.0834 21.1673 21.1667 17.084 21.1667 12.0007C21.1667 6.91732 17.0834 2.83398 12 2.83398ZM17 13.6673H10.3334V5.33398H12.8334V11.1673H17V13.6673Z"
        fill="#000000"></path>
    </svg>
  )
}

function Search({ className = "" }) {
  return (
    <svg
      fill="none"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}>
      <path
        d="m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z"
        fill="#000000"></path>
    </svg>
  )
}

function Arrow({ className = "" }) {
  return (
    <svg
      fill="none"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}>
      <path
        d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z"
        fill="#000000"></path>
    </svg>
  )
}

// function ArrowUp({ className = "" }) {
//   return <Arrow className={className} />
// }

function ArrowDown({ className = "" }) {
  return <Arrow className={`transform rotate-180 ${className}`} />
}

function Person({ className = "" }) {
  return (
    <svg
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}>
      <path d="M9.818 6.545a2.273 2.273 0 100-4.545 2.273 2.273 0 000 4.545z"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.364 22h3.182l1.909-3-1.637-2.545-3.454 5.546z"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.182 14.818L15.727 22h-3.273l-4.909-7.82v-3.09h-.818c-.545 0-1 .454-1 1v3.09H3v-3.09C3 10 4.727 8.363 6.727 8.363H12l4.273 4.273-1.819 1.727-3.272-3.272v3.727z"></path>
      <path d="M20.727 17.546l-1.636 1.636a1.427 1.427 0 01-2 0l-2.546-2.636 1.364-1.364 1.364-1.273.909-.909 2.545 2.636c.637.455.546 1.364 0 1.91z"></path>
    </svg>
  )
}
export default App
