import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlogs] = useState();

  const { id } = useParams();

  const Base_URL = "https://bloger-app-server.herokuapp.com";

  const OPTION = {
    url: Base_URL + `/blog/get/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const retrieveBlogs = () =>
    axios(OPTION)
      .then((res) => {
        if (res.status === 200) {
          setBlogs(res.data.data[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
      });

  useEffect(() => {
    setLoading(true);
    retrieveBlogs();
  }, []);

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
        {loading === true ? (
          <Grid container item xs={12} justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid
            className="p-2-all"
            style={{
              paddingLeft: "25%",
              paddingRight: "25%",
            }}
          >
            {blog !== undefined ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} className={"p-2-all"} key={blog._id}>
                  <Grid
                    container
                    xs={12}
                    item
                    justify="center"
                    className="p-2-all"
                  >
                    <Grid component={Paper} item xs={12} className={"p-2-all"}>
                      <Grid container className={"border"}>
                        <Grid item xs={12}>
                          <Grid container className="p-2-all">
                            <Grid item xs={8}>
                              <Typography variant="h6">{blog.title}</Typography>
                            </Grid>
                            <Grid item xs={4} className="position-right">
                              <Typography variant="subtitle1">
                                {blog.blog_category.category_name}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Divider />

                          <img
                            src={blog.blog_image}
                            alt={blog.blog_name}
                            style={{
                              maxWidth: "75%",
                              padding: "1rem 5rem",
                            }}
                          />

                          <Grid item xs={12} className="p-2-all">
                            <Typography variant="subtitle1">
                              {blog.blog_name}
                            </Typography>
                          </Grid>

                          <Divider />
                          <Grid item xs={12} className="p-2-all">
                            <Typography variant="subtitle2">
                              {blog.post_summary}
                            </Typography>
                          </Grid>

                          <Divider />
                          <Grid item xs={12} className="p-2-all">
                            <Typography variant="subtitle2">
                              {blog.post_body}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          component={Paper}
                          container
                          justify="flex-start"
                          style={{ margin: "Auto", cursor: "pointer" }}
                        >
                          <Grid item xs={12} md={12} className={"p-2-all"}>
                            <Typography variant="subtitle2">
                              Created By:
                              {" " + blog.blog_owner.fullname}
                            </Typography>
                            <Typography variant="subtitle2">
                              Created At:
                              {" " + moment(blog.createdAt).utc().format("lll")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Blog;
