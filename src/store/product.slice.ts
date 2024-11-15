import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface ProductState {
  products: IProduct[];
  favorites: string[];
  searchResults: IProduct[];
  favouriteProducts: IProduct[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  searchResults: [],
  favouriteProducts: [],
  loading: false,
  error: null,
};
// load products
export const loadProducts = createAsyncThunk(
  "product/loadProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/product");
      if (res.status === 200) {
        return res.data.products;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load products");
    }
  }
);

export const loadFavouriteProducts = createAsyncThunk(
  "product/loadFavouriteProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/product/favourite"
      );
      if (res.status === 200) {
        return res.data.products;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load products");
    }
  }
);

// search products
export const searchProductsByQuery = createAsyncThunk<IProduct[], string>(
  "product/searchByQuery",
  async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/product/search?q=${query}`
      );

      if (response.status === 200) {
        return response.data.products;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
);

// Async thunk to save favorites to the database
export const toggleFavourite = createAsyncThunk<string, string>(
  "product/saveFavorites",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/product/favourite/${id}`,
        {
          id: id,
        }
      );
      if (response.status === 200) {
        return id; // Return updated favorites if save is successful
      } else {
        return rejectWithValue("Failed to save favorites to the database");
      }
    } catch (error) {
      return rejectWithValue("An error occurred while saving favorites");
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error occurred while loading products";
      })
      .addCase(loadFavouriteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadFavouriteProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadFavouriteProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error occurred while loading favourite products";
      })
      // Handle search by query
      .addCase(searchProductsByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProductsByQuery.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchProductsByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        const favoriteId = action.payload;
        const index = state.favorites.findIndex((id) => id === favoriteId);

        if (index !== -1) {
          state.favorites.splice(index, 1);
        } else {
          state.favorites.push(favoriteId);
        }

        // Save updated favorites to localStorage
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        state.loading = false;
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selector
export const selectSearchResults = (state: RootState) =>
  state.products.searchResults;
export const selectProducts = (state: RootState) => state.products.products;
export const selectFavorites = (state: RootState) => state.products.favorites;
export const selectFavoritesProducts = (state: RootState) =>
  state.products.favouriteProducts;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;

export default productSlice.reducer;
