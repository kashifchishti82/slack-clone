export default function SidebarChannel() {
    return (
        <div className="w-60 bg-gray-800 text-white flex flex-col py-4 px-4">
            <h2 className="text-lg font-bold">Channels</h2>
            <ul className="mt-2 space-y-1">
                <li className="py-2 px-3 bg-gray-700 rounded cursor-pointer"># general</li>
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"># random</li>
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer"># dev-talk</li>
            </ul>

            <h2 className="text-lg font-bold mt-4">Direct Messages</h2>
            <ul className="mt-2 space-y-1">
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">User 1</li>
                <li className="py-2 px-3 hover:bg-gray-700 rounded cursor-pointer">User 2</li>
            </ul>
        </div>
    )
}