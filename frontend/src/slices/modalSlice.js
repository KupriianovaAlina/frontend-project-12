import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { type: null, chatId: null },
  reducers: {
    openModal: (state, action) => ({ type: action.payload.type, chatId: action.payload.chatId || null }),
    closeModal: () => ({ type: null, chatId: null }),
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;