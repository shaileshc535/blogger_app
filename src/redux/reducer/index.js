import { combineReducers } from "redux";
import bannerReducer from "./bannerReducer";

const rootReducer = combineReducers({
  Banners: bannerReducer,
});

export default rootReducer;
