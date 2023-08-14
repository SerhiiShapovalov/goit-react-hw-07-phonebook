import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { addContact } from './operations';
import { deleteContact } from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

export const { updateFilter } = contactsSlice.actions;
