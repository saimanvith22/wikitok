import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LikedArticlesProvider } from './contexts/LikedArticlesContext'
import { FavoritesProvider } from "./contexts/FavoritesContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LikedArticlesProvider>
    <FavoritesProvider>
      <App />
      </FavoritesProvider>
    </LikedArticlesProvider>
  </StrictMode>,
)
