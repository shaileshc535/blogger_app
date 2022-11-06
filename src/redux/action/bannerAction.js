import axios from "axios";
import { toast } from "react-toastify";
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

// Find All Vehicle OWNER
const loadAllBanner = () => {
  return function (dispatch) {
    dispatch({
      type: FIND_ALL_BANNER_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadAllBannerPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: FIND_ALL_BANNER_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadAllBannerPre = (data) => {
  return {
    type: FIND_ALL_BANNER_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Find Single Vehicle
const loadSingleBanner = (id, result) => {
  return function (dispatch) {
    dispatch({
      type: FIND_ONE_BANNER_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner/${id}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadSingleBannerPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: FIND_ONE_BANNER_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadSingleBannerPre = (data) => {
  return {
    type: FIND_ONE_BANNER_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// add New Vehicle
const createBanner = (data) => {
  return function (dispatch) {
    dispatch({
      type: ADD_BANNER_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner`,
      method: "POST",
      data: data,

      headers: {
        Accept: "multipart/form-data",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(createBannerPre(res.data));
        dispatch(loadAllBanner());
      })
      .catch((error) => {
        dispatch({
          type: ADD_BANNER_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
        toast.danger("Failed To Create The Banner!");
      });
  };
};
export const createBannerPre = (data) => {
  toast.success("Banner Created Successfully!");

  return {
    type: ADD_BANNER_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// update Vehicle OWNER
const updateBanner = (id, data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_BANNER_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner/${id}`,
      method: "POST",
      data: data,
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(updateBannerPre(res.data));
        dispatch(loadAllBanner());
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_BANNER_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
        toast.danger("Failed To Update The Banner!");
      });
  };
};
export const updateBannerPre = (data) => {
  toast.success("Banner Updated Successfully!");

  return {
    type: UPDATE_BANNER_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// delete assign subject to class
const deleteBanner = (id, result) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_BANNER_REQUEST,
      payload: result,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner-delete/${id}`,
      method: "POST",
      data: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(deleteBannerPre(res.data));
        dispatch(loadAllBanner());
      })
      .catch((error) => {
        dispatch({
          type: DELETE_BANNER_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const deleteBannerPre = (data) => {
  toast.error("Banner Deleted Successfully!");
  return {
    type: DELETE_BANNER_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// visible
const visibleBanner = (id, result) => {
  return function (dispatch) {
    dispatch({
      type: BANNER_VISIBLE_REQUEST,
      payload: result,
    });

    let OPTION = {
      url: `http://103.145.51.109:3010/admin/banner-visible/${id}`,
      method: "POST",
      data: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(visibleBannerPre(res.data));
        dispatch(loadAllBanner());
      })
      .catch((error) => {
        dispatch({
          type: BANNER_VISIBLE_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const visibleBannerPre = (data) => {
  toast.warning("Banner Updated Successfully!");
  return {
    type: BANNER_VISIBLE_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

export {
  loadAllBanner,
  loadSingleBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  visibleBanner,
};
