import React, { useState } from "react";
import { board_save } from "../App_reducer";
import { connect } from "react-redux";

const BoardForm = ({ dispatch }) => {

  const [data, setData] = useState({
    brdno: "",
    brdtitle: "",
    brdwriter: "",
    brddate: "",
  });

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value;
    setData(preState =>  {return {...preState, [name]: value}});
    console.log(data);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(board_save(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="title" name='brdtitle' onChange={handleChange} />
      <input placeholder="name" name='brdwriter' onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default connect()(BoardForm);
