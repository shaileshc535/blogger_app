/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
  Pagination,
  MenuItem,
  Stack,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Dashbard = () => {
  const [loading, setLoading] = useState(false);
  const [limit] = useState(9);
  let [page, setPage] = useState();
  let [totalPage, setTotalPage] = useState(1);
  let [blog, setBlogs] = useState([]);
  let [blogsCategory, setBlogsCategory] = useState([]);
  let [categoryName, setCategoryName] = useState("");

  const [state, setState] = useState({
    searchValue: "",
    sortDate: 1,
    sortName: 1,
  });

  const { searchValue, sortDate, sortName } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    searchData();
    SortByName();
    SortByDate();
  };

  const Base_URL = "https://bloger-app-server.herokuapp.com";
  // const Base_URL = "http://localhost:8080";

  const requestedData = {
    page: page,
    limit: limit,
    sort: { category_name: sortName, createdAt: sortDate },
    cond: { search: searchValue },
  };

  const searchData = () => {
    retrieveBlogs();
  };

  const SortByName = () => {
    if (state.sortName === 1) {
      setState.SortName(-1);
      retrieveBlogs();
    } else {
      setState.SortName(1);
      retrieveBlogs();
    }
  };

  const SearchByCategory = async (e) => {
    setCategoryName(e.target.value);
    if (categoryName !== "") {
      retrieveBlogsByCategoryId();
    }
  };

  const SortByDate = () => {
    if (state.sortDate === 1) {
      setState.SortDate(-1);
      retrieveBlogs();
    } else {
      setState.SortDate(1);
      retrieveBlogs();
    }
  };

  const retrieveBlogs = () =>
    axios
      .post(Base_URL + `/blog/list`, requestedData)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setBlogs(res.data.data);
          // setPage(res.data.page);
          setTotalPage(res.data.totalPages);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });

  const retrieveBlogsCategory = () => {
    axios
      .post(Base_URL + `/blog-category/list`)
      .then((res) => {
        if (res.status === 200) {
          setBlogsCategory(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  const retrieveBlogsByCategoryId = () => {
    axios
      .get(Base_URL + `/blog/category/${categoryName}`)
      .then((res) => {
        if (res.status === 200) {
          setBlogs(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    setLoading(true);
    retrieveBlogs();
    retrieveBlogsCategory();
  }, []);

  const handlePageChange = async (a, b) => {
    setPage(b);
    console.log("b", b);
    setLoading(true);
    console.log("page", page);
    await retrieveBlogs();
  };

  return (
    <Grid
      className="p-2-all p-2"
      container
      direction="column"
      wrap="nowrap"
      spacing={2}
      style={{ width: "100%" }}
    >
      <Grid item xs={12}>
        <Grid container className="p-2-all">
          <Grid
            component={Paper}
            item
            xs={12}
            md={12}
            className="p-2-all p-2 border"
            justify="center"
          >
            <Grid container className={"p-2-all"}>
              <Grid item md={4} xs={12} className={"p-2-all"}>
                <Typography
                  variant="h6"
                  component={Grid}
                  item
                  xs
                  className="font-weight-bold pl-3"
                >
                  Blogs
                </Typography>
              </Grid>
              <Grid item xs={6} md={2} className={"p-2-all"}>
                <TextField
                  fullWidth
                  label="Search"
                  name="searchValue"
                  value={searchValue}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              </Grid>
              <Grid item xs={6} md={2} className={"p-2-all"}>
                <TextField
                  select
                  fullWidth
                  variant={"outlined"}
                  label="Filter by category"
                  name="categoryName"
                  value={categoryName}
                  onChange={SearchByCategory}
                  size="small"
                  color="primary"
                >
                  <MenuItem value="all">All</MenuItem>
                  {blogsCategory &&
                    blogsCategory.map((item, i) => (
                      <MenuItem value={item._id} key={i}>
                        {item.category_name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={6} md={2} className={"p-2-all"}>
                <TextField
                  select
                  fullWidth
                  variant={"outlined"}
                  label="Sort By Name"
                  name="sortName"
                  value={sortName}
                  onChange={handleInputChange}
                  size="small"
                  color="primary"
                >
                  <MenuItem value={1}>Accending</MenuItem>
                  <MenuItem value={-1}>Decending</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} md={2} className={"p-2-all"}>
                <TextField
                  select
                  fullWidth
                  variant={"outlined"}
                  label="Sort By Date"
                  name="sortDate"
                  value={sortDate}
                  onChange={handleInputChange}
                  size="small"
                  color="primary"
                >
                  <MenuItem value={1}>Accending</MenuItem>
                  <MenuItem value={-1}>Decending</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {loading === true ? (
          <Grid container item xs={12} justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container className="p-2-all">
            <Grid
              component={Paper}
              item
              xs={12}
              md={12}
              className="p-2-all p-2 border"
              justify="center"
            >
              {blog.length > 0 && blog !== undefined ? (
                <Grid container spacing={3}>
                  {blog &&
                    blog.map((item, i) => (
                      <Grid item xs={12} md={4} className={"p-2-all"} key={i}>
                        <Link
                          to={`blog/${item._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Grid
                            container
                            xs={12}
                            item
                            justify="center"
                            className="p-2-all"
                          >
                            <Grid
                              component={Paper}
                              item
                              xs={12}
                              className={"p-2-all"}
                            >
                              <Grid container className={"border"}>
                                <Grid item xs={12}>
                                  <Grid container className="p-2-all">
                                    <Grid item xs={8}>
                                      <Typography variant="h6">
                                        {item.title}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      className="position-right"
                                    >
                                      <Typography variant="subtitle1">
                                        {item.blog_category[0]
                                          ? item.blog_category[0].category_name
                                          : item.blog_category.category_name}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Divider />

                                  <img
                                    src={item.blog_image}
                                    alt={item.blog_name}
                                    style={{
                                      maxWidth: "100%",
                                    }}
                                    className="p-1-all"
                                  />

                                  <Grid item xs={12} className="p-2-all">
                                    <Typography variant="subtitle1">
                                      {item.blog_name}
                                    </Typography>
                                  </Grid>

                                  <Divider />
                                  <Grid item xs={12} className="p-2-all">
                                    <Typography variant="subtitle2">
                                      {item.post_summary}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid
                                  component={Paper}
                                  container
                                  justify="flex-start"
                                  style={{ margin: "Auto", cursor: "pointer" }}
                                >
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    className={"p-2-all"}
                                  >
                                    <Typography variant="subtitle2">
                                      Created By:{" "}
                                      {item.blog_owner[0]
                                        ? item.blog_owner[0].fullname
                                        : item.blog_owner.fullname}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                      Created At:
                                      {" " +
                                        moment(item.createdAt)
                                          .utc()
                                          .format("lll")}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
            <Grid container justify="flex-end" className="p-3-all ">
              {totalPage > 1 ? (
                <Stack spacing={2}>
                  <Pagination
                    count={totalPage}
                    page={page}
                    onChange={(e, page) => handlePageChange(e, page)}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashbard;
