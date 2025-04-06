


export default function Layout({ children }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-indigo-50 h-screen p-4">
            <div className="hidden lg:block h-full bg-indigo-600 p-6 rounded-lg">
                <span className="font-extrabold text-3xl bg-indigo-50 px-2 rounded-lg text-indigo-600">CollabNotes</span>
                <div className="h-[90%]">
                    <img className="h-full w-full object-cover" src="/man-using-mobile-app.svg" alt=""/>
                </div>
            </div>
            <div className="h-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}