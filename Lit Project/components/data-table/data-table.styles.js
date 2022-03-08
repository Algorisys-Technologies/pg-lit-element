import { css } from "lit";

export default css`
  table,th,td {
    border: 1px solid black;
    padding:10px
  }

  table{
    width: 100%;
    border-collapse: collapse;
  }

  th,td{
    text-align: center;
  }

  tr:hover {background-color: yellow;}

  th {
    background-color: #04AA6D;
    color: white;
  }

  .pagination-nav{
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  .pagination-tag{
    margin: 5px;
  }

  [hidden]{
    display:none;
  }

  
`;