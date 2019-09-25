import React from "react";
import { connect } from "react-redux";

const BoardItem = ({ row }) => {
  return (
    <tr>
      <td>{row.brdno}</td>
      <td>{row.brdtitle}</td>
      <td>{row.brdwriter}</td>
      <td>{row.brddate.toLocaleDateString("ko-KR")}</td>
    </tr>
  );
};

export default connect()(BoardItem);
