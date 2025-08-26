import { useFavorites } from "../contexts/FavoritesContext";

export default function FavoritesPanel({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const { favorites, remove, clear } = useFavorites();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="absolute right-0 top-0 h-full w-[min(420px,100%)] bg-white dark:bg-zinc-900 p-4 overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Favorites ({favorites.length})</h2>
          <div className="space-x-2">
            {favorites.length > 0 && (
              <button className="px-2 py-1 text-sm border rounded" onClick={clear}>
                Clear
              </button>
            )}
            <button className="px-2 py-1 text-sm border rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        {favorites.length === 0 ? (
          <p className="opacity-70">No favorites yet. Tap the ♥ button on any article to save it.</p>
        ) : (
          <ul className="space-y-3">
            {favorites.map((f) => (
              <li key={String(f.id)} className="border rounded-lg p-3">
                <a
                  className="font-medium hover:underline"
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {f.title}
                </a>
                {f.extract && (
                  <p className="text-sm mt-1 line-clamp-2 opacity-80">{f.extract}</p>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    className="px-2 py-1 text-sm border rounded"
                    onClick={() => remove(f.id)}
                  >
                    Remove
                  </button>
                  <a
                    className="px-2 py-1 text-sm border rounded"
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
