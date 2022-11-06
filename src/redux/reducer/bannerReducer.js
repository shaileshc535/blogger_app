import {
  ADD_BANNER_FAIL,
  ADD_BANNER_REQUEST,
  ADD_BANNER_SUCCESS,
  BANNER_VISIBLE_FAIL,
  BANNER_VISIBLE_REQUEST,
  BANNER_VISIBLE_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  FIND_ALL_BANNER_FAIL,
  FIND_ALL_BANNER_REQUEST,
  FIND_ALL_BANNER_SUCCESS,
  FIND_ONE_BANNER_FAIL,
  FIND_ONE_BANNER_REQUEST,
  FIND_ONE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
} from "../constant/bannerConstant";

const initialState = {
  loading: false,
  action: "Cab",
  result: [],
  response: {},
  singledata: [],
  msg: "",
  error: "",
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_BANNER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FIND_ALL_BANNER_SUCCESS:
      return {
        ...state,
        result: action.result.data,
        loading: action.payload,
        msg: action.msg,
      };
    case FIND_ALL_BANNER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        result: state.result.filter(
          (item) => item.id !== action.result.data.id
        ),
        response: action.result.msg,
        loading: action.payload,
        msg: action.msg,
      };
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case ADD_BANNER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_BANNER_SUCCESS:
      return {
        ...state,
        result: state.result.concat(action.result.data),
        response: action.result.msg,
        loading: action.payload,
        msg: action.msg,
      };
    case ADD_BANNER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case UPDATE_BANNER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        result: state.result.map((item) =>
          item.id === action.result.data.id ? action.result.data : item
        ),
        response: action.result.msg,
        singledata: [],
        loading: action.payload,

        msg: action.msg,
      };
    case UPDATE_BANNER_FAIL:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case BANNER_VISIBLE_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case BANNER_VISIBLE_SUCCESS:
      return {
        ...state,
        result: state.result.map((item) =>
          item.id === action.result.data.id ? action.result.data : item
        ),
        response: action.result.msg,
        singledata: [],
        loading: action.payload,

        msg: action.msg,
      };
    case BANNER_VISIBLE_FAIL:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case FIND_ONE_BANNER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FIND_ONE_BANNER_SUCCESS:
      return {
        ...state,
        singledata: action.result.data,
        loading: action.payload,
        msg: action.msg,
      };
    case FIND_ONE_BANNER_FAIL:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    default:
      return state;
  }
};

export default bannerReducer;
