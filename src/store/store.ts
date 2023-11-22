import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { apiCard } from './slices/card-api.slice';
import { cardsSlice } from './slices/card.slice';

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  [apiCard.reducerPath]: apiCard.reducer,
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiCard.middleware);
    },
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
