export default function Home() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl max-w-3xl text-balance font-light md:leading-14 text-indigo-900 mb-4">
            Bienvenue sur <span className="text-white px-2 rounded-lg font-extrabold bg-indigo-600">CollabNotes</span> notre application de gestion de notes collaboratives
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            La gestion des notes n'a jamais été aussi simple !!!
          </p>

          <div className="space-x-4">
            <a
                href="/login"
                className="px-6 py-3 bg-indigo-600 border-2 border-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-800 transition-all"
            >
              Se connecter
            </a>
            <a
                href="/register"
                className="px-6 py-3 bg-transparent border-2 border-indigo-600 text-indigo-600 text-lg rounded-lg hover:bg-indigo-800 hover:text-white transition-all"
            >
              S'inscrire
            </a>
          </div>
        </div>
      </div>
  );
}
