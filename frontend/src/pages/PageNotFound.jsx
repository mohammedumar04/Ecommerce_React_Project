import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
        The page you&apos;re looking for may have moved or doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Back to shop
      </Link>
    </main>
  )
}

export default PageNotFound
