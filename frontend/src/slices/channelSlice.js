import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState();

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelAdapter.addOne,
    addChannels: channelAdapter.addMany,
    removeChannel: channelAdapter.removeOne,
    renameChannel: channelAdapter.updateOne,
  },
});

export const { actions } = channelSlice;

export const { addChannel, addChannels, removeChannel, renameChannel } = channelSlice.actions;
export const channelSelector = channelAdapter.getSelectors((state) => state.channels);

export default channelSlice.reducer;